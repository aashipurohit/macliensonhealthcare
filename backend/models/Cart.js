const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 100,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      sparse: true,
      unique: true,
    },
    guestId: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
    },
    products: {
      type: [cartItemSchema],
      default: [],
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// cartSchema.index({ user: 1 }, { unique: true, sparse: true });
// cartSchema.index({ guestId: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Cart", cartSchema);