import { courseKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/courseService";

export const useCourseById = (courseId) => {
  return useQuery({
    queryKey: courseKeys.edit(courseId),
    queryFn: () => courseService.getCourseById(courseId),
    enabled: !!courseId,
  });
};
