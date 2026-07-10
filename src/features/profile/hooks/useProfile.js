import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { profileService } from "@/features/profile/services/profileServices";
import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";

export const useProfile = () => {
  const queryClient = useQueryClient();

  const accessToken = useAuthStore((state) => state.accessToken);

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
    enabled: !!accessToken,
    retry: false,
  });

  const clearProfile = () => {
    queryClient.removeQueries({
      queryKey: ["profile"],
    });
  };

  const updateProfileMutation = useGlobalMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });

  const updatePhotoMutation = useGlobalMutation({
    mutationFn: profileService.updatePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });

  const updatePasswordMutation = useGlobalMutation({
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
