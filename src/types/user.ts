export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export type UserRole = 'guest' | 'user' | 'premium';
