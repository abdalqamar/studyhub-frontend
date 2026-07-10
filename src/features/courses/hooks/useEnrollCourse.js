import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import { successToast } from "@/shared/utils/toastUtils";

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId) => courseService.enrollCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      successToast("Successfully enrolled in course!");
    },
  });
};
