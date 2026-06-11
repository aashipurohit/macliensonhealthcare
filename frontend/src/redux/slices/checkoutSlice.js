import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/apiClient";

// ── Step 1: Create Razorpay order (get server-calculated amount) ──────────────
export const createRazorpayOrder = createAsyncThunk(
  "checkout/createRazorpayOrder",
  async (orderItems, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/orders/create-razorpay-order", { orderItems });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to create order" });
    }
  }
);

// ── Step 2: Verify payment + create order atomically (single endpoint) ────────
// ✅ FIX (VULN-001, VULN-002, VULN-003): replaces separate /verify + /create calls
// No totalAmount or paymentMethod sent — server handles both
export const verifyAndCreateOrder = createAsyncThunk(
  "checkout/verifyAndCreateOrder",
  async (
    { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderItems, shipping, idempotencyKey },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/api/orders/verify-and-create", {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        orderItems,    // [{productId, quantity}] — no price
        shipping,
        idempotencyKey,
        // ✅ totalAmount intentionally omitted
        // ✅ paymentMethod intentionally omitted — server always sets "razorpay"
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Payment verification failed" });
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    razorpayOrder: null,
    createdOrder: null,
    paymentStatus: null,   // null | "success" | "failed"
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.razorpayOrder = null;
      state.createdOrder = null;
      state.paymentStatus = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createRazorpayOrder
      .addCase(createRazorpayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.razorpayOrder = action.payload;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // verifyAndCreateOrder
      .addCase(verifyAndCreateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAndCreateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = "success";
        state.createdOrder = action.payload.order;
      })
      .addCase(verifyAndCreateOrder.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = "failed";
        state.error = action.payload?.message;
      });
  },
});

export const { clearPaymentState } = checkoutSlice.actions;
export default checkoutSlice.reducer;