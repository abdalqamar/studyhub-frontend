import SummaryCards from "../components/SummaryCards";
import CoursePerformanceChart from "../components/CoursePerformanceChart";
import EarningsChart from "../components/EarningsChart";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import StudentEngagementChart from "../components/StudentEngagementChart";

const InstructorDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-text-1">
          Instructor Dashboard
        </h1>
        <p className="text-[13.5px] text-text-3 mt-1">
          Welcome back! Here's your teaching overview.
        </p>
      </div>

      {/* Stats Cards */}
      <SummaryCards />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        <EarningsChart />
        <StudentEngagementChart />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[18px]">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-[18px]">
          <CoursePerformanceChart />
          <RecentActivity />
        </div>

        {/* Right Column */}
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
