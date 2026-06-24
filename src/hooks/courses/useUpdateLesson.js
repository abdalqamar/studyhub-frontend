import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";

export const useUpdateLesson = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, lessonId, formData }) =>
      courseService.updateLesson(courseId, sectionId, lessonId, formData),

    onMutate: async ({ sectionId, lessonId, formData }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);

      const newTitle = formData.get("title");
      const newDesc = formData.get("description");

      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                lesson: sec.lesson.map((l) =>
                  l._id === lessonId
                    ? { ...l, title: newTitle, description: newDesc }
                    : l
                ),
              }
            : sec
        ),
      }));

      return { prevCourse };
    },

    onError: (error, vars, prevCourse) => {
      if (prevCourse) {
        queryClient.setQueryData(["course", courseId], prevCourse);
      }
    },

    onSuccess: ({ updatedLesson, sectionId }) => {
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                lesson: sec.lesson.map((l) =>
                  l._id === updatedLesson._id ? updatedLesson : l
                ),
              }
            : sec
        ),
      }));
    },

    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};
