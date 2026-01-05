import { useQuery } from "@tanstack/react-query";
import { profileService } from "../services/profileServices";

export const useEnrolledCourses = () => {
  return useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: profileService.getEnrolledCourses,
  });
};
