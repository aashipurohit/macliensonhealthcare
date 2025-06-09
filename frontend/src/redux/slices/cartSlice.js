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



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper
const getGuestId = () => {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = `guest_${Date.now()}`;
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ================== Thunks ===================

// Fetch cart
// export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { getState, rejectWithValue }) => {
//   try {
//     const { auth: { userInfo } } = getState();
//     const params = userInfo ? { userId: userInfo._id } : { guestId: getGuestId() };
//     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, { params });
//     return response.data.cart || response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { getState, rejectWithValue }) => {
  try {
    const { auth: { userInfo } } = getState();
    const params = userInfo ? { userId: userInfo._id } : { guestId: getGuestId() };

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, { params });
    return response.data.cart || response.data;

  } catch (error) {
    if (error.response?.status === 404) {
      return { products: [], totalPrice: 0 }; // Return empty cart instead of failing
    }
    return rejectWithValue(error.response?.data || error.message);
  }
});


// Add item to cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity }, { getState, rejectWithValue }) => {
  try {
    const { auth: { userInfo } } = getState();
    const data = { productId, quantity };

    const response = userInfo
      ? await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, data, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
      : await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
          ...data,
          guestId: getGuestId(),
        });
        
    return response.data.cart || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Remove item from cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ productId }, { getState, rejectWithValue }) => {
  try {
    const { auth: { userInfo } } = getState();

    const config = userInfo
      ? {
          headers: { Authorization: `Bearer ${userInfo.token}` },
          data: { productId },
        }
      : {
          data: { productId, guestId: getGuestId() },
        };

    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, config);
    return response.data.cart || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Update cart item quantity
export const updateCartItemQuantity = createAsyncThunk("cart/updateQuantity", async ({ productId, quantity }, { getState, rejectWithValue }) => {
  try {
    const { auth: { userInfo } } = getState();
    const body = userInfo
      ? { productId, quantity }
      : { productId, quantity, guestId: getGuestId() };

    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, body, userInfo ? {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    } : {});

    return response.data.cart || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Merge guest cart
export const mergeCart = createAsyncThunk("cart/mergeCart", async (_, { getState, rejectWithValue }) => {
  try {
    const { auth: { userInfo } } = getState();
    const guestId = localStorage.getItem("guestId");
    if (!guestId || !userInfo) throw new Error("No guest cart to merge");

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, { guestId }, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    localStorage.removeItem("guestId");
    return response.data.cart || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ================== Slice ===================

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: { products: [], totalPrice: 0 },
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [], totalPrice: 0 };
      localStorage.removeItem("cart");
    },
  },
 // In your cartSlice.js, modify the extraReducers section:

extraReducers: (builder) => {
  builder
    

      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  //     .addCase(addToCart.fulfilled, (state, action) => {
  //       console.log("Add to cart payload:", action.payload); // Add this line
  // state.loading = false;
  // state.cart = action.payload.cart || action.payload;
  //  console.log("Updated state:", state.cart);
  // saveCartToStorage(state.cart);
  //     })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add to cart";
      })

      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.error = action.payload || "Failed to update quantity";
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to remove item";
      })

      .addCase(mergeCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to merge cart";
      })

      // All pending cases
    .addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    )
    
    // All fulfilled cases
    .addMatcher(
      (action) => action.type.startsWith('cart/') && action.type.endsWith('/fulfilled'),
      (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart || action.payload;
        saveCartToStorage(state.cart);
      }
    )
    
    // All rejected cases
    .addMatcher(
      (action) => action.type.startsWith('cart/') && action.type.endsWith('/rejected'),
      (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      }
    )
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;