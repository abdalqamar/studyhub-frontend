import { useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/features/categories/services/categoryServices";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";
import { categoryKeys } from "@/lib/queryKeys";
import { AxiosError } from "axios";
import { Category } from "@/types";

interface ApiErrorData {
  message?: string;
}

interface UpdateCategoryPayload {
  id: string;
  formData: FormData | Partial<Category>;
}

export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: categoryService.getAllCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useGlobalMutation<
    Category,
    AxiosError<ApiErrorData>,
    Partial<Category>
  >({
    mutationFn: categoryService.createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      successToast("Category created");
    },

    onError: (error) => {
      errorToast(error?.response?.data?.message || "Failed to create category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useGlobalMutation<string, AxiosError<ApiErrorData>, string>({
    mutationFn: categoryService.deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      successToast("Category deleted");
    },

    onError: (error) => {
      errorToast(error?.response?.data?.message || "Failed to delete category");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useGlobalMutation<
    Category,
    AxiosError<ApiErrorData>,
    UpdateCategoryPayload
  >({
    mutationFn: ({ id, formData }) =>
      categoryService.updateCategory(id, formData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
    onError: (error) => {
      errorToast(error?.response?.data?.message || "Failed to update category");
    },
  });
};
