import { useQuery } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";

export const useCourseContent = (courseId) => {
  return useQuery({
    queryKey: ["course-content", courseId],
    queryFn: () => courseService.getCourseContent(courseId),
  });
};
