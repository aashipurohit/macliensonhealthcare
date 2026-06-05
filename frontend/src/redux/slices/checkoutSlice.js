// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk to create a checkout session
// export const createCheckout = createAsyncThunk(
//     "checkout/createCheckout",
//     async (checkoutdata, { rejectWithValue }) => {
//     try {
//     const response = await axios.post(
//     `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
//     checkoutdata,
//     {
//     headers: {
     
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      
//         },

//      }

//     );
//        return response.data
//     }  catch (error) {
//         return rejectWithValue(error.response.data);
//     }

// }
   
// );

// const checkoutSlice = createSlice({
//     name: "checkout",
//     initialState: {
//     checkout: null,
//     loading: false,
//     error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//     builder
//     .addCase(createCheckout.pending, (state) => {
//     state.loading = true;
//     state.error = null;
//     })
//     .addCase(createCheckout.fulfilled, (state, action) => {
//     state.loading = false;
//     state.checkout = action.payload;
//     })
//     .addCase(createCheckout.rejected, (state, action) => {
//     state.loading = false;
//     state.error = action.payload.message;
//     });
//     },

// });

// export default checkoutSlice.reducer;


// redux/slices/checkoutSlice.js - Updated
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk to create Razorpay order
// export const createRazorpayOrder = createAsyncThunk(
//   "checkout/createRazorpayOrder",
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/orders/create-razorpay-order`,
//         orderData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || { message: "Something went wrong" }
//       );
//     }
//   }
// );

// // Async thunk to verify payment
// export const verifyRazorpayPayment = createAsyncThunk(
//   "checkout/verifyPayment",
//   async (paymentData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/orders/verify-payment`,
//         paymentData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || { message: "Payment verification failed" }
//       );
//     }
//   }
// );

// const checkoutSlice = createSlice({
//   name: "checkout",
//   initialState: {
//     razorpayOrder: null,
//     paymentStatus: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearPaymentState: (state) => {
//       state.razorpayOrder = null;
//       state.paymentStatus = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create Razorpay Order
//       .addCase(createRazorpayOrder.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createRazorpayOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.razorpayOrder = action.payload;
//       })
//       .addCase(createRazorpayOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message;
//       })
      
//       // Verify Payment
//       .addCase(verifyRazorpayPayment.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyRazorpayPayment.fulfilled, (state, action) => {
//         state.loading = false;
//         state.paymentStatus = "success";
//       })
//       .addCase(verifyRazorpayPayment.rejected, (state, action) => {
//         state.loading = false;
//         state.paymentStatus = "failed";
//         state.error = action.payload?.message;
//       });
//   },
// });

// export const { clearPaymentState } = checkoutSlice.actions;
// export default checkoutSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/apiClient";

// Async thunk to create Razorpay order
export const createRazorpayOrder = createAsyncThunk(
  "checkout/createRazorpayOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/orders/create-razorpay-order", orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// Async thunk to verify payment
export const verifyRazorpayPayment = createAsyncThunk(
  "checkout/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/orders/verify", paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Payment verification failed" }
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    razorpayOrder: null,
    paymentStatus: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.razorpayOrder = null;
      state.paymentStatus = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Razorpay Order
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
      
      // Verify Payment
      .addCase(verifyRazorpayPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRazorpayPayment.fulfilled, (state) => {
        state.loading = false;
        state.paymentStatus = "success";
      })
      .addCase(verifyRazorpayPayment.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = "failed";
        state.error = action.payload?.message;
      });
  },
});

export const { clearPaymentState } = checkoutSlice.actions;
export default checkoutSlice.reducer;
