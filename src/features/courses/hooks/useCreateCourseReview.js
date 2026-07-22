import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";
import { useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import { successToast } from "@/shared/utils/toastUtils";
import { courseKeys, profileKeys } from "@/lib/queryKeys";

export const useCreateCourseReview = (courseId) => {
  const queryClient = useQueryClient();
  return useGlobalMutation({
    mutationFn: ({ rating, review }) =>
      courseService.createReview(courseId, { rating, review }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.enrolledCourses() });
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
      successToast("Review submitted successfully");
    },
  });
};
