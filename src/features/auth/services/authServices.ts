import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { User } from "@/types";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  otp: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  message?: string;
}

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH_LOGIN,
      credentials
    );
    return data;
  },

  // Register
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH_REGISTER,
      userData
    );

    return data;
  },

  // Send OTP
  sendOtp: async ({
    email,
  }: {
    email: string;
  }): Promise<{ message: string }> => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH_SEND_OTP, {
      email,
    });
    return data;
  },

  // Logout
  logout: async (): Promise<void> => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH_LOGOUT);
    return data;
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH_FORGOT_PASSWORD,
      {
        email,
      }
    );
    return data;
  },

  // Reset password
  resetPassword: async (
    token: string,
    newPassword: string,
    confirmNewPassword: string
  ): Promise<{ message: string }> => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH_RESET_PASSWORD(token),
      { newPassword, confirmNewPassword }
    );
    return data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.AUTH_ME);
    return data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH_REFRESH_TOKEN,
      {
        refreshToken,
      }
    );
    return data;
  },
};
