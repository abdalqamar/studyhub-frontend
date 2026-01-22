import { useQuery } from "@tanstack/react-query";
import { adminService } from "../../services/adminServices";

export const useAdminDashboardStats = () => {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: adminService.fetchAdminDashboardStats,
  });
};
