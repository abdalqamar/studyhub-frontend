import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../services/profileServices";

export const useProfile = () => {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
  });

  const clearProfile = () => {
    queryClient.removeQueries({ queryKey: ["profile"] });
  };

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

  const updatePasswordMutation = useMutation({
    mutationFn: profileService.updatePassword,
  });

  return {
    profileQuery,
    clearProfile,
    updateProfileMutation,
    updatePhotoMutation,
    updatePasswordMutation,
  };
};
