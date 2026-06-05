import axios from "axios";

const VITE_BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

const api = axios.create({
  baseURL: VITE_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Attach token automatically */


api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("userInfo");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = user?.token || localStorage.getItem("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* Handle expired tokens */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
