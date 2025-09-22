import { refreshAccessToken } from "@/service";
import axios from "axios";

export const axiosInstanceWithAuth = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const addSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const processSubscribers = (error = null) => {
  refreshSubscribers.forEach((callback) => callback(error));
  refreshSubscribers = [];
};

const clearAuthState = () => {
  window.dispatchEvent(new CustomEvent("auth-refresh-failed"));
};

axiosInstanceWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const errorData = response?.data;
    const isTokenError =
      (errorData?.statusCode === 403 &&
        errorData?.message === "Access Token Required") ||
      (errorData?.statusCode === 401 &&
        errorData?.message === "Invalid Access Token");

    if (isTokenError && !config._retry) {
      config._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addSubscriber((error) => {
            if (error) {
              reject(error);
            } else {
              resolve(axiosInstanceWithAuth(config));
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResult = await refreshAccessToken();

        if (refreshResult?.success) {
          processSubscribers();
          return axiosInstanceWithAuth(config);
        } else {
          clearAuthState();
          const refreshError = new Error(
            "Session expired. Please login again."
          );
          processSubscribers(refreshError);
          return Promise.reject(refreshError);
        }
      } catch (refreshError) {
        clearAuthState();
        processSubscribers(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
