import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AuthResponse,
  authService,
} from "@/features/auth/services/authServices";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";
import { profileKeys } from "@/lib/queryKeys";
import { AxiosError } from "axios";
import { ApiErrorData } from "@/types";

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  //Login
  const loginMutation = useGlobalMutation<
    AuthResponse,
    AxiosError<ApiErrorData>,
    { email: string; password: string }
  >({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });

  //Logout
  const logoutMutation = useGlobalMutation<
    void,
    AxiosError<ApiErrorData>,
    void
  >({
    mutationFn: authService.logout,

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: profileKeys.all });
      queryClient.clear();
    },

    onError: (error) => {
      errorToast(error.response?.data?.message || "Logout failed");
    },
  });

  // Forgot Password
  const forgotPasswordMutation = useMutation<
    { message: string },
    AxiosError<ApiErrorData>,
    string
  >({
    mutationFn: (email) => authService.forgotPassword(email),
  });

  //Reset Password
  const resetPasswordMutation = useMutation<
    { message: string },
    AxiosError<ApiErrorData>,
    ResetPasswordPayload
  >({
    mutationFn: ({ token, newPassword, confirmNewPassword }) =>
      authService.resetPassword(token, newPassword, confirmNewPassword),
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
