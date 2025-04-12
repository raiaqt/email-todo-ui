import axios from "axios";
import { refreshAccessToken } from "./auth";

// Create an axios instance
const apiClient = axios.create();

// Add a response interceptor to catch authentication errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const tokens = await refreshAccessToken(refreshToken);
        // Update the failed request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${tokens.access_token}`;
        // Retry the original request
        return axios.request(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;