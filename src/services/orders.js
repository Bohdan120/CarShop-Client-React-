import axios from "axios";
import { tokensService } from "./tokens";

const ordersApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "orders",
  withCredentials: true,
});

ordersApi.interceptors.request.use(
  (config) => {
    const token = tokensService.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

ordersApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await tokensService.refreshTokens();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return ordersApi.request(originalRequest);
      } catch (refreshError) {
        tokensService.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export const ordersService = {
  create: () => ordersApi.post(""),
  getAllByUser: () => ordersApi.get(""),
};
