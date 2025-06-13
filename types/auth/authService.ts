/**
 * @file authService.ts
 * @description 封装了与用户认证相关的服务方法，包括注册、登录、注销等。
 * @module authService
 */
import { ENDPOINTS } from "@/types/auth/api";
import client from "./client";

export const AuthService = {
  register: async (userData: {
    username: string;
    password: string;
    email: string;
    phone: string;
  }) => {
    return client.post(ENDPOINTS.AUTH.REGISTER, userData);
  },

  login: async (credentials: { identifier: string; password: string }) => {
    const response = await client.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return {
      accessToken: response.data.token,
      refreshToken: response.data.token, // 临时复用，后续可扩展
      user: response.data.user,
    };
  },

  logout: async () => {
    return client.post(ENDPOINTS.AUTH.LOGOUT);
  },
};
