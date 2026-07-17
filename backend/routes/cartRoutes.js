const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect, optionalProtect } = require("../middleware/authMiddleware");

const router = express.Router();

const emptyCart = () => ({
  products: [],
  totalPrice: 0,
});

const calculateTotal = (products) =>
  products.reduce((sum, item) => sum + item.price * item.quantity, 0);

const getProductKey = (productId) => productId.toString();

const dedupeCartProducts = (products) => {
  const map = new Map();

  for (const item of products) {
    const key = getProductKey(item.productId);

    if (map.has(key)) {
      map.get(key).quantity += Number(item.quantity);
    } else {
      map.set(key, {
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: Number(item.quantity),
      });
    }
  }

  return Array.from(map.values());
};

const addProductToCart = ({ cart, product, quantity }) => {
  const productKey = getProductKey(product._id);
  const existingItem = cart.products.find(
    (item) => getProductKey(item.productId) === productKey
  );

  if (existingItem) {
    const updatedQty = existingItem.quantity + quantity;

    if (updatedQty > product.countInStock) {
      return {
        error: `Only ${product.countInStock} items available`,
      };
    }

    existingItem.quantity = updatedQty;
    return { error: null };
  }

  cart.products.push({
    productId: product._id,
    name: product.name,
    image: product.images?.[0]?.url || "",
    price: product.price,
    quantity,
  });

  return { error: null };
};

const normalizeAndSaveCart = async (cart) => {
  cart.products = dedupeCartProducts(cart.products);
  cart.totalPrice = calculateTotal(cart.products);
  await cart.save();
  return cart;
};

const getGuestIdFromRequest = (req) => {
  if (req.method === "GET") {
    return req.query.guestId || null;
  }

  return req.body.guestId || null;
};

const getCartFilter = (req) => {
  if (req.user?._id) {
    return { user: req.user._id };
  }

  const guestId = getGuestIdFromRequest(req);

  if (guestId) {
    return { guestId };
  }

  return null;
};

const findOrCreateCart = async ({ userId, guestId }) => {
  const filter = userId ? { user: userId } : { guestId };

  let cart = await Cart.findOne(filter);

  if (!cart) {
    cart = new Cart({
      user: userId || undefined,
      guestId: userId ? undefined : guestId,
      products: [],
      totalPrice: 0,
    });
  }

  return cart;
};

const normalizeQuantity = (quantity) => {
  const parsed = Number(quantity);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

/* =============================
   GET CART
============================= */
router.get("/", optionalProtect, async (req, res) => {
  try {
    const filter = getCartFilter(req);

    if (!filter) {
      return res.json(emptyCart());
    }

    const cart = await Cart.findOne(filter);

    if (!cart) {
      return res.json(emptyCart());
    }

    return res.json(cart);
  } catch (error) {
    console.error("GET CART ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

/* =============================
   ADD ITEM
============================= */
router.post("/", optionalProtect, async (req, res) => {
  try {
    const { productId } = req.body;
    const quantity = normalizeQuantity(req.body.quantity);

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "productId and valid quantity are required",
      });
    }

    const userId = req.user?._id || null;
    const guestId = userId ? null : getGuestIdFromRequest(req);

    if (!userId && !guestId) {
      return res.status(400).json({
        message: "guestId required for guest cart",
      });
    }

    const product = await Product.findById(productId);

    if (!product || !product.isPublished) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.countInStock < quantity) {
      return res.status(400).json({
        message: `Only ${product.countInStock} items available`,
      });
    }

    const cart = await findOrCreateCart({ userId, guestId });

    const { error } = addProductToCart({ cart, product, quantity });

    if (error) {
      return res.status(400).json({ message: error });
    }

    await normalizeAndSaveCart(cart);

    return res.json(cart);
  } catch (error) {
    console.error("ADD CART ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

/* =============================
   UPDATE QUANTITY
============================= */
router.put("/", optionalProtect, async (req, res) => {
  try {
    const { productId } = req.body;
    const quantity = Number(req.body.quantity);

    if (!productId || !Number.isFinite(quantity)) {
      return res.status(400).json({
        message: "productId and quantity are required",
      });
    }

    const filter = getCartFilter(req);

    if (!filter) {
      return res.status(400).json({
        message: "guestId required for guest cart",
      });
    }

    const cart = await Cart.findOne(filter);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.products.find(
      (product) => getProductKey(product.productId) === getProductKey(productId)
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (quantity <= 0) {
      cart.products = cart.products.filter(
        (product) => getProductKey(product.productId) !== getProductKey(productId)
      );
    } else {
      const dbProduct = await Product.findById(productId);

      if (!dbProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (quantity > dbProduct.countInStock) {
        return res.status(400).json({
          message: `Only ${dbProduct.countInStock} items available`,
        });
      }

      item.quantity = quantity;
    }

    await normalizeAndSaveCart(cart);

    return res.json(cart);
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

/* =============================
   REMOVE ITEM
============================= */
router.delete("/", optionalProtect, async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const filter = getCartFilter(req);

    if (!filter) {
      return res.status(400).json({
        message: "guestId required for guest cart",
      });
    }

    const cart = await Cart.findOne(filter);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (product) => getProductKey(product.productId) !== getProductKey(productId)
    );

    await normalizeAndSaveCart(cart);

    return res.json(cart);
  } catch (error) {
    console.error("REMOVE CART ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

/* =============================
   MERGE GUEST CART
============================= */
router.post("/merge", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { guestId } = req.body;

    const userCart = await Cart.findOne({ user: userId });

    if (!guestId) {
      return res.json(userCart || emptyCart());
    }

    const guestCart = await Cart.findOne({ guestId });

    if (!guestCart) {
      return res.json(userCart || emptyCart());
    }

    if (!userCart) {
      guestCart.user = userId;
      guestCart.guestId = undefined;
      await normalizeAndSaveCart(guestCart);

      return res.json(guestCart);
    }

    for (const guestItem of guestCart.products) {
      const existing = userCart.products.find(
        (item) =>
          getProductKey(item.productId) === getProductKey(guestItem.productId)
      );

      if (existing) {
        existing.quantity += guestItem.quantity;
      } else {
        userCart.products.push({
          productId: guestItem.productId,
          name: guestItem.name,
          image: guestItem.image,
          price: guestItem.price,
          quantity: guestItem.quantity,
        });
      }
    }

    await normalizeAndSaveCart(userCart);
    await Cart.deleteOne({ guestId: guestId });

    return res.json(userCart);
  } catch (error) {
    console.error("MERGE CART ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
