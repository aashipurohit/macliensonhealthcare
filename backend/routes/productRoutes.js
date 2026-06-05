// const express = require("express");
// const Product = require("../models/Product");
// const { protect, admin } = require("../middleware/authMiddleware");

// const router = express.Router();


// // @route GET /api/products/new-arrivals
// // @desc Retrieve latest products with featured items first
// // @access Public
// router.get("/new-arrivals", async (req, res) => {
//   try {
//     // First get new arrivals sorted by date
//     let newArrivals = await Product.find({ isPublished: true })
//       .sort({ isFeatured: -1, createdAt: -1 }) // or { date: -1 } if you're using a custom date field
//       .limit(8)
//       .select('name description price images countInStock category isFeatured');
    
//     // Then sort to put featured products first while maintaining date order
//     // newArrivals.sort((a, b) => {
//     //   if (a.isFeatured && !b.isFeatured) return -1;
//     //   if (!a.isFeatured && b.isFeatured) return 1;
//     //   return 0; // maintain original order if both have same featured status
//     // });

//     res.json(newArrivals);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   POST /api/products
// // @desc    Create a product
// // @access  Private/Admin
// router.post("/", protect, admin, async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       discountPrice,
//       countInStock,
//       category,
//       brand,
//       collections,
//       material,
//       images,
//       isFeatured,
//       isPublished,
//       weight,
//       sku,
//     } = req.body;

//     if (!name || !description || !price || !category) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const product = new Product({
//       name,
//       description,
//       price,
//       discountPrice: discountPrice || price,
//       countInStock: countInStock || 0,
//       category,
//       brand,
//       collections: collections || [],
//       material,
//       images: images || [],
//       isFeatured: isFeatured || false,
//       isPublished: isPublished !== undefined ? isPublished : true,
//       weight,
//       sku,
//       user: req.user._id,
//     });

