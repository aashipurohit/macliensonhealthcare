// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

// // Helper function to load cart from localStorage
// const loadCartFromStorage = () => {
//     const storedCart = localStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) : { products: [] };

// };

// // Helper function to save cart to localStorage
// const saveCartToStorage = (cart) => {
//     localStorage.setItem("cart", JSON.stringify(cart));
// };

// // Fetch cart for a user or guest
// export const fetchCart = createAsyncThunk(
//     "cart/fetchCart",
//     async ({userId, guestId }, { rejectWithValue }) => {
//     try {
//     const response = await axios.get(
//     `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//     {
//     params: { userId, guestId },
//     }
//     );
//     return response.data;
// } catch (error) {
//     console.error(error);
//     return rejectWithValue(error.response.data);
// }
//     }
// );

// // Add an item to the cart for a user or guest
// // export const addToCart = createAsyncThunk("cart/addToCart", async ({productId, quantity,guestId,userId}, {rejectWithValue}) => {
// //     try{
// //         const response = await axios.post(
// //             `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
// //             {
// //                 productId,
// //                 quantity,
// //                 guestId,
// //                 userId,
// //             }
// //         );
// //         return response.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// // }
// // );

// export const addToCart = createAsyncThunk(
//   'cart/addToCart',
//   async ({ productId, quantity }, { getState, rejectWithValue }) => {
//     try {
//       const { auth: { userInfo } } = getState();
      
//       // For both authenticated and guest users
//       const { data: product } = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`
//       );

//       const cartItem = {
//         product: product._id,
//         name: product.name,
//         image: product.images[0]?.url,
//         price: product.price,
//         countInStock: product.countInStock,
//         quantity,
//       };

//       if (userInfo) {
//         // Authenticated user - send to backend
//         const config = {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${userInfo.token}`,
//           },
//         };

//         const { data } = await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//           { productId, quantity },
//           config
//         );
//         return data;
//       } else {
//         // Guest user - store in localStorage
//         return cartItem;
//       }
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );


// // Update the quantity of an item in the cart
// export const updateCartItemQuantity = createAsyncThunk(
//     "cart/updateCartItemQuantity", async ({productId, quantity, guestId, userId, size, color},
//     {rejectWithValue}) => {
//     try {
//     const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//         {
//            productId,
//            quantity,
//            guestId,
//            userId,

//         }
//     );
//     return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// }
// );

// // Remove an item from the cart
// export const removeFromCart = createAsyncThunk(
//     "cart/removeFromCart",
//     async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
//     try {
//     const response = await axios({
//     method: "DELETE",
//     url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//     data: { productId, guestId, userId, size, color },
//     });
//     return response.data;
// }
//     catch (error) {
//        return rejectWithValue(error.response.data) ;
//     }
//     }
// );

// // Merge guest cart into user cart
// export const mergeCart = createAsyncThunk(
//     "cart/mergeCart",
//     async ({ guestId, user }, { rejectWithValue }) => {
//     try {
//     const response = await axios.post(
//     `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
//     { guestId, user },
//     {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//         },

//     }
//     );
//      return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// }
// );

//   const cartSlice = createSlice({
//      name: "cart",
//       initialState: { 
//         cart: loadCartFromStorage(),
//          loading: false, 
//          error: null, },
//           reducers: {
//              clearCart: (state) => { 
//                 state.cart = { products: [] };
//                  localStorage.removeItem("cart");
//                  },
//                  },
        
        
//          extraReducers: (builder) => {
//     builder

//     // FETCH CART
//     .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//     })
//     .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cart = action.payload;
//         saveCartToStorage(action.payload);
//     })
//     .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to fetch cart";
//     })

//     // ADD TO CART
//     .addCase(addToCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//     })
//     .addCase(addToCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cart = action.payload;
//         saveCartToStorage(action.payload);
//     })
//     .addCase(addToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to add to cart";
//     })

//     // UPDATE CART ITEM
//     .addCase(updateCartItemQuantity.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//     })
//     .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cart = action.payload;
//         saveCartToStorage(action.payload);
//     })
//     .addCase(updateCartItemQuantity.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to update item quantity";
//     })

