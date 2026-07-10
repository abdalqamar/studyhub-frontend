import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/endpoints";

export const authService = {
  // Login
  login: async (credentials) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH_LOGIN,
      credentials
    );
    return data;
  },

  // Register
  register: async (userData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH_REGISTER,
      userData
    );

    return data;
  },
  // Send Otp
  sendOtp: async (email) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH_SEND_OTP,
      email
    );

    return data;
  },

  // Logout
  logout: async () => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH_LOGOUT);
    return data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH_FORGOT_PASSWORD,
      {
        email,
      }
    );
    return data;
  },

  // Reset password
  resetPassword: async (token, newPassword, confirmNewPassword) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH_RESET_PASSWORD(token),
      { newPassword, confirmNewPassword }
    );
    return data;
  },

  // Get current user
  getCurrentUser: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.AUTH_ME);
    return data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH_REFRESH_TOKEN,
      {
        refreshToken,
      }
    );
    return data;
  },
};
