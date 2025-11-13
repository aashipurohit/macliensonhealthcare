import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNewArrivals = createAsyncThunk(
  'products/fetchNewArrivals',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
    return response.data;
  }
);

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
    newArrivals: [],
    selectedProduct: null, // Store the details of the single Product
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
    category: [],
    subcategory: [],
    prescriptionRequired: null,
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    search: "",
    collections: "",

    },
    allSubcategories: [],
  allBrands: []
    },

    reducers: {
    setFilters: (state, action) => {
    state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
    state.filters = {
    category: [],
    subcategory: [],
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    search: "",
    collections: "",
    prescriptionRequired: null,
    
}
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.similarProducts = [];
},
    },

extraReducers: (builder) => {
    builder

    .addCase(fetchNewArrivals.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchNewArrivals.fulfilled, (state, action) => {
      state.loading = false;
      state.newArrivals = action.payload; // Add this to your initialState
    })
    .addCase(fetchNewArrivals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })


    // handle fetching products with filter
    .addCase(fetchProductsByFilters.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    // In productsSlice.js - Update the fetchProductsByFilters fulfilled case
.addCase(fetchProductsByFilters.fulfilled, (state, action) => {
  state.loading = false;
  
  // Handle both array and object response formats
  if (Array.isArray(action.payload)) {
    state.products = action.payload;
  } else if (action.payload.products && Array.isArray(action.payload.products)) {
    // Handle { success: true, products: [], metadata: {} } format
    state.products = action.payload.products;
    
    // Also update metadata if available
    if (action.payload.metadata) {
      state.allSubcategories = action.payload.metadata.subcategories || [];
      // Store other metadata as needed
    }
  } else {
    state.products = [];
  }
  
  state.error = null;
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
        state.products[index] = updateProduct;
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
    state.similarProducts = action.payload; 
    })
    .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });

    },

    });

    export const { setFilters, clearFilters, clearSelectedProduct } = productsSlice.actions;
    export default productsSlice.reducer;