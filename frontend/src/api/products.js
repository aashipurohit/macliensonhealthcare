// src/api/products.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Enhanced fetchNewArrivals with retry logic
export const fetchNewArrivals = async (retries = 3) => {
  try {
    const response = await api.get('/api/products/new-arrivals');
    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchNewArrivals(retries - 1);
    }
    throw error;
  }
};