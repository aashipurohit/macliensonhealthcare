const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/authMiddleware');
const {
  verifySignature,
  createRazorpayOrder,
  validatePaymentAmount,
} = require('../utils/razorpay');

// ─────────────────────────────────────────────────────────────
// STEP 1: Create Razorpay order (amount calculated server-side)
// ─────────────────────────────────────────────────────────────
router.post('/create-razorpay-order', protect, async (req, res) => {
  try {
    const { orderItems } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items provided' });
    }

    let totalAmount = 0;
    const validatedItems = [];

    // FIX (VULN-002, VULN-005): Validate products and calculate total entirely from DB
    for (let item of orderItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(400).json({ success: false, message: `Invalid productId: ${item.productId}` });
      }
      if (product.countInStock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }

      totalAmount += product.price * item.quantity;
      validatedItems.push({
        productId: product._id,
        name: product.name,
        image: (product.images && product.images.length > 0 && product.images[0].url) ? product.images[0].url : (product.image || 'https://via.placeholder.com/150'),
        price: product.price,   // DB price, not client price
        quantity: item.quantity,
      });
    }

    const amountPaise = Math.round(totalAmount * 100);

    const razorpayOrder = await createRazorpayOrder(
      amountPaise,
      'INR',
      `receipt_${Date.now()}`,
      { userId: req.user._id.toString() }
    );

    // Return razorpay order + the server-calculated total the frontend can display
    res.json({
      success: true,
      order: razorpayOrder,         // contains id, amount (in paise), currency
      totalAmount,                  // ₹ value for UI display only
      validatedItems,               // send back so frontend doesn't need to recalculate
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
  }
});


