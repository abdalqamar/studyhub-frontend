import AnalyticsCharts from "./components/charts/AnalyticsCharts";
import OverviewStats from "./components/OverviewStats";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

      {/* Stats Cards */}
      <OverviewStats />

      {/* Charts Grid */}
      <AnalyticsCharts />
    </div>
  );
};

export default AdminDashboard;
