import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { instructorService } from "../services/instructorServices";
import { instructorKeys } from "@/lib/queryKeys";

export const useInstructorStudents = ({ search, status, page, limit }) => {
  return useQuery({
    queryKey: instructorKeys.students({ search, status, page, limit }),
    queryFn: () =>
      instructorService.fetchInstructorStudents({
        search,
        status,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });
};
