import PageLoader from "../../../components/PageLoader";
import ErrorPage from "../../../components/ui/ErrorPage";
import { useAdminDashboardStats } from "../../../hooks/admin/useAdminDashboardStats";
import AnalyticsCharts from "./components/charts/AnalyticsCharts";
import OverviewStats from "./components/OverviewStats";

const AdminDashboard = () => {
  const { data, isLoading, isError } = useAdminDashboardStats();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const stats = data?.stats || {};
  const monthlyRevenue = data?.monthlyRevenue || [];
  const monthlyStudents = data?.monthlyStudents || [];
  const monthlyInstructors = data?.monthlyInstructors || [];
  const topInstructors = data?.topInstructors || [];
  const courseCategories = data?.courseCategories || [];
  const newEnrollments = data?.newEnrollments || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

      {/* Stats Cards */}
      <OverviewStats stats={stats} />

      {/* Charts Grid */}
      <AnalyticsCharts
        monthlyRevenue={monthlyRevenue}
        monthlyStudents={monthlyStudents}
        monthlyInstructors={monthlyInstructors}
        topInstructors={topInstructors}
        courseCategories={courseCategories}
        newEnrollments={newEnrollments}
      />
    </div>
  );
};

export default AdminDashboard;
