import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

export const authService = {
  // Login
  login: async (credentials) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
    return data;
  },

  // Register
  register: async (userData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.REGISTER, userData);

    return data;
  },
  // Send Otp
  sendOtp: async (email) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.SEND_OTP, email);

    return data;
  },

  // Logout
  logout: async () => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.LOGOUT);
    return data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.FORGOT_PASSWORD, {
      email,
    });
    return data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.RESET_PASSWORD, {
      token,
      password: newPassword,
    });
    return data;
  },

  // Get current user
  getCurrentUser: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ME);
    return data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.REFRESH_TOKEN, {
      refreshToken,
    });
    return data;
  },
};
