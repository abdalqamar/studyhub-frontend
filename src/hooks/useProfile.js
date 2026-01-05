import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../services/profileServices";

export const useProfile = () => {
  const queryClient = useQueryClient();
  // Fetch Profile
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
  });

  // Update Profile Info
  const updateProfileMutation = useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  // Update Photo
  const updatePhotoMutation = useMutation({
    mutationFn: profileService.updatePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  return {
    profileQuery,
    updateProfileMutation,
    updatePhotoMutation,
  };
};
