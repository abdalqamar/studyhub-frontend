import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

export const adminService = {
  fetchAllUsers: async ({ role, search, status, page, limit }) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_ALL_USERS, {
      params: { role, search, status, page, limit },
    });
    return data;
  },

  updateUserStatus: async (userId, status) => {
    const { data } = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN_UPDATE_USER_STATUS(userId),
      { status }
    );
    return data;
  },

  deleteUser: async (userId) => {
    const { data } = await axiosInstance.delete(
      API_ENDPOINTS.ADMIN_DELETE_USER(userId)
    );
    return data;
  },
};
