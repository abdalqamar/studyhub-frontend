import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import { successToast } from "@/shared/utils/toastUtils";
import { courseKeys, profileKeys } from "@/lib/queryKeys";

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId) => courseService.enrollCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.enrolledCourses() });
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
      successToast("Successfully enrolled in course!");
    },
  });
};
