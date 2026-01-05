import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/categoryServices";
import toast from "react-hot-toast";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAllCategories,
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to fetch categories"
      );
    },
  });
};
