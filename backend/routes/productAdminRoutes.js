const express = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order");
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

// @route GET /api/admin/products
// @desc Get all products (Admin only)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
    const products = await Product.find({});
    res.json(products);
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    }
});

// @route GET /api/admin/products/:id
// @desc Get one product (Admin only)
// @access Private/Admin
router.get("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const orders = await Order.find({ "orderItems.productId": product._id }).select("orderItems");
      const purchaseCount = orders.reduce((total, order) => {
        const matchedQuantity = order.orderItems.reduce((sum, item) => {
          return item.productId.toString() === product._id.toString()
            ? sum + item.quantity
            : sum;
        }, 0);

        return total + matchedQuantity;
      }, 0);

      res.json({ product, purchaseCount });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const stockFields = normalizeStockFields(req.body);
    const product = new Product({
      ...req.body,
      ...stockFields,
      images: normalizeImages(req.body.images, req.body.name),
      user: req.user._id
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.sku = req.body.sku || product.sku;
      product.category = req.body.category || product.category;
      product.specifications = req.body.specifications || product.specifications;

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

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
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
    res.status(500).json({ message: "Server Error" });
  }
});



module.exports = router;
