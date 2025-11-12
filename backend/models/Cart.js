// const mongoose = require("mongoose");

// const cartItemSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//     required: true,
//   },
//   name: String,
//   image: String,
//   price: Number,
//   quantity: {
//     type: Number,
//     default: 1,
//   },
// },
// {_id: false }
// );

// const cartSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//     },
//     guestId: {
//         type: String,
//     },
//     products: [cartItemSchema],
//     totalPrice: {
//         type: Number,
//         required: true,
//         default: 0,
//     },
// },
//  { timestamps: true}
// );

// module.exports = mongoose.model("Cart", cartSchema);


const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  image: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
    max: 100 // Add reasonable maximum
  }
}, { _id: false }); // Keep false if you don't need individual item IDs

const cartSchema = new mongoose.Schema({
  user: {  // for logged-in users
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    sparse: true  // allows nulls, so index applies only when userId exists
  },
  guestId: {  // for guest users
    type: String,
    unique: true,
    sparse: true
  },
  products: [cartItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
}, { timestamps: true });

// No need to create index separately because `unique` + `sparse` in field definition already creates them

module.exports = mongoose.model("Cart", cartSchema);
