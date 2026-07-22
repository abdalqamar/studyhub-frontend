import { courseKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/courseService";

export const useCourseDetails = (id) => {
  return useQuery({
    queryKey: courseKeys.publicDetail(id),
    queryFn: () => courseService.getCourseDetails(id),
    enabled: !!id,
  });
};
