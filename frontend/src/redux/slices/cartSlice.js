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
