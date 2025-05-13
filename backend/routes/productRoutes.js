const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/products
// @desc    Create a product
// @access  Private/Admin
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
    } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = new Product({
      name,
      description,
      price,
      discountPrice: discountPrice || price,
      countInStock: countInStock || 0,
      category,
      brand,
      collections: collections || [],
      material,
      images: images || [],
      isFeatured: isFeatured || false,
      isPublished: isPublished !== undefined ? isPublished : true,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Product creation error:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation Error",
        errors: error.errors
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate key error",
        field: Object.keys(error.keyPattern)[0]
      });
    }
    res.status(500).json({ 
      message: "Server Error",
      error: error.message 
    });
  }
});

// @route   GET /api/products
// @desc    Get all products (with optional filters)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { 
      collections, 
      minPrice, 
      maxPrice, 
      sortBy, 
      search, 
      category, 
      brand, 
      limit 
    } = req.query;

    let query = { isPublished: true };

    // Price Filtering (Fixed)
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Other filters (unchanged)
    if (collections && collections.toLowerCase() !== "all") {
      query.collections = collections;
    }
    
    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: new RegExp(category, "i") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc": sort = { price: 1 }; break;
        case "priceDesc": sort = { price: -1 }; break;
        case "popularity": sort = { rating: -1 }; break;
      }
    }

    // Execute query
    let productsQuery = Product.find(query).sort(sort);
    if (limit && Number(limit) > 0) {
      productsQuery = productsQuery.limit(Number(limit));
    }

    const products = await productsQuery.exec();
    res.json(products);

  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ 
      message: "Server Error",
      error: error.message 
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      product[key] = updates[key] !== undefined ? updates[key] : product[key];
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


  
// @route GET/api/products/best-seller
// @desc Retrieve the product with the highest rating
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1});
    if(bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No Best Seller Found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/similar/:id
// @desc Retrieve similarb products based on the current products's category
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
 
try {
  const product = await Product.findById(id);

  if(!product) {
    return res.status(404).json({message: "Product Not Found"});
  }  
  const similarProducts = await Product.find({
    _id:{ $ne: id}, //Exclude the current product ID
    category: product.category,
  }).limit(4);

  res.json(similarProducts);

} catch (error) {
  console.error(error);
  res.status(500).send("Server Error");
}

});

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products - Creation date
// @access Public
router.get("/new-arrivals", async (req, res) => {
  try {
    //Fetch latest 8 products 
    const newArrivals = await Product.find().sort({createdAt: -1}).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({message: "Product Not Found"});
    }
  }  catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
}

});




module.exports = router;