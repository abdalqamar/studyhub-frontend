import { profileService } from "@/features/profile/services/profileServices";
import { useQuery } from "@tanstack/react-query";

export const useEnrolledCourses = () => {
  return useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: profileService.getEnrolledCourses,
  });
};
