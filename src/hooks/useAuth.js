import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authServices";
import toast from "react-hot-toast";
import { errorToast, successToast } from "../utils/toastUtils";
import { clearAuth } from "../features/auth/authSlice";

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
      // Only handle data-side effects here
      queryClient.removeQueries(["profile"]);
      queryClient.clear();
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email) => authService.forgotPassword(email),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, newPassword }) =>
      authService.resetPassword(token, newPassword),
    onSuccess: (res) => {
      toast.success("Password reset successful! Please login.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Password reset failed");
    },
  });

  return {
    loginMutation,
    logoutMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
  };
};
