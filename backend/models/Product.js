const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  sku: {
    type: String,
    unique: true,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,  
  },
  collections: {  
    type: String,
    required: true,
  },
  images: [{
    url: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
     
    }
  }],
  
  isFeatured: {
    type: Boolean, 
    default: false,
  },
  isPublished: {
    type: Boolean, 
    default: true,
  },
   rating: {
    type: Number,
    default: 0,
   },
   numReviews: {
    type: Number,
    default: 0,
   },
   tags: [String],
   user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },
   metaTitle: {
    type: String,
   },
   metaDescription: {
    type: String,
   },
   metaKeywords: {
    type: String,
   },
   dimensions: {
    length: Number,
    width: Number,
    height: Number,
   },
   weight: {
    type: String,  // Changed from Number to String
    trim: true
  }
},
{timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);
