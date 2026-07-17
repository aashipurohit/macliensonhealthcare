const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },   // price stored from DB at time of order
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },

    // ✅ FIX (VULN-002): totalPrice is ALWAYS calculated server-side — never accepted from client
    totalPrice: { type: Number, required: true },

    // ✅ FIX (VULN-003): isPaid is set by server after real payment validation — never from client string
    isPaid:     { type: Boolean, default: false },
    paidAt:     { type: Date },

    isDelivered:  { type: Boolean, default: false },
    deliveredAt:  { type: Date },

    paymentResult: {
      // ✅ FIX (VULN-007, VULN-008): unique sparse index prevents duplicate/replay orders
      razorpayPaymentId: {
        type: String,
        unique: true,   // one payment ID → one order, ever
        sparse: true,   // allows null (COD orders)
        index: true,
      },
      razorpayOrderId:   { type: String, index: true },
      razorpaySignature: { type: String },

      // Fetched from Razorpay API — the server-verified source of truth
      amount:     { type: Number },   // in paise, validated against DB total
      currency:   { type: String },
      status:     { type: String },   // "captured", "failed", "refunded"
      method:     { type: String },   // "card", "upi", "netbanking", etc.
      capturedAt: { type: Date },
    },

    // ✅ FIX (VULN-007): idempotencyKey prevents double-submit on network retries
    idempotencyKey: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);