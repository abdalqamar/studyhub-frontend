import PageLoader from "@/shared/ui/PageLoader";
import { useAdminDashboardStats } from "../hooks/useAdminDashboardStats";
import ErrorPage from "@/shared/ui/ErrorPage";
import OverviewStats from "../components/OverviewStats";
import AnalyticsCharts from "../components/charts/AnalyticsCharts";

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
      <div>
        <h1 className="font-display font-bold text-2xl text-text-1">
          Admin Dashboard
        </h1>
        <p className="text-[13.5px] text-text-3 mt-1">
          Platform overview — courses, students, revenue and instructor activity
          at a glance.
        </p>
      </div>

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
