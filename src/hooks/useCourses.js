import { useQuery } from "@tanstack/react-query";
import { errorToast } from "../utils/toastUtils";
import { courseService } from "../services/courseService";

// Get single course By id with details for authenticated users
export const useCourse = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id,
    onError: (error) => {
      errorToast(error.response?.data?.message || "Failed to fetch course");
    },
  });
};
