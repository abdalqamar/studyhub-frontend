import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../services/profileServices";
import { useSelector } from "react-redux";

export const useProfile = () => {
  const queryClient = useQueryClient();
  const accessToken = useSelector((s) => s.auth.accessToken);

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
    enabled: !!accessToken,
    retry: false,
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
