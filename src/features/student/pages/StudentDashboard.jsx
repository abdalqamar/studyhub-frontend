import { BarChart3, BookOpen, Target, Zap } from "lucide-react";
import QuickActions from "../components/QuickActions";
import SummaryCards from "../components/SummaryCards";
import ActiveCourses from "../components/ActiveCourses";
import UpcomingLiveClasses from "../components/UpcomingLiveClasses";
import StudyProgressChart from "../components/charts/StudyProgressChart";
import CourseProgressChart from "../components/charts/CourseProgressChart";
import WatchTimeChart from "../components/charts/WatchTimeChart";
import LeaderboardChart from "../components/charts/LeaderboardChart";
import RecentActivity from "../components/RecentActivity";
import Achievements from "../components/Achievements";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-surface text-slate-100">
      {/*  Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Quick Actions
        </h2>
        <QuickActions />
      </div>

      {/*  Overview Stats  */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-gold" />
          Overview Stats
        </h2>
        <SummaryCards />
      </div>

      {/*  Learning Activity  */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-400" />
          Learning Activity
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveCourses />
          </div>
          <div>
            <UpcomingLiveClasses />
          </div>
        </div>
      </div>

      {/*  Progress & Leaderboard */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-gold" />
          Progress & Leaderboard
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StudyProgressChart />
          <CourseProgressChart />
          <WatchTimeChart />

          <div className="lg:col-span-3">
            <LeaderboardChart />
          </div>
        </div>
      </div>

      {/*  Recent Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RecentActivity />
        <Achievements />
      </div>
    </div>
  );
};

export default StudentDashboard;
