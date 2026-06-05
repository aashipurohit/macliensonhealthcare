import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthToken = () => {
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  return userInfo?.token || localStorage.getItem("userToken");
};

// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAdminOrderDetails = createAsyncThunk(
  "adminOrders/fetchAdminOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update order delivery status
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete an order 
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    selectedOrder: null,
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        // Calculate total sales
        const totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);
        state.totalSales = totalSales;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })

      .addCase(fetchAdminOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedOrder = null;
      })
      .addCase(fetchAdminOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchAdminOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch order";
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
        if (state.selectedOrder?._id === updatedOrder._id) {
          state.selectedOrder = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update order status";
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload  // Fixed typo: was __id
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete order";
      });
  },
});

export default adminOrderSlice.reducer;
