import { profileService } from "@/features/profile/services/profileServices";
import { useQuery } from "@tanstack/react-query";
import { profileKeys } from "@/lib/queryKeys";

export const useEnrolledCourses = () => {
  return useQuery({
    queryKey: profileKeys.enrolledCourses(),
    queryFn: profileService.getEnrolledCourses,
  });
};
