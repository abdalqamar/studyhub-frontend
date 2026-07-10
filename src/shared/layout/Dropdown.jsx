import { useState } from "react";
import { NavLink } from "react-router-dom";
import { User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { useClickOutside } from "../hooks/useClickOutside";

const Dropdown = ({ user, handleLogout, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  const showImage = user?.profileImage && !imgError;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-1 pr-2.5 py-2 bg-surface-2 border border-border rounded-xl hover:border-border-strong transition-colors"
      >
        <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-accent-blue to-teal flex items-center justify-center overflow-hidden flex-shrink-0">
          {showImage ? (
            <img
              src={user.profileImage}
              alt={user.firstName || "User"}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="font-display text-[12.5px] font-bold text-bg">
              {(user?.firstName?.[0] || "U").toUpperCase()}
            </span>
          )}
        </div>

        <div className="hidden md:block text-left leading-tight">
          <p className="text-text-1 text-[13px] font-semibold">
            {user?.firstName || "User"}
          </p>
          <p className="text-text-3 text-[11px] capitalize">{user?.role}</p>
        </div>

        <ChevronDown
          size={15}
          className={`hidden md:block text-text-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-[14px] shadow-xl overflow-hidden z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-blue to-teal flex items-center justify-center overflow-hidden flex-shrink-0">
                {showImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.firstName || "User"}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="font-display text-[13px] font-bold text-bg">
                    {(user?.firstName?.[0] || "U").toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-text-1 font-semibold text-[13px] truncate">
                  {user?.firstName || "User"} {user?.lastName || ""}
                </p>
                <p className="text-text-3 text-[11.5px] truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>

          <div className="py-1.5">
            <NavLink
              to={`/${user?.role}`}
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-gold-soft text-gold"
                    : "text-text-2 hover:bg-surface-2 hover:text-text-1"
                }`
              }
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to={`/${user?.role}/profile`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-gold-soft text-gold"
                    : "text-text-2 hover:bg-surface-2 hover:text-text-1"
                }`
              }
            >
              <User size={17} />
              <span>Profile</span>
            </NavLink>

            <div className="my-1.5 h-px bg-border" />

            <button
              disabled={isLoading}
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-danger hover:bg-danger-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut size={17} />
              <span>{isLoading ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
