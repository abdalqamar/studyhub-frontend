import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";
import { useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import { successToast } from "@/shared/utils/toastUtils";

export const useCreateCourseReview = (courseId) => {
  const queryClient = useQueryClient();
  return useGlobalMutation({
    mutationFn: ({ rating, review }) =>
      courseService.createReview(courseId, { rating, review }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      successToast("Review submitted successfully");
    },
  });
};