//     // REMOVE FROM CART
//     .addCase(removeFromCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//     })
//     .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cart = action.payload;
//         saveCartToStorage(action.payload);
//     })
//     .addCase(removeFromCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to remove item";
//     })

//     // MERGE CART
//     .addCase(mergeCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//     })
//     .addCase(mergeCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cart = action.payload;
//         saveCartToStorage(action.payload);
//     })
//     .addCase(mergeCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to merge cart";
//     });
// }
//   })

//   export const { clearCart } = cartSlice.actions;
//   export default cartSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Helper functions for localStorage
// const getGuestId = () => {
//   let guestId = localStorage.getItem("guestId");
//   if (!guestId) {
//     guestId = `guest_${Date.now()}`;
//     localStorage.setItem("guestId", guestId);
//   }
//   return guestId;
// };

// const saveCartToStorage = (cart) => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// };

// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { auth: { userInfo } } = getState();
//       const params = userInfo 
//         ? { userId: userInfo._id } 
//         : { guestId: getGuestId() };

//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//         { params }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ productId, quantity }, { getState, rejectWithValue }) => {
//     try {
//       const { auth: { userInfo } } = getState();
//       const data = { productId, quantity };

//       if (userInfo) {
//         // Authenticated user
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//           data,
//           {
//             headers: {
//               Authorization: `Bearer ${userInfo.token}`,
//             },
//           }
//         );
//         return response.data;
//       } else {
//         // Guest user
//         const guestId = getGuestId();
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//           { ...data, guestId }
//         );
//         return response.data;
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const mergeCart = createAsyncThunk(
//   "cart/mergeCart",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { auth: { userInfo }, cart } = getState();
//       const guestId = localStorage.getItem("guestId");

//       if (!guestId || !userInfo) {
//         throw new Error("No guest cart to merge");
//       }

//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
//         { guestId },
//         {
//           headers: {
//             Authorization: `Bearer ${userInfo.token}`,
//           },
//         }
//       );

//       // Clear guest ID after successful merge
//       localStorage.removeItem("guestId");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );


// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cart: { products: [], totalPrice: 0 },
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearCart: (state) => {
//       state.cart = { products: [], totalPrice: 0 };
//       localStorage.removeItem("cart");
//     },


//   },
//   extraReducers: (builder) => {
//     builder
//       .addMatcher(
//         (action) => action.type.endsWith("/pending"),
//         (state) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )
//       .addMatcher(
//         (action) => action.type.endsWith("/fulfilled"),
//         (state, action) => {
//           state.loading = false;
//           state.cart = action.payload;
//           saveCartToStorage(action.payload);
//         }
//       )
//       .addMatcher(
//         (action) => action.type.endsWith("/rejected"),
//         (state, action) => {
//           state.loading = false;
//           state.error = action.payload?.message || "Cart operation failed";
//         }
//       );
//   },
// });

// export const { clearCart } = cartSlice.actions;
// export default cartSlice.reducer;



// src/redux/slices/cartSlice.js

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ===============================
// // 🔹 Helper functions
// // ===============================

// // Generate or retrieve a guestId
// const getGuestId = () => {
//   let guestId = localStorage.getItem("guestId");
//   if (!guestId) {
//     guestId = `guest_${Date.now()}`;
//     localStorage.setItem("guestId", guestId);
//   }
//   return guestId;
// };

// // Save cart persistently
// const saveCartToStorage = (cart) => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// };

// // Normalize cart payload (backend sometimes returns {cart: {...}})
// const normalizeCart = (payload) => payload.cart || payload;

// // ===============================
// // 🔹 Async Thunks
// // ===============================

// // Fetch Cart deployed version -----
// // export const fetchCart = createAsyncThunk(
// //   "cart/fetchCart",
// //   async (_, { getState, rejectWithValue }) => {
// //     try {
// //       const {
// //         auth: { user },
// //       } = getState();
// //       // const params = user ? { userId: user._id } : { guestId: getGuestId() };
// //       const params = user
// //   ? {}
// //   : { guestId: getGuestId() };

// //       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
// //         params,
// //       });

// //       return normalizeCart(response.data);
// //     } catch (error) {
// //       if (error.response?.status === 404) {
// //         return { products: [], totalPrice: 0 }; // Return empty cart if not found
// //       }
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );


// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const {
//         auth: { user },
//       } = getState();

//       // 🔹 If logged in → send Authorization header
//       if (user && user.token) {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//           {
//             headers: {
//               Authorization: `Bearer ${user.token}`,
//             },
//           }
//         );

//         return normalizeCart(response.data);
//       }

//       // 🔹 Guest cart
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//         {
//           params: { guestId: getGuestId() },
//         }
//       );

//       return normalizeCart(response.data);

//     } catch (error) {
//       if (error.response?.status === 404) {
//         return { products: [], totalPrice: 0 };
//       }

//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Add Item to Cart
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ productId, quantity }, { getState, rejectWithValue }) => {
//     try {
//       const {
//         auth: { user },
//       } = getState();
//       const data = { productId, quantity };

//       const response = user
//         ? await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, data, {
//             headers: { Authorization: `Bearer ${user.token}` },
//           })
//         : await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
//             ...data,
//             guestId: getGuestId(),
//           });

//       return normalizeCart(response.data);
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Remove Item from Cart
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async ({ productId }, { getState, rejectWithValue }) => {
//     try {
//       const {
//         auth: { user },
//       } = getState();

//       const config = user
//         ? {
//             headers: { Authorization: `Bearer ${user.token}` },
//             data: { productId },
//           }
//         : {
//             data: { productId, guestId: getGuestId() },
//           };

//       const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, config);
//       return normalizeCart(response.data);
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Update Cart Item Quantity
// export const updateCartItemQuantity = createAsyncThunk(
//   "cart/updateQuantity",
//   async ({ productId, quantity }, { getState, rejectWithValue }) => {
//     try {
//       const {
//         auth: { user},
//       } = getState();
//       const body = user
//         ? { productId, quantity }
//         : { productId, quantity, guestId: getGuestId() };

//       const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//         body,
//         user
//           ? { headers: { Authorization: `Bearer ${user.token}` } }
//           : {}
//       );

//       return normalizeCart(response.data);
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Merge Guest Cart with User Cart
// // export const mergeCart = createAsyncThunk(
// //   "cart/mergeCart",
// //   async (_, { getState, rejectWithValue }) => {
// //     try {
// //       const {
// //         auth: { userInfo },
// //       } = getState();
// //       const guestId = localStorage.getItem("guestId");

// //       if (!userInfo?.token) throw new Error("User not authenticated");
// //       if (!guestId) throw new Error("No guest cart to merge");

// //       const response = await axios.post(
// //         `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
// //         { guestId },
// //         { headers: { Authorization: `Bearer ${userInfo.token}` } }
// //       );

// //       localStorage.removeItem("guestId");
// //       return normalizeCart(response.data);
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// export const mergeCart = createAsyncThunk(
//   "cart/mergeCart",
//   async ({ guestId, userToken }, { rejectWithValue }) => {
//     try {
//       if (!userToken) throw new Error("User not authenticated");
//       if (!guestId) throw new Error("No guest cart to merge");

//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
//         { guestId },
//         {
//           headers: { Authorization: `Bearer ${userToken}` },
//         }
//       );

//       localStorage.removeItem("guestId");

//       return normalizeCart(response.data);
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // ===============================
// // 🔹 Slice
// // ===============================

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cart: JSON.parse(localStorage.getItem("cart")) || { products: [], totalPrice: 0 },
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearCart: (state) => {
//       state.cart = { products: [], totalPrice: 0 };
//       localStorage.removeItem("cart");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Add to Cart (explicit, so we can do any UI logic if needed)
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cart = normalizeCart(action.payload);
//         saveCartToStorage(state.cart);
//       })

//       // Universal handlers
//       .addMatcher(
//         (action) => action.type.startsWith("cart/") && action.type.endsWith("/pending"),
//         (state) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )
//       .addMatcher(
//         (action) => action.type.startsWith("cart/") && action.type.endsWith("/fulfilled"),
//         (state, action) => {
//           state.loading = false;
//           state.cart = normalizeCart(action.payload);
//           saveCartToStorage(state.cart);
//         }
//       )
//       .addMatcher(
//         (action) => action.type.startsWith("cart/") && action.type.endsWith("/rejected"),
//         (state, action) => {
//           state.loading = false;
//           state.error = action.payload || "Something went wrong";
//         }
//       );
//   },
// });

// export const { clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;

// const getGuestId = () => {
//   let guestId = localStorage.getItem("guestId");
//   if (!guestId) {
//     guestId = `guest_${Date.now()}`;
//     localStorage.setItem("guestId", guestId);
//   }
//   return guestId;
// };

// const saveCart = (cart) => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// };

// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, { getState }) => {
//     const { auth } = getState();

//     if (auth.user) {
//       const res = await axios.get(API, {
//         headers: { Authorization: `Bearer ${auth.user.token}` },
//       });
//       return res.data;
//     }

//     const res = await axios.get(API, {
//       params: { guestId: getGuestId() },
//     });

//     return res.data;
//   }
// );

// export const addToCart = createAsyncThunk(
//   "cart/add",
//   async ({ productId, quantity }, { getState }) => {
//     const { auth } = getState();

//     const res = await axios.post(
//       API,
//       auth.user
//         ? { productId, quantity }
//         : { productId, quantity, guestId: getGuestId() },
//       auth.user
//         ? { headers: { Authorization: `Bearer ${auth.user.token}` } }
//         : {}
//     );

//     return res.data;
//   }
// );

// export const updateCartItemQuantity = createAsyncThunk(
//   "cart/update",
//   async ({ productId, quantity }, { getState }) => {
//     const { auth } = getState();

//     const res = await axios.put(
//       API,
//       auth.user
//         ? { productId, quantity }
//         : { productId, quantity, guestId: getGuestId() },
//       auth.user
//         ? { headers: { Authorization: `Bearer ${auth.user.token}` } }
//         : {}
//     );

//     return res.data;
//   }
// );

// export const removeFromCart = createAsyncThunk(
//   "cart/remove",
//   async ({ productId }, { getState }) => {
//     const { auth } = getState();

//     const res = await axios.delete(API, {
//       data: auth.user
//         ? { productId }
//         : { productId, guestId: getGuestId() },
//       headers: auth.user
//         ? { Authorization: `Bearer ${auth.user.token}` }
//         : {},
//     });

//     return res.data;
//   }
// );

// export const mergeCart = createAsyncThunk(
//   "cart/merge",
//   async ({ guestId, userToken }) => {
//     const res = await axios.post(
//       `${API}/merge`,
//       { guestId },
//       { headers: { Authorization: `Bearer ${userToken}` } }
//     );

//     localStorage.removeItem("guestId");

//     return res.data;
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cart: JSON.parse(localStorage.getItem("cart")) || {
//       products: [],
//       totalPrice: 0,
//     },
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearCart: (state) => {
//       state.cart = { products: [], totalPrice: 0 };
//       localStorage.removeItem("cart");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addMatcher(
//         (action) => action.type.startsWith("cart/") && action.type.endsWith("/pending"),
//         (state) => {
//           state.loading = true;
//         }
//       )
//       .addMatcher(
//         (action) => action.type.startsWith("cart/") && action.type.endsWith("/fulfilled"),
//         (state, action) => {
//           state.loading = false;
//           state.cart = action.payload;
//           saveCart(action.payload);
//         }
//       )
//       .addMatcher(
//         (action) => action.type.startsWith("cart/") && action.type.endsWith("/rejected"),
//         (state, action) => {
//           state.loading = false;
//           state.error = action.error.message;
//         }
//       );
//   },
// });

// export const { clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;

// const getGuestId = () => {
//   return localStorage.getItem("guestId");
// };

// const createGuestId = () => {
//   let guestId = localStorage.getItem("guestId");
//   if (!guestId) {
//     guestId = `guest_${Date.now()}`;
//     localStorage.setItem("guestId", guestId);
//   }
//   return guestId;
// };

// const saveCart = (cart) => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// };

// /* =========================
//    FETCH CART
// ========================= */

// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, { getState }) => {
//     const { auth } = getState();

//     if (auth.user) {
//       const res = await axios.get(API, {
//         headers: {
//           Authorization: `Bearer ${auth.user.token}`,
//         },
//       });

//       return res.data;
//     }

//     const guestId = getGuestId();

//     if (!guestId) {
//       return { products: [], totalPrice: 0 };
//     }

//     const res = await axios.get(API, {
//       params: { guestId },
//     });

//     return res.data;
//   }
// );

// /* =========================
//    ADD TO CART
// ========================= */

// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ productId, quantity }, { getState }) => {
//     const { auth } = getState();

//     let body = { productId, quantity };
//     let config = {};

//     if (auth.user) {
//       config.headers = {
//         Authorization: `Bearer ${auth.user.token}`,
//       };
//     } else {
//       body.guestId = createGuestId();
//     }

//     const res = await axios.post(API, body, config);

//     return res.data;
//   }
// );

// /* =========================
//    UPDATE CART
// ========================= */

// export const updateCartItemQuantity = createAsyncThunk(
//   "cart/updateCart",
//   async ({ productId, quantity }, { getState }) => {
//     const { auth } = getState();

//     let body = { productId, quantity };
//     let config = {};

//     if (auth.user) {
//       config.headers = {
//         Authorization: `Bearer ${auth.user.token}`,
//       };
//     } else {
//       body.guestId = getGuestId();
//     }

//     const res = await axios.put(API, body, config);

//     return res.data;
//   }
// );

// /* =========================
//    REMOVE ITEM
// ========================= */

// export const removeFromCart = createAsyncThunk(
//   "cart/remove",
//   async ({ productId }, { getState }) => {
//     const { auth } = getState();

//     const config = {
//       data: { productId },
//     };

//     if (auth.user) {
//       config.headers = {
//         Authorization: `Bearer ${auth.user.token}`,
//       };
//     } else {
//       config.data.guestId = getGuestId();
//     }

//     const res = await axios.delete(API, config);

//     return res.data;
//   }
// );

// /* =========================
//    MERGE CART
// ========================= */

// export const mergeCart = createAsyncThunk(
//   "cart/merge",
//   async ({ guestId, userToken }) => {
//     const res = await axios.post(
//       `${API}/merge`,
//       { guestId },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }
//     );

//     localStorage.removeItem("guestId");

//     return res.data;
//   }
// );

// /* =========================
//    SLICE
// ========================= */

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cart: JSON.parse(localStorage.getItem("cart")) || {
//       products: [],
//       totalPrice: 0,
//     },
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearCart: (state) => {
//       state.cart = { products: [], totalPrice: 0 };
//       localStorage.removeItem("cart");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addMatcher(
//         (action) =>
//           action.type.startsWith("cart/") &&
//           action.type.endsWith("/pending"),
//         (state) => {
//           state.loading = true;
//         }
//       )
//       .addMatcher(
//         (action) =>
//           action.type.startsWith("cart/") &&
//           action.type.endsWith("/fulfilled"),
//         (state, action) => {
//           state.loading = false;
//           state.cart = action.payload;
//           saveCart(action.payload);
//         }
//       )
//       .addMatcher(
//         (action) =>
//           action.type.startsWith("cart/") &&
//           action.type.endsWith("/rejected"),
//         (state, action) => {
//           state.loading = false;
//           state.error = action.error.message;
//         }
//       );
//   },
// });

// export const { clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;

const getGuestId = () => localStorage.getItem("guestId");
const getUserToken = () => localStorage.getItem("userToken");

const createGuestId = () => {
  let guestId = localStorage.getItem("guestId");

  if (!guestId) {
    guestId = `guest_${Date.now()}`;
    localStorage.setItem("guestId", guestId);
  }

  return guestId;
};

const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const emptyCart = () => ({ products: [], totalPrice: 0 });

const extractError = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

const getProductKey = (item) =>
  String(item?.productId || item?.product || item?._id || "");

const calculateTotalPrice = (products) =>
  products.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

const normalizeCartItem = (item) => ({
  ...item,
  productId: item.productId || item.product || item._id,
  quantity: Number(item.quantity || 0),
  price: Number(item.price || 0),
});

const normalizeCart = (payload) => {
  const cart = payload?.cart || payload || emptyCart();
  const products = Array.isArray(cart.products)
    ? cart.products.map(normalizeCartItem)
    : [];

  return {
    ...cart,
    products,
    totalPrice:
      typeof cart.totalPrice === "number"
        ? cart.totalPrice
        : calculateTotalPrice(products),
  };
};

const getStoredCart = () => {
  const raw = localStorage.getItem("cart");

  if (!raw) {
    return emptyCart();
  }

  try {
    return normalizeCart(JSON.parse(raw));
  } catch {
    return emptyCart();
  }
};

const mergeAddedCart = (currentCart, payload) => {
  const incomingCart = normalizeCart(payload);

  if (!incomingCart.products.length) {
    return normalizeCart(currentCart);
  }

  const mergedProducts = [...normalizeCart(currentCart).products];

  for (const incomingItem of incomingCart.products) {
    const incomingKey = getProductKey(incomingItem);
    const existingIndex = mergedProducts.findIndex(
      (item) => getProductKey(item) === incomingKey
    );

    if (existingIndex >= 0) {
      mergedProducts[existingIndex] = incomingItem;
    } else {
      mergedProducts.push(incomingItem);
    }
  }

  return {
    ...incomingCart,
    products: mergedProducts,
    totalPrice: calculateTotalPrice(mergedProducts),
  };
};

export const mergeCart = createAsyncThunk(
  "cart/merge",
  async ({ guestId, userToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/merge`,
        { guestId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      localStorage.removeItem("guestId");
      return response.data;
    } catch (error) {
      return rejectWithValue(extractError(error));
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userToken = auth.user?.token || getUserToken();
      const guestId = getGuestId();

      if (userToken) {
        if (guestId) {
          await dispatch(
            mergeCart({
              guestId,
              userToken,
            })
          ).unwrap();
        }

        const response = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        return response.data;
      }

      if (!guestId) {
        return emptyCart();
      }

      const response = await axios.get(API, {
        params: { guestId },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(extractError(error));
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userToken = auth.user?.token || getUserToken();

      const body = {
        productId,
        quantity: Number(quantity),
      };

      const config = {};

      if (userToken) {
        config.headers = {
          Authorization: `Bearer ${userToken}`,
        };
      } else {
        body.guestId = createGuestId();
      }

      const response = await axios.post(API, body, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractError(error));
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userToken = auth.user?.token || getUserToken();

      const body = {
        productId,
        quantity: Number(quantity),
      };

      const config = {};

      if (userToken) {
        config.headers = {
          Authorization: `Bearer ${userToken}`,
        };
      } else {
        const guestId = getGuestId();

        if (!guestId) {
          return emptyCart();
        }

        body.guestId = guestId;
      }

      const response = await axios.put(API, body, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractError(error));
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userToken = auth.user?.token || getUserToken();

      const config = {
        data: { productId },
      };

      if (userToken) {
        config.headers = {
          Authorization: `Bearer ${userToken}`,
        };
      } else {
        const guestId = getGuestId();

        if (!guestId) {
          return emptyCart();
        }

        config.data.guestId = guestId;
      }

      const response = await axios.delete(API, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractError(error));
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: getStoredCart(),
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = emptyCart();
      state.error = null;
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.cart = normalizeCart(action.payload);
        saveCart(state.cart);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload || action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = mergeAddedCart(state.cart, action.payload);
        saveCart(state.cart);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = normalizeCart(action.payload);
        saveCart(state.cart);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = normalizeCart(action.payload);
        saveCart(state.cart);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.cart = normalizeCart(action.payload);
        saveCart(state.cart);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
