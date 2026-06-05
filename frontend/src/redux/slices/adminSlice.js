// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch all users (admin only)
// export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
//     const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
//         {
//             headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
//         }
//     );
//     return response.data; // Added missing return
// });

// // Add the create_user action
// export const addUser = createAsyncThunk(
//     "admin/addUser",
//     async (userData, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
//                 userData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                     },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // Update user info
// export const updateUser = createAsyncThunk(
//     "admin/updateUser",
//     async ({ id, name, email, role }, { rejectWithValue }) => {
//         try {
//             const response = await axios.put(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
//                 { name, email, role },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                     },
//                 }
//             );
//             return response.data.user; // Added missing return
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // Delete a user
// export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, { rejectWithValue }) => {
//     try {
//         await axios.delete(
//             `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                 },
//             }
//         );
//         return id;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// // Add these new actions for AdminHomePage
// export const fetchAdminProducts = createAsyncThunk(
//     "admin/fetchProducts",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                     },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// export const fetchAllOrders = createAsyncThunk(
//     "admin/fetchOrders",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                     },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // Update order status
// export const updateOrderStatus = createAsyncThunk(
//     "admin/updateOrderStatus",
//     async ({ orderId, status }, { rejectWithValue }) => {
//         try {
//             const response = await axios.put(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}`,
//                 { status },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                     },
//                 }
//             );
//             return response.data.order; 
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to update status");
//         }
//     }
// );


// // Delete a product (admin only)
// export const deleteProduct = createAsyncThunk(
//   "admin/deleteProduct",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       return id; // return deleted product ID
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Delete failed");
//     }
//   }
// );

// const adminSlice = createSlice({
//     name: "admin",
//     initialState: {
//      sidebarOpen: true, 
//         users: [],
//         products: [],
//         orders: [],
//         totalOrders: 0,
//         totalSales: 0,
//         loading: false,
//         error: null,
//     },
//     reducers: {
//     toggleSidebar: (state) => {
//       state.sidebarOpen = !state.sidebarOpen;
//     },
//     setSidebar: (state, action) => {
//       state.sidebarOpen = action.payload;
//     }
//   },

//     extraReducers: (builder) => {
//         builder
//             // Users
//             .addCase(fetchUsers.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchUsers.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.users = action.payload;
//             })
//             .addCase(fetchUsers.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(updateUser.fulfilled, (state, action) => {
//                 const updatedUser = action.payload;
//                 const userIndex = state.users.findIndex(
//                     (user) => user._id === updatedUser._id // Fixed typo: user_id to user._id
//                 );
//                 if (userIndex !== -1) {
//                     state.users[userIndex] = updatedUser;
//                 }
//             })
//             .addCase(deleteUser.fulfilled, (state, action) => {
//                 state.users = state.users.filter((user) => user._id !== action.payload); // Fixed typo: user_id to user._id
//             })
//             .addCase(addUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(addUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.users.push(action.payload.user);
//             })
//             .addCase(addUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload.message;
//             })
            
//             // Products
//             .addCase(fetchAdminProducts.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchAdminProducts.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.products = action.payload.products;
//             })
//             .addCase(fetchAdminProducts.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload.message;
//             })
            
//             // Orders
//             .addCase(fetchAllOrders.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchAllOrders.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.orders = action.payload.orders || [];
//                 state.totalOrders = action.payload.totalOrders || 0;
//                 state.totalSales = action.payload.totalSales || 0;
//             })
//             .addCase(fetchAllOrders.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload.message;
//             })
//             // Update Order Status
// .addCase(updateOrderStatus.fulfilled, (state, action) => {
//     const updatedOrder = action.payload;
//     const index = state.orders.findIndex(o => o._id === updatedOrder._id);
//     if (index !== -1) {
//         state.orders[index] = updatedOrder;
//     }
// })
// .addCase(updateOrderStatus.rejected, (state, action) => {
//     state.error = action.payload;
// })

//             // Delete Product
// .addCase(deleteProduct.pending, (state) => {
//   state.loading = true;
// })
// .addCase(deleteProduct.fulfilled, (state, action) => {
//   state.loading = false;
//   state.products = state.products.filter((p) => p._id !== action.payload);
// })
// .addCase(deleteProduct.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// });

//     },
// });

// export const { toggleSidebar, setSidebar } = adminSlice.actions;
// export default adminSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/apiClient";

// ===============================
// 🔹 Async Thunks
// ===============================

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/admin/users");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Add a new user
export const addUser = createAsyncThunk("admin/addUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/admin/users", userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Update user info
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/admin/users/${id}`, { name, email, role });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/api/admin/users/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Fetch admin products
export const fetchAdminProducts = createAsyncThunk("admin/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/admin/products");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Fetch all orders
export const fetchAllOrders = createAsyncThunk("admin/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/admin/orders");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/admin/orders/${orderId}`, { status });
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk("admin/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/api/admin/products/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ===============================
// 🔹 Slice
// ===============================
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    sidebarOpen: true,
    users: [],
    products: [],
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebar: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Users
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const idx = state.users.findIndex(u => u._id === updatedUser._id);
        if (idx !== -1) state.users[idx] = updatedUser;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u._id !== action.payload);
      })

      .addCase(addUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addUser.fulfilled, (state, action) => { state.loading = false; state.users.push(action.payload.user); })
      .addCase(addUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Products
      .addCase(fetchAdminProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload.products; })
      .addCase(fetchAdminProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Orders
      .addCase(fetchAllOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders || [];
        state.totalOrders = action.payload.totalOrders || 0;
        state.totalSales = action.payload.totalSales || 0;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(o => o._id === updatedOrder._id);
        if (index !== -1) state.orders[index] = updatedOrder;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => { state.error = action.payload; })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteProduct.fulfilled, (state, action) => { state.loading = false; state.products = state.products.filter(p => p._id !== action.payload); })
      .addCase(deleteProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { toggleSidebar, setSidebar } = adminSlice.actions;
export default adminSlice.reducer;