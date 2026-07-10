import { useQuery } from "@tanstack/react-query";
import { instructorService } from "../services/instructorServices";

export const useInstructorStudents = ({ search, status, page, limit }) => {
  return useQuery({
    queryKey: ["instructorStudents", search, status, page, limit],
    queryFn: () =>
      instructorService.fetchInstructorStudents({
        search,
        status,
        page,
        limit,
      }),
    keepPreviousData: true,
  });
};
