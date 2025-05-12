const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// Utility function to calculate total price
const calculateTotalPrice = (products) => {
  return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

// @route   POST /api/cart
// @desc    Add a product to the cart for a guest or logged-in user
// @access  Public
router.post("/", async (req, res) => {
  const { productId, quantity, guestId, userId } = req.body;

  if (!productId || isNaN(quantity)) {
    return res.status(400).json({ message: "Invalid productId or quantity" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          quantity: Number(quantity),
        });
      }
     
      cart.totalPrice = calculateTotalPrice(cart.products);
      await cart.save();
      return res.status(200).json(cart);
    } else {

        // Create a new cart for the guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            quantity: Number(quantity),
          },
        ],
        totalPrice: product.price * Number(quantity),
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   PUT /api/cart
// @desc    Update product quantity in the cart for a guest or logged-in user
// @access  Public
router.put("/", async (req, res) => {
  const { productId, quantity, guestId, userId } = req.body;

  if (!productId || isNaN(quantity)) {
    return res.status(400).json({ message: "Invalid productId or quantity" });
  }

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId   // searches inside the cart's products array and returns the index of the product that matches the given productId. 
    );

    if (productIndex > -1) {
        
        
      //  update quantity
      
        if (quantity > 0) {
        cart.products[productIndex].quantity = Number(quantity);
      } else {
        cart.products.splice(productIndex, 1);   // Remove product if quantity is 0
      }

      cart.totalPrice = calculateTotalPrice(cart.products);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE/api/cart
// @desc Remove a product from the cart
// @access Public
router.delete("/", async (req, res) => {
    const { productId, guestId, userId} = req.body;
    try {
        let cart = await getCart(userId, guestId);

        if(!cart) return res.status(404).json({message: "Cart not found"});

        const productIndex  = cart.products.findIndex (
            (p) =>
                p.productId.toString() === productId 
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex , 1);

            cart.totalPrice = cart.products.reduce (
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in the cart" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error"});
    }

});

// @route GET /api/cart
// @desc Get logged-in user's or guest user's cart
// @access Public
router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;

    try {
        const cart = await getCart(userId, guestId);
        if(cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Cart not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error"});
    }
});


// @route POST/api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", protect, async (req, res) => {
    const {guestId} = req.body;

    try {
        //Find the guest cart and user Cart
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({user: req.user._id});

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ message: "Guest cart is empty"});
            }

            if (userCart) {
                //Merge guest cart into user cart
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((item) => 
                    item.productId.toString() === guestItem.productId.toString());

                    if (productIndex > -1) {
                      // If the items exists in the user cart, update the quantity
                      userCart.products[productIndex].quantity += guestItem.quantity;

                    } else {
                     // Otherwise , add the guest item to the cart
                     userCart.products.push(guestItem);
                    }

                });
                 
                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );

                await userCart.save();

                // Remove the guest cart after merging
                try {
                    await Cart.findOneAndDelete ({ guestId });
                } catch (error) {
                    console.error("Error deleting guest cart:", error);
                }
                res.status(200).json(userCart);

            } else {
                // If the user has no existing cart, assign the guest cart to the user
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();

                res.status(200).json(guestCart);
            }
        } else {
            if (userCart) {
                // Guest cart has already been merged, return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json({message: "Guest cart not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error"});
    }
});

module.exports = router;









