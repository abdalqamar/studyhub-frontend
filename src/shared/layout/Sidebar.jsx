import { dashboardLinks } from "../../data/data.js";
import { NavLink } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { useState } from "react";
import Modal from "../components/Modal.jsx";

const Sidebar = ({ user, isSidebarOpen, setIsSidebarOpen, handleLogout }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <aside
        className={`
        fixed top-0 left-0 min-h-screen w-[264px] bg-surface border-r border-border text-text-1 p-5 z-50
        flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static
      `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-gold to-[#a97e1f] flex items-center justify-center flex-shrink-0 font-display font-bold text-bg text-base">
              S
            </div>
            <div>
              <h2 className="font-display font-semibold text-[17px] leading-tight tracking-tight">
                Study<span className="text-gold">Hub</span>
              </h2>
              <p className="text-[11px] text-text-3 uppercase tracking-[0.08em] mt-0.5">
                {user?.role} Portal
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-text-2 hover:text-text-1 hover:bg-surface-2 rounded-lg p-1.5 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
          {dashboardLinks.map((link, i) => {
            if (link.type && user?.role !== link.type) return null;
            const Icon = link.icon;
            return (
              <NavLink
                key={i}
                to={link.path}
                end={link.name === "Dashboard"}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-[11px] rounded-lg text-sm font-medium transition-colors relative ${
                    isActive
                      ? "bg-gold-soft text-gold before:absolute before:-left-5 before:top-2 before:bottom-2 before:w-[3px] before:bg-gold before:rounded-r"
                      : "text-text-2 hover:bg-surface-2 hover:text-text-1"
                  }`
                }
              >
                <Icon size={18} className="flex-shrink-0 opacity-85" />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={() =>
              setModal({
                title: "Confirm Logout",
                message: "Are you sure you want to log out of your account?",
                cancelText: "Cancel",
                confirmText: "Logout",
                onConfirm: handleLogout,
                onClose: () => setModal(false),
              })
            }
            className="w-full flex items-center justify-center gap-2.5 px-4 py-[11px] rounded-lg border border-danger-soft bg-danger-soft text-danger font-semibold text-[13.5px] hover:bg-danger/20 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
      {modal && <Modal modalData={modal} />}
    </>
  );
};

export default Sidebar;
