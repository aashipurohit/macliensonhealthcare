const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/authMiddleware');

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.Razorpay_API_KEY,
  key_secret: process.env.Razorpay_API_SECRET
});

// ----------------------------
// CREATE RAZORPAY ORDER (SECURE + VALIDATED)
// ----------------------------
router.post('/create-razorpay-order', async (req, res) => {
  try {
    console.log("Incoming Razorpay Order Body:", req.body);

    const { orderItems } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: "No order items provided" });
    }

    let totalAmount = 0;

    // VALIDATE PRODUCTS & CALCULATE TOTAL
    for (let item of orderItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Invalid productId: ${item.productId}`
        });
      }

      if (product.countInStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      // Valid price from DB
      totalAmount += product.price * item.quantity;
    }

    // Razorpay accepts paise → multiply by 100
    const razorpayAmount = totalAmount * 100;

    // CREATE RAZORPAY ORDER
    const order = await razorpay.orders.create({
      amount: razorpayAmount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: { items: JSON.stringify(orderItems) },
      payment_capture: 1
    });

    console.log("RAZORPAY ORDER CREATED:", order);

    res.json({
      success: true,
      order,
      totalAmount
    });

  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});




// VERIFY PAYMENT & UPDATE STOCK
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderItems } = req.body;

    // 1. VERIFY SIGNATURE
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.Razorpay_API_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    res.json({
      success: true,
      message: "Payment verified successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});




// GET USER ORDERS
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

// GET ORDER DETAILS
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to access this order" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});


// ----------------------------
// CREATE ORDER IN DATABASE
router.post('/create', protect, async (req, res) => {
  try {
    console.log("------ ORDER CREATE ROUTE HIT -------");
    console.log("Order Payload Received:", req.body);
    console.log("User from protect middleware:", req.user);

    const { shipping, cart, paymentMethod, razorpayPaymentId, totalAmount } = req.body;

    // Validate
    if (!shipping || !cart || !cart.products || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Missing order data" });
    }
    console.log("Cart products for orderItems:", cart.products);
    // Convert cart.products → orderItems for schema
    const orderItems = cart.products.map(p => ({
      productId: p.productId,
      name: p.name,
      image: typeof p.image === "string" && p.image.trim() ? p.image.trim() : "",
      price: p.price,
      quantity: p.quantity
    }));

    const order = await Order.create({
      user: req.user._id,        
      orderItems,                
      shippingAddress: {
        address: shipping.address,
        city: shipping.city,
        postalCode: shipping.postalCode,
        country: shipping.country,
      },
      paymentMethod,
      totalPrice: totalAmount,
      isPaid: paymentMethod === "razorpay",
      paidAt: paymentMethod === "razorpay" ? Date.now() : null,
      paymentStatus: paymentMethod === "razorpay" ? "Paid" : "Pending"
    });

    // Update stock
    for (let item of cart.products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { countInStock: -item.quantity }
      });
    }

    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json({
      success: true,
      order,
      message: "Order created successfully"
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message
    });
  }
});


module.exports = router;
