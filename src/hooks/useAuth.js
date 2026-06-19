import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authServices";
import { errorToast } from "../utils/toastUtils";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,

    onSuccess: () => {
      queryClient.removeQueries(["profile"]);
      queryClient.clear();
    },

    onError: (error) => {
      errorToast(error.response?.data?.message || "Logout Feiled");
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email) => authService.forgotPassword(email),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, newPassword }) =>
      authService.resetPassword(token, newPassword),
    onSuccess: () => {
      errorToast("Password reset successful! Please login.");
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
