import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";

export const useCreateSection = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionName }) =>
      courseService.createSection(courseId, { sectionName }),
    onMutate: async ({ sectionName }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);

      // Optimistic update
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: [
          ...(old?.courseContent || []),
          {
            _id: "temp-section-id", // temporary id
            sectionName,
            lesson: [],
          },
        ],
      }));

      return { prevCourse };
    },

    onError: (err, vars, ctx) => {
      queryClient.setQueryData(["course", courseId], ctx.prevCourse);
    },

    onSuccess: (newSection) => {
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === "temp-section-id" ? newSection : sec
        ),
      }));
    },

    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};
