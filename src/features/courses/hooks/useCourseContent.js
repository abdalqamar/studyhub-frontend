import { courseKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/courseService";

export const useCourseContent = (courseId) => {
  return useQuery({
    queryKey: courseKeys.content(courseId),
    queryFn: () => courseService.getCourseContent(courseId),
    enabled: !!courseId,
  });
};
