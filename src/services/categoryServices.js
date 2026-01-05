import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES);
    return response.data.categories;
  },

  // Additional category-related services can be added here
};
