import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/apiClient";

const createGuestId = () => `guest_${Date.now()}`;

const getStoredUser = () => {
  const raw = localStorage.getItem("userInfo");
  return raw ? JSON.parse(raw) : null;
};

const getStoredGuestId = () => localStorage.getItem("guestId");

const ensureGuestId = () => {
  let guestId = getStoredGuestId();

  if (!guestId) {
    guestId = createGuestId();
    localStorage.setItem("guestId", guestId);
  }

  return guestId;
};

const userFromStorage = getStoredUser();

const initialState = {
  user: userFromStorage,
  guestId: getStoredGuestId() || (userFromStorage ? null : ensureGuestId()),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/login", userData);

      const fullUserInfo = {
        ...response.data.user,
        token: response.data.token,
      };

      localStorage.setItem("userInfo", JSON.stringify(fullUserInfo));
      localStorage.setItem("userToken", response.data.token);

      return fullUserInfo;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/register", userData);

      const fullUserInfo = {
        ...response.data.user,
        token: response.data.token,
      };

      localStorage.setItem("userInfo", JSON.stringify(fullUserInfo));
      localStorage.setItem("userToken", response.data.token);

      return fullUserInfo;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;

      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");

      const newGuestId = createGuestId();
      localStorage.setItem("guestId", newGuestId);
      state.guestId = newGuestId;
    },
    generateNewGuestId: (state) => {
      const newGuestId = createGuestId();
      localStorage.setItem("guestId", newGuestId);
      state.guestId = newGuestId;
    },
    syncGuestIdFromStorage: (state) => {
      state.guestId = localStorage.getItem("guestId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Registration failed";
      });
  },
});

export const { logout, generateNewGuestId, syncGuestIdFromStorage } =
  authSlice.actions;

export default authSlice.reducer;