import { useCallback, useEffect, useState } from "react";
import { UserCheck, GraduationCap, Ban, User } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  useDeleteUser,
  useUpdateUserStatus,
} from "../hooks/useUpdateUserStatus";
import { useAdminUsers } from "../hooks/useAdminUsers";
import ErrorPage from "@/shared/ui/ErrorPage";
import LoadingSpinner from "@/shared/layout/LoadingSpinner";
import UserTable from "./UserTable";
import Pagination from "@/shared/components/Pagination";
import StatsGrid from "@/shared/components/DashboardStatsGrid";
import SearchBar from "@/shared/layout/SearchBar";
import TabsFilter from "@/shared/components/TabsFilter";

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
      color: "blue", // ← "blue" se "gold" nahi, taaki Active se alag dikhe
      icon: GraduationCap,
    },
    {
      value: users.filter((u) => u.status === "active").length,
      label: isStudentTab ? "Active Students" : "Active Instructors",
      color: "gold",
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

      <div className="bg-surface rounded-[14px] border border-border overflow-hidden mt-[18px]">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-1 bg-surface-2 border border-border rounded-xl p-1">
              <button
                onClick={() => handleTabChange("students")}
                className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap ${
                  activeTab === "students"
                    ? "bg-gold text-bg font-semibold"
                    : "text-text-2 hover:text-text-1"
                }`}
              >
                Students
              </button>
              <button
                onClick={() => handleTabChange("instructors")}
                className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap ${
                  activeTab === "instructors"
                    ? "bg-gold text-bg font-semibold"
                    : "text-text-2 hover:text-text-1"
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
                className="w-full sm:w-40 bg-surface-2 border border-border-strong rounded-xl px-3.5 py-2.5 text-text-2 text-[13.5px] outline-none focus:ring-2 focus:ring-gold transition-all cursor-pointer"
              >
                <option value="">All status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        <UserTable
          users={users}
          isStudentTab={isStudentTab}
          handleDeleteUser={handleDeleteUser}
          handleToggleUserStatus={handleToggleUserStatus}
        />

        {users.length === 0 && (
          <div className="text-center py-12 text-text-3 text-sm">
            No users found
          </div>
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
