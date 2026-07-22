import { useQuery } from "@tanstack/react-query";
import { adminService } from "../services/adminServices";
import { adminKeys } from "@/lib/queryKeys";

export const useAdminDashboardStats = () => {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: adminService.fetchAdminDashboardStats,
  });
};
