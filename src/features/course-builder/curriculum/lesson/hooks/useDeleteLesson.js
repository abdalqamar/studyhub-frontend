import { courseService } from "@/features/courses/services/courseService";
import { useCourseContentMutation } from "../../hooks/mutations/useCourseContentMutation";

export const useDeleteLesson = (courseId) =>
  useCourseContentMutation({
    courseId,
    mutationFn: ({ sectionId, lessonId }) => courseService.deleteLesson(courseId, sectionId, lessonId),

    optimisticUpdate: (old, { sectionId, lessonId }) => ({
      ...old,
      courseContent: old.courseContent.map((sec) =>
        sec._id === sectionId ? { ...sec, lesson: sec.lesson.filter((ls) => ls._id !== lessonId) } : sec
      ),
    }),

    successMessage: "Lesson deleted successfully!",
    errorMessage: "Failed to delete lesson",
  });
