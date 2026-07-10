import { courseService } from "@/features/courses/services/courseService";
import { useCourseContentMutation } from "../../hooks/mutations/useCourseContentMutation";

const TEMP_ID = "temp-section-id";

export const useCreateSection = (courseId) =>
  useCourseContentMutation({
    courseId,
    mutationFn: ({ sectionName }) => courseService.createSection(courseId, { sectionName }),

    optimisticUpdate: (old, { sectionName }) => ({
      ...old,
      courseContent: [
        ...(old?.courseContent || []),
        { _id: TEMP_ID, sectionName, lesson: [] },
      ],
    }),

    applyServerResult: (old, newSection) => ({
      ...old,
      courseContent: old.courseContent.map((sec) => (sec._id === TEMP_ID ? newSection : sec)),
    }),

    errorMessage: "Failed to create section",
  });
