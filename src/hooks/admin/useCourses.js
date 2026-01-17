import { useQuery } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";

// Get all courses for admin
export const useAdminCourses = ({ search, status, category, page, limit }) => {
  return useQuery({
    queryKey: ["adminCourses", search, status, category, page, limit],
    queryFn: () =>
      courseService.getAllCoursesAdmin({
        search,
        status,
        category,
        page,
        limit,
      }),
    keepPreviousData: true,
  });
};
