import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { successToast } from "../../utils/toastUtils";

export const useCreateCourseReview = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ rating, review }) =>
      courseService.createCourseReview(courseId, { rating, review }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      successToast("Review submitted successfully");
    },
  });
};
