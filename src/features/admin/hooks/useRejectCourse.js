import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/features/courses/services/courseService";
import { successToast } from "@/shared/utils/toastUtils";

export const useRejectCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, feedback }) => courseService.rejectCourse(id, feedback),

    onSuccess: () => {
      successToast("Course rejected!");
      queryClient.invalidateQueries(["adminCourses"]);
    },
  });
};
