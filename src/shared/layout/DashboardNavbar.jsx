import { Menu, Bell, Search } from "lucide-react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import formatLastActive from "../utils/formatLastActive";

const DashboardNavbar = ({ user, handleLogout, setIsSidebarOpen }) => {
  return (
    <header
      className="sticky top-0 z-30 border-b border-border backdrop-blur-xl"
      style={{ background: "rgba(10,14,26,0.75)" }}
    >
      <div className="flex items-center justify-between px-4 lg:px-8 py-[18px] gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-3 flex-1 lg:flex-initial">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-text-1 hover:text-text-2 transition p-2 hover:bg-surface-2 rounded-lg"
          >
            <Menu size={24} />
          </button>

          {/* Welcome Message */}
          <div className="hidden lg:flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-semibold text-[19px] text-text-1">
                Welcome back, {user?.name?.split(" ")[0] || "there"}
              </h1>
              <span className="text-base">👋</span>
            </div>

            <div className="flex items-center gap-1.5 text-[12.5px] text-text-3">
              <span className="w-[7px] h-[7px] rounded-full bg-teal shadow-[0_0_0_3px_rgba(45,212,191,0.14)]" />
              {user && <p>Last active {formatLastActive(user.lastActive)}</p>}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2.5 md:gap-3.5">
          {/* Search box */}
          <div className="hidden md:flex items-center gap-2 bg-surface-2 border border-border rounded-[10px] px-3.5 py-2 text-text-3 text-[13px] w-[220px]">
            <Search size={14} />
            <span>Search…</span>
          </div>

          {/* Notification Bell */}
          <Link
            to={`/${user?.role}/notifications`}
            className="relative w-[38px] h-[38px] rounded-[10px] bg-surface-2 border border-border flex items-center justify-center text-text-2 hover:text-text-1 transition"
          >
            <Bell size={17} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-bg text-[9.5px] font-bold font-mono flex items-center justify-center">
              3
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
