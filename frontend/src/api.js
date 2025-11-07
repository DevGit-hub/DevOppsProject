// api.js
import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:4000/api", // backend base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const info = {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    };
    console.error("API Error:", info);

    // Auto logout if 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


API.testConnection = async () => {
  try {
    const response = await API.get("/health");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("API connection test failed:", error.message);
    return { success: false, error: error.message };
  }
};

export default API;
