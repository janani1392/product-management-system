import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8082/api/products/all',
});

axiosInstance.interceptors.request.use(
  (config) => {
    // No need to manually handle HttpOnly cookies here
    // The browser will automatically send the 'auth_token' HttpOnly cookie with the request
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
