import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProfile } from "@/features/profile/hooks/useProfile";
import Sidebar from "@/shared/layout/Sidebar";
import DashboardNavbar from "@/shared/layout/DashboardNavbar";
import Breadcrumb from "@/shared/components/Breadcrumb";
import Footer from "@/shared/layout/Footer";
import { errorToast, successToast } from "@/shared/utils/toastUtils";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { logoutMutation } = useAuth();

  const { profileQuery, clearProfile } = useProfile();

  const { data: user } = profileQuery;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearAuth();

        clearProfile();

        successToast("You've been signed out. See you soon!");

        navigate("/login", {
          replace: true,
        });
      },

      onError: () => {
        errorToast("Logout failed. Try again.");
      },
    });
  };

  return (
    <div
      className="flex h-screen overflow-hidden bg-bg text-text-1"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 0%, rgba(212,165,55,0.05), transparent 40%), radial-gradient(circle at 85% 100%, rgba(45,212,191,0.04), transparent 40%)",
      }}
    >
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        user={user}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <DashboardNavbar
          user={user}
          handleLogout={handleLogout}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Breadcrumb Component */}
        <Breadcrumb />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-bg">
          <div className="pt-[26px] px-5 sm:px-8 pb-[60px]">
            <Outlet />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
