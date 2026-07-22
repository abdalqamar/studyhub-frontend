import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { adminService } from "../services/adminServices";
import { adminKeys } from "@/lib/queryKeys";

export const useAdminTransactions = (status, dateRange, page, limit) => {
  return useQuery({
    queryKey: adminKeys.transactions({ status, dateRange, page, limit }),
    queryFn: () =>
      adminService.fetchAdminTransactions({
        status,
        dateRange,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });
};
