import { useQuery } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { courseKeys } from "../../lib/queryKeys";

export const useCourseById = (courseId) => {
  return useQuery({
    queryKey: courseKeys.detail(courseId),
    queryFn: () => courseService.getCourseById(courseId),
    enabled: !!courseId,
  });
};
