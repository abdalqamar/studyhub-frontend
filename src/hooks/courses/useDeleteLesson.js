import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { successToast } from "../../utils/toastUtils";

export const useDeleteLesson = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    // API call
    mutationFn: ({ sectionId, lessonId }) =>
      courseService.deleteLesson(courseId, sectionId, lessonId),

    // Optimistic update
    onMutate: async ({ sectionId, lessonId }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);
      if (!prevCourse) return { prevCourse: null };

      // Remove lesson from UI
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                lesson: sec.lesson.filter((ls) => ls._id !== lessonId),
              }
            : sec
        ),
      }));

      return { prevCourse };
    },

    // Rollback on error
    onError: (err, vars, ctx) => {
      if (ctx?.prevCourse) {
        queryClient.setQueryData(["course", courseId], ctx.prevCourse);
      }
    },

    // Success
    onSuccess: () => {
      successToast("Lesson deleted");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};
