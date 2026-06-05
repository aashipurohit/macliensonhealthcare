// // deployed version ------
// const express = require("express");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // Helper function to get a cart by userId or guestId
// const getCart = async (userId, guestId) => {
//   if (userId) {
//     return await Cart.findOne({ user: userId });
//   } else if (guestId) {
//     return await Cart.findOne({ guestId });
//   }
//   return null;
// };

// // Utility function to calculate total price
// const calculateTotalPrice = (products) => {
//   return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
// };

// // @route   POST /api/cart
// // @desc    Add a product to the cart for a guest or logged-in user
// // @access  Public
// router.post("/", async (req, res) => {
//   const { productId, quantity, guestId, userId } = req.body;

//   if (!productId || isNaN(quantity)) {
//     return res.status(400).json({ message: "Invalid productId or quantity" });
//   }

//   try {
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     let cart = await getCart(userId, guestId);

//     if (cart) {
//       const productIndex = cart.products.findIndex(
//         (p) => p.productId.toString() === productId
//       );

//       if (productIndex > -1) {
//         cart.products[productIndex].quantity += Number(quantity);
//       } else {
//         cart.products.push({
//           productId,
//           name: product.name,
//           image: product.images[0].url,
//           price: product.price,
//           quantity: Number(quantity),
//         });
//       }
     
//       cart.totalPrice = calculateTotalPrice(cart.products);
//       await cart.save();
//       return res.status(200).json(cart);
//     } else {

//         // Create a new cart for the guest or user
//       const newCart = await Cart.create({
//         user: userId ? userId : undefined,
//         guestId: guestId ? guestId : "guest_" + new Date().getTime(),
//         products: [
//           {
//             productId,
//             name: product.name,
//             image: product.images[0].url,
//             price: product.price,
//             quantity: Number(quantity),
//           },
//         ],
//         totalPrice: product.price * Number(quantity),
//       });

//       return res.status(201).json(newCart);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // @route   PUT /api/cart
// // @desc    Update product quantity in the cart for a guest or logged-in user
// // @access  Public
// router.put("/", async (req, res) => {
//   const { productId, quantity, guestId, userId } = req.body;

//   if (!productId || isNaN(quantity)) {
//     return res.status(400).json({ message: "Invalid productId or quantity" });
//   }

