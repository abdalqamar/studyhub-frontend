import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";

export const useDeleteSection = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId }) =>
      courseService.deleteSection(courseId, sectionId),

    onMutate: async ({ sectionId }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);

      // If no previous course in cache, skip optimistic update
      if (!prevCourse) {
        return { prevCourse: null };
      }

      // Optimistic delete
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.filter((sec) => sec._id !== sectionId),
      }));

      return { prevCourse };
    },

    onError: (err, vars, ctx) => {
      // Rollback full course if available
      if (ctx?.prevCourse) {
        queryClient.setQueryData(["course", courseId], ctx.prevCourse);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};
