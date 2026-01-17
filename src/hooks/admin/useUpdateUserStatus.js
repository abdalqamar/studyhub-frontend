import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../../services/adminServices";
import { errorToast, successToast } from "../../utils/toastUtils";

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }) =>
      adminService.updateUserStatus(userId, status),

    onSuccess: (_data, variables) => {
      if (variables.status === "suspended") {
        successToast("User suspended successfully");
      } else if (variables.status === "active") {
        successToast("User activated successfully");
      } else {
        successToast("User status updated");
      }
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },

    onError: (error) => {
      errorToast(
        error?.response?.data?.message || "Failed to update user status"
      );
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => adminService.deleteUser(userId),

    onSuccess: () => {
      successToast("User deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },

    onError: (error) => {
      console.log(error);
      errorToast(error?.response?.data?.message || "Failed to delete user");
    },
  });
};