//   try {
//     let cart = await getCart(userId, guestId);
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const productIndex = cart.products.findIndex(
//       (p) => p.productId.toString() === productId   // searches inside the cart's products array and returns the index of the product that matches the given productId. 
//     );

//     if (productIndex > -1) {
        
        
//       //  update quantity
      
//         if (quantity > 0) {
//         cart.products[productIndex].quantity = Number(quantity);
//       } else {
//         cart.products.splice(productIndex, 1);   // Remove product if quantity is 0
//       }

//       cart.totalPrice = calculateTotalPrice(cart.products);
//       await cart.save();
//       return res.status(200).json(cart);
//     } else {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // @route DELETE/api/cart
// // @desc Remove a product from the cart
// // @access Public
// router.delete("/", async (req, res) => {
//     const { productId, guestId, userId} = req.body;
//     try {
//         let cart = await getCart(userId, guestId);

//         if(!cart) return res.status(404).json({message: "Cart not found"});

//         const productIndex  = cart.products.findIndex (
//             (p) =>
//                 p.productId.toString() === productId 
//         );

//         if (productIndex > -1) {
//             cart.products.splice(productIndex , 1);

//             cart.totalPrice = cart.products.reduce (
//                 (acc, item) => acc + item.price * item.quantity,
//                 0
//             );
//             await cart.save();
//             return res.status(200).json(cart);
//         } else {
//             return res.status(404).json({ message: "Product not found in the cart" });
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Server Error"});
//     }

// });

// // @route GET /api/cart
// // @desc Get logged-in user's or guest user's cart
// // @access Public
// router.get("/", async (req, res) => {
//     const { userId, guestId } = req.query;

//     try {
//         const cart = await getCart(userId, guestId);
//         if(cart) {
//             res.json(cart);
//         } else {
//             res.status(404).json({ message: "Cart not found"});
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error"});
//     }
// });


// // @route POST/api/cart/merge
// // @desc Merge guest cart into user cart on login
// // @access Private
// router.post("/merge", protect, async (req, res) => {
//   const { guestId } = req.body;

//   try {
//     // Find the guest cart and user cart
//     const guestCart = await Cart.findOne({ guestId });
//     const userCart = await Cart.findOne({ user: req.user._id });

//     if (!guestCart || guestCart.products.length === 0) {
//       // If no guest cart or empty, just return the user cart (if exists)
//       return res.status(200).json(userCart || { products: [], totalPrice: 0 });
//     }

//     if (userCart) {
//       // Merge guest cart into user cart
//       guestCart.products.forEach((guestItem) => {
//         const existingItem = userCart.products.find(
//           item => item.productId.toString() === guestItem.productId.toString()
//         );

//         if (existingItem) {
//           // Update quantity if product exists
//           existingItem.quantity += guestItem.quantity;
//         } else {
//           // Add new product if it doesn't exist
//           userCart.products.push(guestItem);
//         }
//       });

//       // Recalculate total price
//       userCart.totalPrice = calculateTotalPrice(userCart.products);
//       await userCart.save();

//       // Delete the guest cart
//       await Cart.deleteOne({ guestId });
//       return res.status(200).json(userCart);
//     } else {
//       // If user has no cart, convert guest cart to user cart
//       guestCart.user = req.user._id;
//       guestCart.guestId = undefined;
//       await guestCart.save();
//       return res.status(200).json(guestCart);
//     }
//   } catch (error) {
//     console.error("Cart merge error:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

// module.exports = router;

// const express = require("express");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// /* -------------------------------
//    Utilities
// -------------------------------- */

// const buildCartFilter = ({ userId, guestId }) => {
//   if (userId) return { user: userId };
//   if (guestId) return { guestId };
//   return null;
// };

// const calculateTotalPrice = (products) =>
//   products.reduce((acc, item) => acc + item.price * item.quantity, 0);

// /* -------------------------------
//    GET CART
// -------------------------------- */
// // router.get("/", async (req, res) => {
// //   const { userId, guestId } = req.query;

// //   try {
// //     const filter = buildCartFilter({ userId, guestId });
// //     if (!filter) {
// //       return res.status(400).json({ message: "userId or guestId required" });
// //     }

// //     const cart = await Cart.findOne(filter);
// //     return res.status(200).json(cart || { products: [], totalPrice: 0 });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // });

// /* -------------------------------
//    GET CART
// -------------------------------- */
// router.get("/", async (req, res) => {
//   const { guestId } = req.query;

//   try {
//     let filter = null;

//     // If request has Authorization header (logged-in user)
//     if (req.headers.authorization) {
//       const token = req.headers.authorization.split(" ")[1];
//       const jwt = require("jsonwebtoken");

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       filter = { user: decoded.user.id };
//     }

//     // Guest user
//     else if (guestId) {
//       filter = { guestId };
//     }

//     if (!filter) {
//       return res.status(400).json({ message: "guestId required for guest cart" });
//     }

//     const cart = await Cart.findOne(filter);

//     return res.status(200).json(cart || { products: [], totalPrice: 0 });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// /* -------------------------------
//    ADD TO CART (ATOMIC)
// -------------------------------- */
// router.post("/", protect, async (req, res) => {
//   // const { productId, quantity, guestId, userId } = req.body;
// const { productId, quantity, guestId } = req.body;

// let userId = null;

// if (req.user) {
//   userId = req.user._id;
// }

//   if (!productId || isNaN(quantity)) {
//     return res.status(400).json({ message: "Invalid productId or quantity" });
//   }

//   try {
//     // const filter = buildCartFilter({ userId, guestId });
//     const filter = buildCartFilter({ userId, guestId });
//     if (!filter) {
//       return res.status(400).json({ message: "guestId required for guest cart" });
//     }

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Attempt 1: Increment quantity if product exists
//     let cart = await Cart.findOneAndUpdate(
//       { ...filter, "products.productId": productId },
//       {
//         $inc: {
//           "products.$.quantity": Number(quantity),
//           totalPrice: product.price * Number(quantity),
//         },
//       },
//       { new: true }
//     );

//     // Attempt 2: Push product or create cart atomically
//     if (!cart) {
//       cart = await Cart.findOneAndUpdate(
//         filter,
//         {
//           $push: {
//             products: {
//               productId,
//               name: product.name,
//               image: product.images?.[0]?.url || "",
//               price: product.price,
//               quantity: Number(quantity),
//             },
//           },
//           $inc: { totalPrice: product.price * Number(quantity) },
//           $setOnInsert: {
//             user: userId || undefined,
//             guestId: guestId || undefined,
//           },
//         },
//         { new: true, upsert: true }
//       );
//     }

//     return res.status(200).json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// /* -------------------------------
//    UPDATE QUANTITY (SAFE)
// -------------------------------- */
// router.put("/", protect, async (req, res) => {
//   // const { productId, quantity, guestId, userId } = req.body;
//   const { productId, quantity, guestId } = req.body;

// let userId = null;

// if (req.user) {
//   userId = req.user._id;
// }

//   if (!productId || isNaN(quantity)) {
//     return res.status(400).json({ message: "Invalid productId or quantity" });
//   }

//   try {
//     const filter = buildCartFilter({ userId, guestId });
//     if (!filter) {
//       return res.status(400).json({ message: "guestId required for guest cart" });
//     }

//     const cartRead = await Cart.findOne(filter);
//     if (!cartRead) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const item = cartRead.products.find(
//       (p) => p.productId.toString() === productId
//     );

//     if (!item) {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }

//     const newQty = Number(quantity);
//     const qtyDiff = newQty - item.quantity;

//     let cart;

//     if (newQty > 0) {
//       cart = await Cart.findOneAndUpdate(
//         { ...filter, "products.productId": productId },
//         {
//           $set: { "products.$.quantity": newQty },
//           $inc: { totalPrice: qtyDiff * item.price },
//         },
//         { new: true }
//       );
//     } else {
//       cart = await Cart.findOneAndUpdate(
//         filter,
//         {
//           $pull: { products: { productId } },
//           $inc: { totalPrice: -(item.price * item.quantity) },
//         },
//         { new: true }
//       );
//     }

//     return res.status(200).json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// /* -------------------------------
//    REMOVE ITEM
// -------------------------------- */
// router.delete("/",protect, async (req, res) => {
//   // const { productId, guestId, userId } = req.body;
//   const { productId, guestId } = req.body;

// let userId = null;

// if (req.user) {
//   userId = req.user._id;
// }

//   try {
//     const filter = buildCartFilter({ userId, guestId });
//     if (!filter) {
//       return res.status(400).json({ message: "guestId required for guest cart" });
//     }

//     const cartRead = await Cart.findOne(filter);
//     if (!cartRead) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const item = cartRead.products.find(
//       (p) => p.productId.toString() === productId
//     );

//     if (!item) {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }

//     const cart = await Cart.findOneAndUpdate(
//       filter,
//       {
//         $pull: { products: { productId } },
//         $inc: { totalPrice: -(item.price * item.quantity) },
//       },
//       { new: true }
//     );

//     return res.status(200).json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// /* -------------------------------
//    MERGE GUEST CART INTO USER CART
// -------------------------------- */
// router.post("/merge", protect, async (req, res) => {
//   const { guestId } = req.body;

//   try {
//     const userId = req.user._id;

//     if (!guestId) {
//       return res.status(400).json({ message: "guestId required" });
//     }

//     const guestCart = await Cart.findOne({ guestId });
//     if (!guestCart || guestCart.products.length === 0) {
//       const userCart = await Cart.findOne({ user: userId });
//       return res.status(200).json(userCart || { products: [], totalPrice: 0 });
//     }

//     let userCart = await Cart.findOne({ user: userId });

//     if (!userCart) {
//       guestCart.user = userId;
//       guestCart.guestId = undefined;
//       await guestCart.save();
//       return res.status(200).json(guestCart);
//     }

//     guestCart.products.forEach((guestItem) => {
//       const existing = userCart.products.find(
//         (p) => p.productId.toString() === guestItem.productId.toString()
//       );

//       if (existing) {
//         existing.quantity += guestItem.quantity;
//       } else {
//         userCart.products.push(guestItem);
//       }
//     });

//     userCart.totalPrice = calculateTotalPrice(userCart.products);
//     await userCart.save();
//     await Cart.deleteOne({ guestId });

//     return res.status(200).json(userCart);
//   } catch (error) {
//     console.error("Cart merge error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;





// const express = require("express");
// const jwt = require("jsonwebtoken");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// /* -------------------------
//    Helper: get userId if token exists
// ------------------------- */
// const getUserIdFromToken = (req) => {
//   try {
//     if (!req.headers.authorization) return null;
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded?.id || decoded?.user?.id || null;
//   } catch {
//     return null;
//   }
// };

// /* -------------------------
//    Helper: build cart filter
// ------------------------- */
// const buildCartFilter = ({ userId, guestId }) => {
//   if (userId) return { user: userId };
//   if (guestId) return { guestId };
//   return null;
// };

// /* -------------------------
//    Helper: calculate cart total
// ------------------------- */
// const calculateTotal = (products) =>
//   products.reduce((sum, item) => sum + item.price * item.quantity, 0);

// /* =============================
//    GET CART
// ============================= */
// router.get("/", async (req, res) => {
//   try {
//     const guestId = req.query.guestId;
//     const userId = getUserIdFromToken(req);

//     const filter = buildCartFilter({ userId, guestId });

//     if (!filter) {
//       return res.status(400).json({ message: "guestId required for guest cart" });
//     }

//     const cart = await Cart.findOne(filter);

//     if (!cart) {
//       return res.json({ products: [], totalPrice: 0 });
//     }

//     return res.json(cart);

//   } catch (error) {
//     console.error("GET CART ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* =============================
//    ADD ITEM
// ============================= */
// router.post("/", async (req, res) => {
//   try {
//     const { productId, quantity, guestId } = req.body;

//     const userId = getUserIdFromToken(req);
//     const filter = buildCartFilter({ userId, guestId });

//     if (!filter) {
//       return res.status(400).json({ message: "guestId required for guest cart" });
//     }

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let cart = await Cart.findOne(filter);

//     if (!cart) {
//       cart = new Cart({
//         ...filter,
//         products: [],
//         totalPrice: 0,
//       });
//     }

//     const existing = cart.products.find(
//       (p) => p.productId.toString() === productId
//     );

//     if (existing) {
//       existing.quantity += Number(quantity);
//     } else {
//       cart.products.push({
//         productId,
//         name: product.name,
//         image: product.images?.[0]?.url || "",
//         price: product.price,
//         quantity: Number(quantity),
//       });
//     }

//     cart.totalPrice = calculateTotal(cart.products);

//     await cart.save();

//     res.json(cart);

//   } catch (error) {
//     console.error("ADD CART ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* =============================
//    UPDATE QUANTITY
// ============================= */
// router.put("/", async (req, res) => {
//   try {
//     const { productId, quantity, guestId } = req.body;

//     const userId = getUserIdFromToken(req);
//     const filter = buildCartFilter({ userId, guestId });

//     if (!filter) {
//       return res.status(400).json({ message: "guestId required for guest cart" });
//     }

//     const cart = await Cart.findOne(filter);

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const item = cart.products.find(
//       (p) => p.productId.toString() === productId
//     );

//     if (!item) {
//       return res.status(404).json({ message: "Product not in cart" });
//     }

//     if (quantity <= 0) {
//       cart.products = cart.products.filter(
//         (p) => p.productId.toString() !== productId
//       );
//     } else {
//       item.quantity = Number(quantity);
//     }

//     cart.totalPrice = calculateTotal(cart.products);

//     await cart.save();

//     res.json(cart);

//   } catch (error) {
//     console.error("UPDATE CART ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* =============================
//    REMOVE ITEM
// ============================= */
// router.delete("/", async (req, res) => {
//   try {
//     const { productId, guestId } = req.body;

//     const userId = getUserIdFromToken(req);
//     const filter = buildCartFilter({ userId, guestId });

//     if (!filter) {
//       return res.status(400).json({ message: "guestId required for guest cart" });
//     }

//     const cart = await Cart.findOne(filter);

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     cart.products = cart.products.filter(
//       (p) => p.productId.toString() !== productId
//     );

//     cart.totalPrice = calculateTotal(cart.products);

//     await cart.save();

//     res.json(cart);

//   } catch (error) {
//     console.error("REMOVE CART ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* =============================
//    MERGE GUEST CART
// ============================= */
// router.post("/merge", protect, async (req, res) => {
//   try {
//     const { guestId } = req.body;
//     const userId = req.user._id;

//     if (!guestId) {
//       return res.status(400).json({ message: "guestId required" });
//     }

//     const guestCart = await Cart.findOne({ guestId });

//     if (!guestCart) {
//       const userCart = await Cart.findOne({ user: userId });
//       return res.json(userCart || { products: [], totalPrice: 0 });
//     }

//     let userCart = await Cart.findOne({ user: userId });

//     if (!userCart) {
//       guestCart.user = userId;
//       guestCart.guestId = undefined;
//       await guestCart.save();
//       return res.json(guestCart);
//     }

//     guestCart.products.forEach((guestItem) => {
//       const existing = userCart.products.find(
//         (p) => p.productId.toString() === guestItem.productId.toString()
//       );

//       if (existing) {
//         existing.quantity += guestItem.quantity;
//       } else {
//         userCart.products.push(guestItem);
//       }
//     });

//     userCart.totalPrice = calculateTotal(userCart.products);

//     await userCart.save();
//     await Cart.deleteOne({ guestId });

//     res.json(userCart);

//   } catch (error) {
//     console.error("MERGE CART ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

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

const dedupeCartProducts = (products) => {
  const map = new Map();

  for (const item of products) {
    const key = item.productId.toString();

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

    const existingItem = cart.products.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItem) {
      const updatedQty = existingItem.quantity + quantity;

      if (updatedQty > product.countInStock) {
        return res.status(400).json({
          message: `Only ${product.countInStock} items available`,
        });
      }

      existingItem.quantity = updatedQty;
    } else {
      cart.products.push({
        productId: product._id,
        name: product.name,
        image: product.images?.[0]?.url || "",
        price: product.price,
        quantity,
      });
    }

   cart.products = dedupeCartProducts(cart.products);
cart.totalPrice = calculateTotal(cart.products);
await cart.save();

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
      (product) => product.productId.toString() === productId.toString()
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (quantity <= 0) {
      cart.products = cart.products.filter(
        (product) => product.productId.toString() !== productId.toString()
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

  cart.products = dedupeCartProducts(cart.products);
cart.totalPrice = calculateTotal(cart.products);
await cart.save();

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
      (product) => product.productId.toString() !== productId.toString()
    );

cart.products = dedupeCartProducts(cart.products);
cart.totalPrice = calculateTotal(cart.products);
await cart.save();

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
guestCart.products = dedupeCartProducts(guestCart.products);
guestCart.totalPrice = calculateTotal(guestCart.products);
await guestCart.save();

      return res.json(guestCart);
    }

    for (const guestItem of guestCart.products) {
      const existing = userCart.products.find(
        (item) =>
          item.productId.toString() === guestItem.productId.toString()
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

userCart.products = dedupeCartProducts(userCart.products);
userCart.totalPrice = calculateTotal(userCart.products);
await userCart.save();
    await Cart.deleteOne({ guestId: guestId });

    return res.json(userCart);
  } catch (error) {
    console.error("MERGE CART ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;