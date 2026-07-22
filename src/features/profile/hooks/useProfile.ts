import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { profileService } from "@/features/profile/services/profileServices";
import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";
import type { User } from "@/types";
import { AxiosError } from "axios";
import { profileKeys } from "@/lib/queryKeys";

interface ApiErrorData {
  message?: string;
}

export const useProfile = () => {
  const queryClient = useQueryClient();

  const accessToken = useAuthStore((state) => state.accessToken);

  const profileQuery = useQuery({
    queryKey: profileKeys.detail(),
    queryFn: profileService.getProfile,
    enabled: !!accessToken,
    retry: false,
  });

  const clearProfile = (): void => {
    queryClient.removeQueries({
      queryKey: profileKeys.all,
    });
  };

  const updateProfileMutation = useGlobalMutation<
    User,
    AxiosError<ApiErrorData>,
    Partial<User>
  >({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });

  const updatePhotoMutation = useGlobalMutation<
    User,
    AxiosError<ApiErrorData>,
    FormData
  >({
    mutationFn: profileService.updatePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });

  const updatePasswordMutation = useGlobalMutation<
    void,
    AxiosError<ApiErrorData>,
    { oldPassword: string; newPassword: string }
  >({
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
