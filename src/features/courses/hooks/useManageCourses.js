import { courseService } from "@/features/courses/services/courseService";
import { courseKeys } from "@/lib/queryKeys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useManageCourses = ({
  instructor,
  search,
  status,
  category,
  page,
  limit,
}) => {
  return useQuery({
    queryKey: courseKeys.manage({
      instructor,
      search,
      status,
      category,
      page,
      limit,
    }),
    queryFn: () =>
      courseService.getManageCourses({
        instructor,
        search,
        status,
        category,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });
};
