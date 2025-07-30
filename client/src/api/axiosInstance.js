import { refreshAccessToken } from "@/service";
import axios from "axios";

export const axiosInstanceWithAuth = axios.create({
  baseURL: "http://localhost:3030/api/v1",
  withCredentials: true,
});

axiosInstanceWithAuth.interceptors.response.use(
  (data) => {
    return data;
  },
  async (error) => {
    const mainData = error.response.data;
    if (
      (mainData.statusCode === 403 &&
        mainData.message === "Access Token Required") ||
      (mainData.statusCode === 401 &&
        mainData.message === "Invalid Access Token")
    ) {
      const refreshData = await refreshAccessToken();
      return Promise.reject(refreshData);
    }
    return Promise.reject(error);
  }
);