//     const createdProduct = await product.save();
//     res.status(201).json(createdProduct);
//   } catch (error) {
//     console.error("Product creation error:", error);
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({
//         message: "Validation Error",
//         errors: error.errors
//       });
//     }
//     if (error.code === 11000) {
//       return res.status(400).json({
//         message: "Duplicate key error",
//         field: Object.keys(error.keyPattern)[0]
//       });
//     }
//     res.status(500).json({ 
//       message: "Server Error",
//       error: error.message 
//     });
//   }
// });

// // // @route   GET /api/products
// // // @desc    Get all products (with optional filters)
// // // @access  Public
// // router.get("/", async (req, res) => {
// //   try {
// //     const { 
// //       collections, 
// //       minPrice, 
// //       maxPrice, 
// //       sortBy, 
// //       search, 
// //       category, 
// //       brand, 
// //       limit 
// //     } = req.query;

// //     let query = { isPublished: true };

// //     // Price Filtering (Fixed)
// //     if (minPrice || maxPrice) {
// //       query.price = {};
// //       if (minPrice) query.price.$gte = parseFloat(minPrice);
// //       if (maxPrice) query.price.$lte = parseFloat(maxPrice);
// //     }

// //     // Other filters (unchanged)
// //     if (collections && collections.toLowerCase() !== "all") {
// //       query.collections = collections;
// //     }
    
// //     if (category && category.toLowerCase() !== "all") {
// //       query.category = { $regex: new RegExp(category, "i") };
// //     }

// //     if (brand) {
// //       query.brand = { $in: brand.split(",") };
// //     }

// //     if (search) {
// //       query.$or = [
// //         { name: { $regex: search, $options: "i" } },
// //         { description: { $regex: search, $options: "i" } },
// //       ];
// //     }

// //     // Sorting
// //     let sort = {};
// //     if (sortBy) {
// //       switch (sortBy) {
// //         case "priceAsc": sort = { price: 1 }; break;
// //         case "priceDesc": sort = { price: -1 }; break;
// //         case "popularity": sort = { rating: -1 }; break;
// //       }
// //     }

// //     // Execute query
// //     let productsQuery = Product.find(query).sort(sort);
// //     if (limit && Number(limit) > 0) {
// //       productsQuery = productsQuery.limit(Number(limit));
// //     }

// //     const products = await productsQuery.exec();
// //     res.json(products);

// //   } catch (error) {
// //     console.error("Error fetching products:", error);
// //     res.status(500).json({ 
// //       message: "Server Error",
// //       error: error.message 
// //     });
// //   }
// // });




// // @route   GET /api/products
// // @desc    Get all products (with advanced filtering)
// // @access  Public
// router.get("/", async (req, res) => {
//   try {
//     const { 
//       category,        // comma-separated string (e.g. "Women,Sports Nutrition")
//       subcategory,     // comma-separated string
//       prescription,    // "true" or "false"
//       minPrice, 
//       maxPrice,
//       sortBy,          // "priceAsc", "priceDesc", "newest", "rating"
//       limit,
//       search
//     } = req.query;

//     let query = { isPublished: true };

//     // Category filter (OR logic)
//     if (category) {
//       query.category = { $in: category.split(',') }; // Changed from $regex to $in
//     }

//     // Subcategory filter (OR logic)
//     if (subcategory) {
//       query.subcategory = { $in: subcategory.split(',') };
//     }

//     // Prescription filter
//     if (prescription !== undefined) {
//       query.prescriptionRequired = prescription === 'true';
//     }

//     // Price range filter
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     // Search functionality
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { category: { $regex: search, $options: 'i' } }
//       ];
//     }

//     // Enhanced Sorting
//     let sort = {};
//     switch (sortBy) {
//       case 'priceAsc': sort = { price: 1 }; break;
//       case 'priceDesc': sort = { price: -1 }; break;
//       case 'newest': sort = { createdAt: -1 }; break;
//       case 'rating': sort = { rating: -1 }; break;
//       case 'popularity': sort = { rating: -1 }; break; // Alias for rating
//       default: sort = { createdAt: -1 }; // Default to newest first
//     }

//     // Execute query
//     let productsQuery = Product.find(query).sort(sort);
//     if (limit) productsQuery = productsQuery.limit(Number(limit));

//     const products = await productsQuery.exec();
    
//     // Get filter metadata for UI
//     const categories = await Product.distinct('category', { isPublished: true });
//     const subcategories = await Product.distinct('subcategory', { isPublished: true });
//     const priceRange = await Product.aggregate([
//       { $match: { isPublished: true } },
//       { $group: { 
//           _id: null, 
//           min: { $min: "$price" }, 
//           max: { $max: "$price" } 
//       }}
//     ]);

//     res.json({
//       success: true,
//       products,
//       metadata: {
//         categories,
//         subcategories,
//         minPrice: priceRange[0]?.min || 0,
//         maxPrice: priceRange[0]?.max || 1000
//       }
//     });

//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Server Error",
//       error: error.message 
//     });
//   }
// });

// // @route   PUT /api/products/:id
// // @desc    Update a product
// // @access  Private/Admin
// router.put("/:id", protect, admin, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const updates = req.body;
//     Object.keys(updates).forEach(key => {
//       product[key] = updates[key] !== undefined ? updates[key] : product[key];
//     });

//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   DELETE /api/products/:id
// // @desc    Delete a product
// // @access  Private/Admin
// router.delete("/:id", protect, admin, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     await product.deleteOne();
//     res.json({ message: "Product removed" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });


  
// // @route GET/api/products/best-seller
// // @desc Retrieve the product with the highest rating
// // @access Public
// router.get("/best-seller", async (req, res) => {
//   try {
//     const bestSeller = await Product.findOne().sort({ rating: -1});
//     if(bestSeller) {
//       res.json(bestSeller);
//     } else {
//       res.status(404).json({ message: "No Best Seller Found"});
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

// // @route GET /api/products/similar/:id
// // @desc Retrieve similarb products based on the current products's category
// router.get("/similar/:id", async (req, res) => {
//   const { id } = req.params;
 
// try {
//   const product = await Product.findById(id);

//   if(!product) {
//     return res.status(404).json({message: "Product Not Found"});
//   }  
//   const similarProducts = await Product.find({
//     _id:{ $ne: id}, //Exclude the current product ID
//     category: product.category,
//   }).limit(4);

//   res.json(similarProducts);

// } catch (error) {
//   console.error(error);
//   res.status(500).send("Server Error");
// }

// });

// // // @route GET /api/products/new-arrivals
// // // @desc Retrieve latest 8 products - Creation date
// // // @access Public
// // router.get("/new-arrivals", async (req, res) => {
// //   try {
// //     //Fetch latest 8 products 
// //     const newArrivals = await Product.find().sort({createdAt: -1}).limit(8);
// //     res.json(newArrivals);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("Server Error");
// //   }
// // });

// // @route GET /api/products/new-arrivals
// // @desc Retrieve latest 8 products by date
// // @access Public
// router.get("/new-arrivals", async (req, res) => {
//   try {
//     const newArrivals = await Product.find({ isPublished: true })
//       .sort({ createdAt: -1 }) // Sort by your custom date field (newest first)
//       .limit(8)
//       .select('name description price images countInStock category'); // Only send needed fields
//     res.json(newArrivals);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });



// // @route GET /api/products/:id
// // @desc Get a single product by ID
// // @access Public
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({message: "Product Not Found"});
//     }
//   }  catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
// }

// });


// // Add to productRoutes.js
// router.patch('/:id/specifications', protect, admin, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
    
//     product.specifications = req.body.specifications;
//     await product.save();
    
//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router;

// routes/productRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

const normalizeStockFields = (body) => {
  const stockInput = body.quantity ?? body.countInStock ?? body.stock;
  const rawStock = stockInput === undefined || stockInput === null || stockInput === "" ? 0 : stockInput;
  const numericStock = Number(rawStock);
  const countInStock = Number.isFinite(numericStock) ? numericStock : 0;

  return {
    quantity: String(rawStock),
    countInStock,
  };
};

const normalizeImages = (images, fallbackAltText) => {
  if (!Array.isArray(images)) return [];

  return images
    .map((image) => {
      if (typeof image === "string") {
        return { url: image, altText: fallbackAltText };
      }

      if (image?.url) {
        return { url: image.url, altText: image.altText || fallbackAltText };
      }

      return null;
    })
    .filter(Boolean);
};

// ------------------ Create Product ------------------
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      collections,
      material,
      images,
      isFeatured,
      isPublished,
      weight,
      sku,
      quantity,
      subcategory,
      prescriptionRequired,
      bestseller,
      tags,
    } = req.body;
    const stockFields = normalizeStockFields(req.body);

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = new Product({
      name,
      slug: slugify(name, { lower: true, strict: true }),
      metaTitle: `${name} | Maclienson Healthcare`,
      metaDescription: description.substring(0, 160),
      metaKeywords: tags?.join(", ") || "",
      description,
      price,
      discountPrice: discountPrice || price,
      countInStock: stockFields.countInStock,
      category,
      subcategory,
      brand,
      collections: collections || [],
      material,
      images: normalizeImages(images, name),
      isFeatured: isFeatured || false,
      isPublished: isPublished !== undefined ? isPublished : true,
      weight,
      sku,
      quantity: stockFields.quantity,
      prescriptionRequired: prescriptionRequired || false,
      bestseller: bestseller || false,
      tags: tags || [],
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Product creation error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation Error", errors: error.errors });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate key error", field: Object.keys(error.keyPattern)[0] });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ------------------ Update Product ------------------
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key] !== undefined ? req.body[key] : product[key];
    });

    if (
      req.body.quantity !== undefined ||
      req.body.countInStock !== undefined ||
      req.body.stock !== undefined
    ) {
      const stockFields = normalizeStockFields(req.body);
      product.quantity = stockFields.quantity;
      product.countInStock = stockFields.countInStock;
    }

    if (req.body.images !== undefined) {
      product.images = normalizeImages(req.body.images, product.name);
    }

    if (req.body.name) {
      product.slug = slugify(req.body.name, { lower: true, strict: true });
      product.metaTitle = `${req.body.name} | Maclienson Healthcare`;
      product.metaDescription = req.body.description?.substring(0, 160) || product.metaDescription;
      product.metaKeywords = req.body.tags?.join(", ") || product.metaKeywords;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ------------------ Delete Product ------------------
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ------------------ Specific Routes ------------------
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (!bestSeller) return res.status(404).json({ message: "No Best Seller Found" });
    res.json(bestSeller);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(8)
      .select("name description price images countInStock category slug metaTitle metaDescription metaKeywords");
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/similar/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });

    const similarProducts = await Product.find({
      _id: { $ne: req.params.id },
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ------------------ Update Specifications ------------------
router.patch("/:id/specifications", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.specifications = req.body.specifications;
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ------------------ Generic Route (ID or Slug) ------------------
router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;

    let product;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      product = await Product.findById(identifier);
    }
    if (!product) {
      product = await Product.findOne({ slug: identifier });
    }

    if (!product) return res.status(404).json({ message: "Product Not Found" });

    res.json(product);
  } catch (error) {
    console.error("Get product by identifier error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ------------------ Get All Products ------------------
router.get("/", async (req, res) => {
  try {
    const { category, subcategory, prescription, minPrice, maxPrice, sortBy, limit, search } = req.query;

    let query = { isPublished: true };

    if (category) query.category = { $in: category.split(",") };
    if (subcategory) query.subcategory = { $in: subcategory.split(",") };
    if (prescription !== undefined) query.prescriptionRequired = prescription === "true";
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    let sort = {};
    switch (sortBy) {
      case "priceAsc":
        sort = { price: 1 };
        break;
      case "priceDesc":
        sort = { price: -1 };
        break;
      case "newest":
        sort = { createdAt: -1 };
        break;
      case "rating":
      case "popularity":
        sort = { rating: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    let productsQuery = Product.find(query).sort(sort);
    if (limit) productsQuery = productsQuery.limit(Number(limit));

    const products = await productsQuery.exec();

    // Metadata for filters
    const categories = await Product.distinct("category", { isPublished: true });
    const subcategoriesList = await Product.distinct("subcategory", { isPublished: true });
    const priceRange = await Product.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: null, min: { $min: "$price" }, max: { $max: "$price" } } },
    ]);

    res.json({
      success: true,
      products,
      metadata: {
        categories,
        subcategories: subcategoriesList,
        minPrice: priceRange[0]?.min || 0,
        maxPrice: priceRange[0]?.max || 1000,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

module.exports = router;
