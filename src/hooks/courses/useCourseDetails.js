import { useQuery } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { courseKeys } from "../../lib/queryKeys";

export const useCourseDetails = (id) => {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => courseService.getCourseDetails(id),
    enabled: !!id,
  });
};
