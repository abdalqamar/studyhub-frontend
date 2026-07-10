import { courseService } from "@/features/courses/services/courseService";
import { useCourseContentMutation } from "../../hooks/mutations/useCourseContentMutation";

export const useDeleteSection = (courseId) =>
  useCourseContentMutation({
    courseId,
    mutationFn: ({ sectionId }) => courseService.deleteSection(courseId, sectionId),

    optimisticUpdate: (old, { sectionId }) => ({
      ...old,
      courseContent: old.courseContent.filter((sec) => sec._id !== sectionId),
    }),

    successMessage: "Section deleted successfully!",
    errorMessage: "Failed to delete section",
  });
