import { useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/features/categories/services/categoryServices";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";

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

  return useGlobalMutation({
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

  return useGlobalMutation({
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

  return useGlobalMutation({
    mutationFn: ({ id, formData }) =>
      categoryService.updateCategory(id, formData),

    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};
