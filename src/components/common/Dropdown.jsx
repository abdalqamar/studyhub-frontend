import { useState } from "react";
import { NavLink } from "react-router-dom";
import { User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";

const Dropdown = ({ user, handleLogout, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 bg-slate-800/80 backdrop-blur-sm rounded-lg hover:bg-slate-700/80 transition-all duration-200 border border-slate-700/50"
      >
        {/* Avatar */}
        <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-600 rounded-full flex items-center justify-center overflow-hidden ring-1 ring-slate-600">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.firstName || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="text-slate-300" size={18} />
          )}
        </div>

        {/* User Info - Desktop only */}
        <div className="hidden md:block text-left">
          <p className="text-white text-sm font-medium leading-tight">
            {user?.firstName || "User"}
          </p>
          <p className="text-slate-400 text-xs capitalize leading-tight">
            {user?.role}
          </p>
        </div>

        {/* Chevron */}
        <ChevronDown
          size={16}
          className={`hidden md:block text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-slate-700 bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center overflow-hidden">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.firstName || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-slate-300" size={20} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">
                  {user?.firstName || "User"} {user?.lastName || ""}
                </p>
                <p className="text-slate-400 text-xs truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <NavLink
              to={`/${user?.role}`}
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 transition-colors ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-gray-300 hover:bg-slate-700/50 hover:text-white"
                }`
              }
            >
              <LayoutDashboard size={18} />
              <span className="text-sm font-medium">Dashboard</span>
            </NavLink>

            <NavLink
              to={`/${user?.role}/profile`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 transition-colors ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-gray-300 hover:bg-slate-700/50 hover:text-white"
                }`
              }
            >
              <User size={18} />
              <span className="text-sm font-medium">Profile</span>
            </NavLink>

            {/* Divider */}
            <div className="my-1 h-px bg-slate-700"></div>

            {/* Logout Button */}
            <button
              disabled={isLoading}
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-slate-700/50 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">
                {isLoading ? "Logging out..." : "Logout"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
