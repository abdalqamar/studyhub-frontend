import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

export const authService = {
  // Login
  login: async (credentials) => {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, userData);
    console.log(response);
    return response.data;
  },
  // Send Otp
  sendOtp: async (email) => {
    const response = await axiosInstance.post(API_ENDPOINTS.SEND_OTP, email);
    console.log(response);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGOUT);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await axiosInstance.post(API_ENDPOINTS.FORGOT_PASSWORD, {
      email,
    });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await axiosInstance.post(API_ENDPOINTS.RESET_PASSWORD, {
      token,
      password: newPassword,
    });
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.ME);
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await axiosInstance.post(API_ENDPOINTS.REFRESH_TOKEN, {
      refreshToken,
    });
    return response.data;
  },
};
