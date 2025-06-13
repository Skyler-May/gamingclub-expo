/**
 * 接口配置
 */
export const ENV = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || "http://192.168.50.242:3000",
  TIMEOUT: 10000,
};

// 接口端点
export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/users/auth/register",
    LOGIN: "/api/users/auth/login",
    LOGOUT: "/logout",
    REFRESH: "/refresh",
  },
  USER: "/users",
  GAMES: "/games",
};

// 请求头配置
export const HEADERS = {
  JSON: { "Content-Type": "application/json" },
  FORM: { "Content-Type": "multipart/form-data" },
};
