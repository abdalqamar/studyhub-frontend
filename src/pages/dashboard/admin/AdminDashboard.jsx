import AnalyticsCharts from "./components/charts/AnalyticsCharts";
import OverviewStats from "./components/OverviewStats";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-slate-400">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <OverviewStats />

      {/* Charts Grid */}
      <AnalyticsCharts />
    </div>
  );
};

export default AdminDashboard;
