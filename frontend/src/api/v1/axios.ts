import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500/api/v1",
  withCredentials: true, // REQUIRED for cookies
});

/* ---------------- RESPONSE INTERCEPTOR ---------------- */

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token cookie is sent automatically
        await api.post("/auth/refresh");

        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        // Refresh failed → logout
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