// ─────────────────────────────────────────────────────────────────────────────
// STEP 2: Verify payment + create order atomically (replaces /verify + /create)
// ─────────────────────────────────────────────────────────────────────────────
router.post('/verify-and-create', protect, async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    orderItems,          // [{productId, quantity}] — NO price from client
    shipping,
    idempotencyKey,      // client-generated: `${userId}_${razorpayOrderId}`
  } = req.body;

  // ── Basic input validation ────────────────────────────────
  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: 'Missing payment credentials' });
  }
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ success: false, message: 'No order items' });
  }
  
  // PRODUCTION FIX: Strict validation for all customer contact & shipping details
  if (
    !shipping?.firstName || 
    !shipping?.lastName || 
    !shipping?.email || 
    !shipping?.phone || 
    !shipping?.address || 
    !shipping?.city || 
    !shipping?.postalCode || 
    !shipping?.country
  ) {
    return res.status(400).json({ success: false, message: 'Incomplete shipping and contact details' });
  }

  try {
    // ── 1. Idempotency: return existing order on duplicate submit ─
    if (idempotencyKey) {
      const existing = await Order.findOne({ idempotencyKey });
      if (existing) {
        return res.status(200).json({ success: true, order: existing, duplicate: true });
      }
    }

    // Also check by payment ID (hard guard)
    const paymentUsed = await Order.findOne({ 'paymentResult.razorpayPaymentId': razorpay_payment_id });
    if (paymentUsed) {
      return res.status(409).json({ success: false, message: 'Payment already used for an order' });
    }

    // ── 2. Verify HMAC signature ──────────────────────────────
    const signatureValid = verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!signatureValid) {
      return res.status(400).json({ success: false, message: 'Payment signature verification failed' });
    }

    // ── 3. Re-calculate total from DB (never trust client) ────
    let serverTotal = 0;
    const resolvedItems = [];

    for (let item of orderItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ success: false, message: `Product not found: ${item.productId}` });
      }
      serverTotal += product.price * item.quantity;
      resolvedItems.push({ product, quantity: item.quantity });
    }

    const expectedPaise = Math.round(serverTotal * 100);

    // ── 4. Validate payment amount via Razorpay API ───────────
    let paymentDetails;
    try {
      paymentDetails = await validatePaymentAmount(razorpay_payment_id, expectedPaise);
    } catch (amountErr) {
      console.error('Payment amount validation failed:', amountErr.message);
      return res.status(400).json({ success: false, message: amountErr.message });
    }

    // ── 5. Atomic stock deduction (check + decrement in one query) ──
    const stockErrors = [];
    const orderItemsForDB = [];

    for (let { product, quantity } of resolvedItems) {
      const updated = await Product.findOneAndUpdate(
        { _id: product._id, countInStock: { $gte: quantity } }, // atomic check
        { $inc: { countInStock: -quantity } },
        { new: true }
      );

      if (!updated) {
        stockErrors.push(product.name);
      } else {
        orderItemsForDB.push({
          productId: product._id,
          name: product.name,
          image: (product.images && product.images.length > 0 && product.images[0].url) ? product.images[0].url : (product.image || 'https://via.placeholder.com/150'),
          price: product.price,   // DB price
          quantity,
        });
      }
    }

    // If any stock deduction failed, roll back the ones that succeeded
    if (stockErrors.length > 0) {
      for (let { product, quantity } of resolvedItems) {
        const alreadyDecremented = orderItemsForDB.find(
          (i) => i.productId.toString() === product._id.toString()
        );
        if (alreadyDecremented) {
          await Product.findByIdAndUpdate(product._id, { $inc: { countInStock: quantity } });
        }
      }
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for: ${stockErrors.join(', ')}`,
      });
    }

    // ── 6. Create order in DB ─────────────────────────────────
    let order;
    try {
      order = await Order.create({
        user: req.user._id,
        orderItems: orderItemsForDB,
        
        //PRODUCTION FIX: Save complete customer contact & shipping info
        shippingAddress: {
          firstName:  shipping.firstName,
          lastName:   shipping.lastName,
          email:      shipping.email,
          phone:      shipping.phone,
          address:    shipping.address,
          city:       shipping.city,
          postalCode: shipping.postalCode,
          country:    shipping.country,
        },
        
        paymentMethod: 'razorpay',
        totalPrice: serverTotal,

        isPaid:        true,
        paidAt:        new Date(),
        paymentStatus: 'Paid',

        paymentResult: {
          razorpayPaymentId: razorpay_payment_id,
          razorpayOrderId:   razorpay_order_id,
          razorpaySignature: razorpay_signature,
          amount:     paymentDetails.amount,
          currency:   paymentDetails.currency,
          status:     paymentDetails.status,
          method:     paymentDetails.method,
          capturedAt: new Date(paymentDetails.created_at * 1000),
        },

        idempotencyKey: idempotencyKey || `${req.user._id}_${razorpay_payment_id}`,
      });
    } catch (dbErr) {
      // Order creation failed after stock deducted — roll back stock
      console.error('Order DB creation failed, rolling back stock:', dbErr.message);
      for (let { product, quantity } of resolvedItems) {
        await Product.findByIdAndUpdate(product._id, { $inc: { countInStock: quantity } });
      }
      // Duplicate key error = replay attempt
      if (dbErr.code === 11000) {
        return res.status(409).json({ success: false, message: 'Duplicate order detected' });
      }
      throw dbErr;
    }

    // ── 7. Clear cart ─────────────────────────────────────────
    try {
      await Cart.findOneAndDelete({ user: req.user._id });
    } catch (cartErr) {
      console.warn('Cart deletion failed (non-critical):', cartErr.message);
    }

    res.status(201).json({ success: true, order });

  } catch (error) {
    console.error('verify-and-create error:', error);
    res.status(500).json({ success: false, message: 'Order processing failed', error: error.message });
  }
});


// ─────────────────────────────────────────────────────────────
// GET: User's orders
// ─────────────────────────────────────────────────────────────
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ─────────────────────────────────────────────────────────────
// GET: Single order detail
// ─────────────────────────────────────────────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;