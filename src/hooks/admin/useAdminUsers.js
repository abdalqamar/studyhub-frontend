import { useQuery } from "@tanstack/react-query";
import { adminService } from "../../services/adminServices";

export const useAdminUsers = ({ role, search, status, page, limit }) => {
  return useQuery({
    queryKey: ["admin-users", role, search, status, page, limit],
    queryFn: () =>
      adminService.fetchAllUsers({
        role,
        search,
        status,
        page,
        limit,
      }),
    keepPreviousData: true,
  });
};
