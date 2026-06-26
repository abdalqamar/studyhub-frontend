import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { courseKeys } from "../../lib/queryKeys";
export const useManageCourses = ({
  instructor,
  search,
  status,
  category,
  page,
  limit,
}) => {
  return useQuery({
    queryKey: courseKeys.manage({ instructor, search, status, page }),
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
