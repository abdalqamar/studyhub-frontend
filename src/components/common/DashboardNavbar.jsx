import { Menu, Bell, Search } from "lucide-react";
import Dropdown from "../common/Dropdown";
import { Link } from "react-router-dom";
import { use } from "react";
import formatLastActive from "../../utils/formatLastActive";

const DashboardNavbar = ({ user, handleLogout, setIsSidebarOpen }) => {
  return (
    <header className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-30 shadow-xl">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4 gap-4">
        {/* Left Side  */}
        <div className="flex items-center gap-3 flex-1 lg:flex-initial">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-white hover:text-gray-300 transition p-2 hover:bg-slate-700 rounded-lg"
          >
            <Menu size={24} />
          </button>

          {/* Welcome Message  */}
          <div className="hidden lg:flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">
                Welcome back, Zaara!
              </h1>
              <span className="text-2xl">👋</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>

              {user && (
                <p className="text-slate-300">
                  Last active {formatLastActive(user.lastActive)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Notifications & User */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notification Bell */}
          <Link
            to={`/${user?.role}/notifications`}
            className="relative text-gray-400 hover:text-white transition p-2 hover:bg-slate-700 rounded-lg"
          >
            <Bell size={20} />
            <span
              className={`absolute top-1 right-1 w-4 h-4 md:w-5 md:h-5 rounded-full text-[10px] md:text-xs flex items-center justify-center text-white font-semibold animate-pulse ${
                user?.role === "student"
                  ? "bg-blue-500"
                  : user?.role === "instructor"
                    ? "bg-green-500"
                    : "bg-purple-500"
              }`}
            >
              3{}
            </span>
          </Link>

          {/* User Dropdown */}
          <Dropdown role={user?.role} user={user} handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
