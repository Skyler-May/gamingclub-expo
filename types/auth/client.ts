/**
 * 封装axios请求模块
 */
import { ENV } from "@/types/auth/api";
import {
  deleteSecureItem,
  getSecureItem,
  setSecureItem,
} from "@/utils/authStore";
import axios from "axios";

const instance = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: ENV.TIMEOUT,
});

// 请求拦截器（添加Token）
instance.interceptors.request.use(async (config) => {
  const token = await getSecureItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器（处理Token刷新）
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getSecureItem("refreshToken");
        const { data } = await axios.post(`${ENV.BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        await Promise.all([
          setSecureItem("accessToken", data.accessToken),
          setSecureItem("refreshToken", data.refreshToken),
        ]);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        await deleteSecureItem("accessToken");
        await deleteSecureItem("refreshToken");
        // 这里可以触发全局登出逻辑
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
