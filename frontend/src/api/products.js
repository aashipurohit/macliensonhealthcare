import api from "./apiClient";

// Enhanced fetchNewArrivals with retry logic
export const fetchNewArrivals = async (retries = 3) => {
  try {
    const response = await api.get("/api/products/new-arrivals");
    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchNewArrivals(retries - 1);
    }
    throw error;
  }
};