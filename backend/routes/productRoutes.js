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
