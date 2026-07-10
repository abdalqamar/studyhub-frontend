import { courseService } from "@/features/courses/services/courseService";
import { useCourseContentMutation } from "../../hooks/mutations/useCourseContentMutation";

const TEMP_ID = "temp-lesson-id";

export const useCreateLesson = (courseId) =>
  useCourseContentMutation({
    courseId,
    useGlobal: false, // has its own inline upload-progress UI
    mutationFn: ({ sectionId, formData, onUploadProgress }) =>
      courseService.createLesson(courseId, sectionId, formData, onUploadProgress),

    optimisticUpdate: (old, { sectionId, formData }) => ({
      ...old,
      courseContent: old.courseContent.map((sec) =>
        sec._id === sectionId
          ? {
              ...sec,
              lesson: [
                ...(sec.lesson || []),
                { _id: TEMP_ID, title: formData.get("title"), description: formData.get("description"), videoUrl: null },
              ],
            }
          : sec
      ),
    }),

    applyServerResult: (old, newLesson, { sectionId }) => ({
      ...old,
      courseContent: old.courseContent.map((sec) =>
        sec._id === sectionId
          ? { ...sec, lesson: sec.lesson.map((ls) => (ls._id === TEMP_ID ? newLesson : ls)) }
          : sec
      ),
    }),

    successMessage: "Lesson created successfully!",
    errorMessage: "Failed to create lesson",
  });
