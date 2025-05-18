import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Fetch products with filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collections,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    subcategory,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();

    if (collections) query.append("collections", collections);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);
    if (subcategory) query.append("subcategory", subcategory);
    if (category) query.append("category", category); 

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

// Fetch product by ID
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);

//  Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      }
    );
    return response.data;
  }
);

//  Fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );
    return response.data;
  }
);


const productsSlice = createSlice({
    name: "products",
    initialState: {
    products: [],
    selectedProduct: null, // Store the details of the single Product
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
    category: "",
    size: "",
    color: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    search: "",
    collection: "",

    },
    },

    reducers: {
    setFilters: (state, action) => {
    state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
    state.filters = {
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    search: "",
    collection: "",
    
}
    },
},

extraReducers: (builder) => {
    builder
    // handle fetching products with filter
    .addCase(fetchProductsByFilters.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
    state.loading = false;
    state.products = Array.isArray(action.payload) ? action.payload : [];
    })
    .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error - action.error.message;
    })

    // Handle fetching single producr details

   .addCase(fetchProductDetails.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    .addCase(fetchProductDetails.fulfilled, (state, action) => {
    state.loading = false;
    state.selectedProduct = action.payload;
    })
    .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
     
     // Handle updating product

     .addCase(updateProduct.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
    state.loading = false;
    const updateProduct = action.payload;
    const index = state.products.findIndex(
        (product) => product._id === updateProduct._id );
       if (index !== -1) {
        state.products[index] = updatedProduct;
       }

    })
    .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })

    .addCase(fetchSimilarProducts.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
    state.loading = false;
    state.products = action.payload;
    })
    .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error - action.error.message;
    });

    },

    });

    export const { setFilters, clearFilters } = productsSlice.actions;
    export default productsSlice.reducer;