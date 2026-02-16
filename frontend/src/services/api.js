import axios from "axios";
import { baseApiUrl } from "./apiSlice";

const api = axios.create({
  baseURL: baseApiUrl,
  withCredentials: true, // 🔥 IMPORTANT for cookies
  headers: {
    "Content-Type": "application/json",
  },
  
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
