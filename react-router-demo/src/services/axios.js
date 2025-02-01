import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8082/api", // Base URL for your API reactServiceApp
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include HttpOnly cookies automatically
});

// Ensure fallback for second backend URL
axiosInstance.interceptors.request.use((config) => {
  if (config.url.startsWith("/auth")) {
    config.baseURL = "http://localhost:8080/api"; // Redirect auth-related requests to 8080
  }
  return config;
});

export default axiosInstance;