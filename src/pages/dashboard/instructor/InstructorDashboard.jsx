import RecentActivity from "./components/RecentActivity";
import StudentEngagementChart from "./components/StudentEngagementChart";
import QuickActions from "./components/QuickActions";
import OverviewStats from "../admin/components/OverviewStats";
import EarningsChart from "./components/EarningsChart";
import CoursePerformanceChart from "./components/CoursePerformanceChart";

const InstructorDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Instructor Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Welcome back! Here's your teaching overview
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <OverviewStats />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EarningsChart />
        <StudentEngagementChart />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <CoursePerformanceChart />
          <RecentActivity />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
