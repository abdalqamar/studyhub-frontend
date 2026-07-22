import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/authServices";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";
import { profileKeys } from "@/lib/queryKeys";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useGlobalMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });

  const logoutMutation = useGlobalMutation({
    mutationFn: authService.logout,

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: profileKeys.all });
      queryClient.clear();
    },

    onError: (error) => {
      errorToast(error.response?.data?.message || "Logout failed");
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email) => authService.forgotPassword(email),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, newPassword }) =>
      authService.resetPassword(token, newPassword),
    onSuccess: () => {
      successToast("Password reset successful! Please login.");
    },
    onError: (error) => {
      errorToast(error.response?.data?.message || "Password reset failed");
    },
  });

  return {
    loginMutation,
    logoutMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
  };
};
