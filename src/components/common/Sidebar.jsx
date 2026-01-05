import { dashboardLinks } from "../../data/data.js";
import { NavLink } from "react-router-dom";
import { LogOut, X, User } from "lucide-react";
import Modal from "../Modal.jsx";
import { useState } from "react";
const Sidebar = ({ user, isSidebarOpen, setIsSidebarOpen, handleLogout }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <aside
        className={`
        fixed top-0 left-0 min-h-screen w-64 bg-slate-800/95 backdrop-blur-xl border-r border-slate-700/50 text-white p-6 z-50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-400">
              Study<span className="text-white">Hub</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1 capitalize">
              {user?.role} Portal
            </p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto">
          {dashboardLinks.map((link) => {
            if (link.type && user?.role !== link.type) return null;
            const Icon = link.icon;
            return (
              <NavLink
                key={link.id}
                to={link.path}
                end={link.name === "Dashboard"}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-600 text-white "
                      : "text-gray-300 hover:bg-slate-700 hover:text-white"
                  }`
                }
              >
                <Icon
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-3 pt-6 border-t border-slate-700">
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 bg-red-500/10 hover:bg-red-900/60 transition font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
      {modal && <Modal modalData={modal} />}
    </>
  );
};

export default Sidebar;
