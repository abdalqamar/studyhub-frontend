import SummaryCards from "./components/SummaryCards";
import ActiveCourses from "./components/ActiveCourses";
import UpcomingLiveClasses from "./components/UpcomingLiveClasses";
import RecentActivity from "./components/RecentActivity";
import Notifications from "./components/Notifications";
import Achievements from "./components/Achievements";
import StudyProgressChart from "./components/charts/StudyProgressChart";
import CourseProgressChart from "./components/charts/CourseProgressChart";
import WatchTimeChart from "./components/charts/WatchTimeChart";
import LeaderboardChart from "./components/charts/LeaderboardChart";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Welcome back! Continue your learning journey
        </p>
      </div>

      {/* 🏁 TOP SECTION — OVERVIEW STATS */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="mr-2">🎯</span> Overview Stats
        </h2>
        <SummaryCards />
      </div>

      {/* 📊 PROGRESS & LEADERBOARD SECTION */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="mr-2">📊</span> Progress & Leaderboard
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-2">
            <StudyProgressChart />
          </div>
          <div>
            <CourseProgressChart />
          </div>
          <div>
            <WatchTimeChart />
          </div>
          <div className="xl:col-span-4">
            <LeaderboardChart />
          </div>
        </div>
      </div>

      {/* 🎓 LEARNING ACTIVITY SECTION */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="mr-2">🎓</span> Learning Activity
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveCourses />
          </div>
          <div className="space-y-6">
            <UpcomingLiveClasses />
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* 🏆 ACHIEVEMENTS & UPDATES SECTION */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="mr-2">🏆</span> Achievements & Updates
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Achievements />
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
