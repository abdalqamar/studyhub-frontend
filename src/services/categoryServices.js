import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.CATEGORIES);
    return data.categories;
  },

  // Update a category
  updateCategory: async (id, formData) => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.CATEGORY_UPDATE(id),
      formData
    );
    return data.updatedCategory;
  },

  // Create a new category
  createCategory: async (formData) => {
    console.log(formData);
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CATEGORY_CREATE,
      formData
    );

    return data.updatedCategory;
  },

  // Delete a category
  deleteCategory: async (categoryId) => {
    const { data } = await axiosInstance.delete(
      API_ENDPOINTS.CATEGORY_DELETE(categoryId)
    );
    return data.message;
  },
};
