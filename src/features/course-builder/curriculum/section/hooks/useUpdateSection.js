import { courseService } from "@/features/courses/services/courseService";
import { useCourseContentMutation } from "../../hooks/mutations/useCourseContentMutation";

export const useUpdateSection = (courseId) =>
  useCourseContentMutation({
    courseId,
    mutationFn: ({ sectionId, sectionName }) =>
      courseService.updateSection(courseId, sectionId, { sectionName }),

    optimisticUpdate: (old, { sectionId, sectionName }) => ({
      ...old,
      courseContent: old.courseContent.map((sec) =>
        sec._id === sectionId ? { ...sec, sectionName } : sec
      ),
    }),

    successMessage: "Section updated successfully!",
    errorMessage: "Failed to update section",
  });
