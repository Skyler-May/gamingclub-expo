export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  balance: number;
  avatar?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
