import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../services/categoryServices";
import { errorToast, successToast } from "../utils/toastUtils";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAllCategories,
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || "Failed to fetch categories"
      );
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      successToast("Category created");
    },

    onError: (error) => {
      errorToast(error?.response?.data?.message || "Failed to create category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      successToast("Category deleted");
    },

    onError: (error) => {
      errorToast(error?.response?.data?.message || "Failed to delete category");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) =>
      categoryService.updateCategory(id, formData),

    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};
