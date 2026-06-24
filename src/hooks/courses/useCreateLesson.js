import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { successToast } from "../../utils/toastUtils";

export const useCreateLesson = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, formData }) =>
      courseService.createLesson(courseId, sectionId, formData),

    // Optimistic Update
    onMutate: async ({ sectionId, formData }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);
      if (!prevCourse) return { prevCourse: null };

      const tempLesson = {
        _id: "temp-lesson-id",
        title: formData.get("title"),
        description: formData.get("description"),
        videoUrl: null,
      };

      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                lesson: [...(sec.lesson || []), tempLesson],
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

    onSuccess: (newLesson, { sectionId }) => {
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                lesson: sec.lesson.map((ls) =>
                  ls._id === "temp-lesson-id" ? newLesson : ls
                ),
              }
            : sec
        ),
      }));

      successToast("Lesson created succesfull");
    },

    //  refetch
    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};
