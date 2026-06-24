import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { instructorKeys } from "../../lib/queryKeys";

export const useUpdateCourse = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseData) =>
      courseService.updateCourse(courseId, courseData),

    onSuccess: (updatedCourse) => {
      queryClient.setQueryData(["course", courseId], updatedCourse);
      queryClient.invalidateQueries({ queryKey: instructorKeys.courses });
    },
  });
};
