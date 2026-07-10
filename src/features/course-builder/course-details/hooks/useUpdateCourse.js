import { useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/features/courses/services/courseService";
import { courseKeys } from "@/lib/queryKeys";
import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";

export const useUpdateCourse = (courseId) => {
  const queryClient = useQueryClient();

  return useGlobalMutation({
    mutationFn: (courseData) => courseService.updateCourse(courseId, courseData),
    onSuccess: (updatedCourse) => {
      queryClient.setQueryData(courseKeys.detail(courseId), updatedCourse);
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
    },
  });
};
