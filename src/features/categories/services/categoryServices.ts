import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { Category } from "@/types";

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.CATEGORIES);
    return data.categories;
  },

  updateCategory: async (
    id: string,
    formData: FormData | Partial<Category>
  ): Promise<Category> => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.CATEGORY_UPDATE(id),
      formData
    );
    return data.updatedCategory;
  },

  createCategory: async (
    formData: FormData | Partial<Category>
  ): Promise<Category> => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CATEGORY_CREATE,
      formData
    );
    return data.updatedCategory;
  },

  deleteCategory: async (categoryId: string): Promise<string> => {
    const { data } = await axiosInstance.delete(
      API_ENDPOINTS.CATEGORY_DELETE(categoryId)
    );
    return data.message;
  },
};
