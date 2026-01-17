import { useQuery } from "@tanstack/react-query";
import { instructorService } from "../../services/InstructorServices";

// for fetching instructor's courses
export const useInstructorCourses = ({
  search,
  status,
  category,
  page,
  limit,
}) => {
  return useQuery({
    queryKey: ["instructorCourses", search, status, category, page, limit],
    queryFn: () =>
      instructorService.fetchInstructorCourses({
        search,
        status,
        category,
        page,
        limit,
      }),
    keepPreviousData: true,
  });
};

// for fetching instructor's students
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
