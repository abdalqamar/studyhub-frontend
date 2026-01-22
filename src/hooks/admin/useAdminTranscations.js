import { useQuery } from "@tanstack/react-query";
import { adminService } from "../../services/adminServices";

export const useAdminTransactions = (status, dateRange, page, limit) => {
  return useQuery({
    queryKey: ["admin-transactions", status, dateRange, page, limit],
    queryFn: () =>
      adminService.fetchAdminTransactions({
        status,
        dateRange,
        page,
        limit,
      }),
    keepPreviousData: true,
  });
};
