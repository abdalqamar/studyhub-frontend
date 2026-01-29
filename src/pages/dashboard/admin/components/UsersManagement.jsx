import { useCallback, useEffect, useState } from "react";
import { UserCheck, GraduationCap, Ban, User } from "lucide-react";
import StatsGrid from "../../shared/StatsGrid";
import Pagination from "../../shared/Pagination";
import { useAdminUsers } from "../../../../hooks/admin/useAdminUsers";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import UserTable from "./UserTable";
import ErrorPage from "../../../../components/ui/ErrorPage";
import SearchBar from "../../../../components/common/SearchBar";
import { useSearchParams } from "react-router-dom";
import {
  useDeleteUser,
  useUpdateUserStatus,
} from "../../../../hooks/admin/useUpdateUserStatus";

const UsersManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "students"
  );

  // Initialize state from URL params
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || ""
  );

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  const ITEMS_PER_PAGE = 12;

  const updateUserStatus = useUpdateUserStatus();
  const deleteUser = useDeleteUser();

  const role = activeTab === "students" ? "student" : "instructor";

  const { data, isLoading, isError } = useAdminUsers({
    role,
    search: debouncedSearch,
    status: statusFilter,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const users = data?.users || [];
  const pagination = data?.pagination;

  // Update URL params helper
  const updateSearchParams = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        Object.entries(updates).forEach(([key, value]) => {
          if (value) {
            params.set(key, value);
          } else {
            params.delete(key);
          }
        });

        return params;
      });
    },
    [setSearchParams]
  );

  // Handlers
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      setCurrentPage(1);
      updateSearchParams({ search: value, page: "1" });
    },
    [updateSearchParams]
  );

  // Status filter change
  const handleStatusChange = useCallback(
    (status) => {
      setStatusFilter(status);
      setCurrentPage(1);
      updateSearchParams({ status, page: "1" });
    },
    [updateSearchParams]
  );

  // Page change
  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      updateSearchParams({ page: String(page) });
    },
    [updateSearchParams]
  );

  // Tab change (students/instructors)
  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      setSearchTerm("");
      setStatusFilter("");
      setCurrentPage(1);
      updateSearchParams({ tab, page: "1" });
    },
    [updateSearchParams]
  );

  const handleToggleUserStatus = (user) => {
    const newStatus = user.status === "suspended" ? "active" : "suspended";

    const confirmed = window.confirm(
      `Are you sure you want to ${
        newStatus === "suspended" ? "suspend" : "activate"
      } this user?`
    );

    if (!confirmed) return;

    updateUserStatus.mutate({
      userId: user._id,
      status: newStatus,
    });
  };

  const handleDeleteUser = (user) => {
    deleteUser.mutate(user._id);
  };

  const isStudentTab = activeTab === "students";

  const adminStats = [
    {
      value: pagination?.total || 0,
      label: isStudentTab ? "Total Students" : "Total Instructors",
      color: "blue",
      icon: GraduationCap,
    },
    {
      value: users.filter((u) => u.status === "active").length,
      label: isStudentTab ? "Active Students" : "Active Instructors",
      color: "yellow",
      icon: UserCheck,
    },
    {
      value: users.filter((u) => u.status === "inactive").length,
      label: isStudentTab ? "Inactive Students" : "Inactive Instructors",
      color: "slate",
      icon: User,
    },
    {
      value: users.filter((u) => u.status === "suspended").length,
      label: isStudentTab ? "Suspended Students" : "Suspended Instructors",
      color: "red",
      icon: Ban,
    },
  ];

  if (isError) {
    return (
      <ErrorPage
        error={"An error occurred while fetching users."}
        onRetry={""}
        onGoBack={""}
      />
    );
  }

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <StatsGrid stats={adminStats} />

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="inline-flex bg-slate-900 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => handleTabChange("students")}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "students"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Students
              </button>
              <button
                onClick={() => handleTabChange("instructors")}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "instructors"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Instructors
              </button>
            </div>

            <div className="flex gap-3">
              <SearchBar
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search users..."
              />

              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* // user table */}
        <UserTable
          users={users}
          isStudentTab={isStudentTab}
          handleDeleteUser={handleDeleteUser}
          handleToggleUserStatus={handleToggleUserStatus}
        />

        {users.length === 0 && (
          <div className="text-center py-12 text-slate-400">No users found</div>
        )}

        {pagination?.totalPages > 1 && (
          <div className="px-6 pb-6">
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
