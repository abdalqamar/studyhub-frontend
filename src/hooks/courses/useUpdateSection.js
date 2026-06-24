import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";

export const useUpdateSection = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, sectionName }) =>
      courseService.updateSection(courseId, sectionId, { sectionName }),

    onMutate: async ({ sectionId, sectionName }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);

      if (!prevCourse) return { prevCourse: null };

      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId ? { ...sec, sectionName } : sec
        ),
      }));

      return { prevCourse };
    },

    onError: (err, vars, ctx) => {
      if (ctx?.prevCourse) {
        queryClient.setQueryData(["course", courseId], ctx.prevCourse);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};
