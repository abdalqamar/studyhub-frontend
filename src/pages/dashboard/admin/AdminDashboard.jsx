import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { useAdminDashboardStats } from "../../../hooks/admin/useAdminDashboardStats";
import AnalyticsCharts from "./components/charts/AnalyticsCharts";
import OverviewStats from "./components/OverviewStats";

const AdminDashboard = () => {
  const { data, isLoading } = useAdminDashboardStats();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

      {/* Stats Cards */}
      <OverviewStats stats={data.stats} />
      {/* Charts Grid */}
      <AnalyticsCharts
        monthlyRevenue={data.monthlyRevenue}
        monthlyStudents={data.monthlyStudents}
        monthlyInstructors={data.monthlyInstructors}
        topInstructors={data.topInstructors}
        courseCategories={data.courseCategories}
        newEnrollments={data.newEnrollments}
      />
    </div>
  );
};

export default AdminDashboard;
