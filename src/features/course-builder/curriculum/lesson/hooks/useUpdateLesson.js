import { courseService } from "@/features/courses/services/courseService";
import { useCourseContentMutation } from "../../hooks/mutations/useCourseContentMutation";

export const useUpdateLesson = (courseId) =>
  useCourseContentMutation({
    courseId,
    useGlobal: false,
    mutationFn: ({ sectionId, lessonId, formData, onUploadProgress }) =>
      courseService.updateLesson(
        courseId,
        sectionId,
        lessonId,
        formData,
        onUploadProgress
      ),

    optimisticUpdate: (old, { sectionId, lessonId, formData }) => ({
      ...old,
      courseContent: old.courseContent.map((sec) =>
        sec._id === sectionId
          ? {
              ...sec,
              lesson: sec.lesson.map((l) =>
                l._id === lessonId
                  ? {
                      ...l,
                      title: formData.get("title"),
                      description: formData.get("description"),
                    }
                  : l
              ),
            }
          : sec
      ),
    }),

    applyServerResult: (old, updatedLesson, { sectionId }) => ({
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
    }),

    successMessage: "Lesson updated successfully!",
    errorMessage: "Failed to update lesson",
  });
