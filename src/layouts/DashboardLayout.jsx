import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";
import DashboardNavbar from "../components/common/DashboardNavbar";
import Breadcrumb from "../components/Breadcrumb";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../hooks/useAuth";
import { clearAuth } from "../features/auth/authSlice";
import { errorToast, successToast } from "../utils/toastUtils";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { logoutMutation } = useAuth();
  const { profileQuery } = useProfile();
  const { data: user, isLoading } = profileQuery;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(clearAuth());
        successToast("You’ve been signed out. See you soon!");
        navigate("/login", { replace: true });
      },
      onError: () => {
        errorToast("Logout failed. Try again.");
      },
    });
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
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

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardNavbar
            user={user}
            handleLogout={handleLogout}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          {/* Breadcrumb Component */}
          <Breadcrumb />

          {/* Main Content*/}
          <main className="flex-1 overflow-y-auto bg-slate-900">
            <div className="p-6">
              <Outlet />
            </div>

            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
