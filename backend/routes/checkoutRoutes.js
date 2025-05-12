const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout" });
    }

    try {
        let totalPrice = 0;
        const validatedItems = [];

        for (const item of checkoutItems) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }

            const quantity = item.quantity || 1;
            const finalPrice = product.discountPrice || product.price;
            const subtotal = finalPrice * quantity;
            totalPrice += subtotal;

            validatedItems.push({
                productId: product._id,
                name: product.name,
                image: product.images[0], // Assuming first image for checkout
                price: finalPrice,
                quantity
            });
        }

        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: validatedItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });

        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid Payment Status" });
        }
    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id).populate({
            path: "checkoutItems.productId",
            model: "Product",
            select: "price discountPrice"
        });

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (!checkout.isPaid) {
            return res.status(400).json({ message: "Checkout is not paid" });
        }

        if (checkout.isFinalized) {
            return res.status(400).json({ message: "Checkout already finalized" });
        }

        const updatedItems = checkout.checkoutItems.map(item => {
            const product = item.productId;
            const finalPrice = product.discountPrice || product.price;

            if (Number(item.price) !== Number(finalPrice)) {
                throw new Error(`Price mismatch for product ${product._id}`);
            }

            return {
                productId: item.productId,
                name: item.name,
                image: item.image,
                price: finalPrice,
                quantity: item.quantity
            };
        });

        const recalculatedTotal = updatedItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        const finalOrder = await Order.create({
            user: checkout.user,
            orderItems: updatedItems,
            shippingAddress: checkout.shippingAddress,
            paymentMethod: checkout.paymentMethod,
            totalPrice: recalculatedTotal,
            isPaid: true,
            paidAt: checkout.paidAt,
            isDelivered: false,
            paymentStatus: "paid",
            paymentDetails: checkout.paymentDetails,
            originalCheckout: checkout._id
        });

        checkout.isFinalized = true;
        checkout.finalizedAt = Date.now();
        await checkout.save();

        await Cart.findOneAndDelete({ user: checkout.user });

        res.status(201).json(finalOrder);
    } catch (error) {
        console.error("Error finalizing checkout:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
});

module.exports = router;
