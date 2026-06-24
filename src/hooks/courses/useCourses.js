import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { courseKeys } from "../../lib/queryKeys";

export const useCourses = ({ search, category, page, limit }) => {
  return useQuery({
    queryKey: courseKeys.list({ search, category, page, limit }),
    queryFn: () => courseService.getCourses({ search, category, page, limit }),
    placeholderData: keepPreviousData,
  });
};
