import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { adminService } from "../services/adminServices";
import { adminKeys } from "@/lib/queryKeys";

export const useAdminUsers = ({ role, search, status, page, limit }) => {
  return useQuery({
    queryKey: adminKeys.users({ role, search, status, page, limit }),
    queryFn: () =>
      adminService.fetchAllUsers({
        role,
        search,
        status,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });
};
