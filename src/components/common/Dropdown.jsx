import { useState } from "react";
import { NavLink } from "react-router-dom";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";
const Dropdown = ({ user, handleLogout, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r rounded-full flex items-center justify-center ring-2 ring-slate-600 from-blue-600 to-blue-700 overflow-hidden">
          <img src={user?.profileImage} alt="user.avatar" />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-white text-sm font-medium">
            {user?.firstName || "User"}
          </p>
          <p className="text-gray-400 text-xs capitalize">{user?.role}</p>
        </div>
        <ChevronDown
          size={18}
          className={`hidden md:block text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
          {/* User Info Header */}
          <div
            className={`px-4 py-3 border-b border-slate-700 bg-gradient-to-r ${
              user?.role === "student"
                ? "from-blue-600 to-blue-700"
                : user?.role === "instructor"
                ? "from-green-600 to-green-700"
                : "from-purple-600 to-purple-700"
            }`}
          >
            <p className="text-white font-semibold">
              {user?.firstName || "User"}
            </p>
            <p className="text-white/80 text-xs">
              {user?.email || "user@example.com"}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <NavLink
              to={`/${user?.role}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition"
            >
              <User size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to={`/${user?.role}/profile`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition"
            >
              <User size={18} />
              <span>My Profile</span>
            </NavLink>

            <NavLink
              to={`/${user?.role}/settings`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition"
            >
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>

            <div className="border-t border-slate-700 my-2"></div>

            <button
              disabled={isLoading}
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
