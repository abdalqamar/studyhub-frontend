import { useCallback, useEffect, useState } from "react";
import { Users, UserCheck, Clock, UserX } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import StatsGrid from "@/shared/components/DashboardStatsGrid";
import Pagination from "@/shared/components/Pagination";
import { useInstructorStudents } from "../hooks/useInstructorStudents";
import LoadingSpinner from "@/shared/layout/LoadingSpinner";
import ErrorPage from "@/shared/ui/ErrorPage";
import SearchBar from "@/shared/layout/SearchBar";
import PageLoader from "@/shared/ui/PageLoader";
import StudentsTable from "./StudentsTable";

const StudentManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const { data, isLoading, isError } = useInstructorStudents({
    search: debouncedSearch,
    status: statusFilter,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const users = data?.users || [];
  const pagination = data?.pagination;

  const studentStats = [
    {
      value: pagination?.total ?? users.length,
      label: "Total Students",
      color: "blue",
      icon: Users,
    },
    {
      value: users.filter((s) => s.status === "active").length,
      label: "Active Students",
      color: "gold",
      icon: UserCheck,
    },
    {
      value: users.filter((s) => s.status === "inactive").length,
      label: "Inactive Students",
      color: "slate",
      icon: Clock,
    },
    {
      value: users.filter((s) => s.status === "suspended").length,
      label: "Suspended Students",
      color: "red",
      icon: UserX,
    },
  ];

  const updateSearchParams = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          if (value) params.set(key, value);
          else params.delete(key);
        });
        return params;
      });
    },
    [setSearchParams]
  );

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      setCurrentPage(1);
      updateSearchParams({ search: value, page: "1" });
    },
    [updateSearchParams]
  );

  const handleStatusChange = useCallback(
    (status) => {
      setStatusFilter(status);
      setCurrentPage(1);
      updateSearchParams({ status, page: "1" });
    },
    [updateSearchParams]
  );

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      updateSearchParams({ page: String(page) });
    },
    [updateSearchParams]
  );

  const handleRemoveStudent = (id) => {
    window.alert("You Want to remove this user ", id);
  };

  if (isError) {
    return (
      <ErrorPage
        error={"An error occurred while fetching students."}
        onRetry={""}
        onGoBack={""}
      />
    );
  }
  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-bg text-text-1">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-text-1">
          Student Management
        </h1>
        <p className="text-[13.5px] text-text-3 mt-1">
          Manage all students and their accounts
        </p>
      </div>

      {/* Stats Cards */}
      <StatsGrid stats={studentStats} />

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 my-[18px]">
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Students..."
        />

        <select
          value={statusFilter}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="lg:w-48 bg-surface-2 border border-border-strong rounded-lg px-4 py-2.5 text-text-1 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="bg-surface rounded-[14px] border border-border overflow-hidden">
        {users.length > 0 ? (
          <>
            <StudentsTable
              users={users}
              handleRemoveStudent={handleRemoveStudent}
            />

            {pagination?.totalPages > 1 && (
              <div className="px-6 pb-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 rounded-full bg-surface-2 flex items-center justify-center mb-4">
              <Users className="w-10 h-10 text-text-3" />
            </div>
            <h3 className="text-lg font-semibold text-text-1 mb-2">
              No students found
            </h3>
            <p className="text-text-3 text-center max-w-md text-sm">
              {searchTerm || statusFilter
                ? "Try adjusting your search terms or filters to find students"
                : "No students have been added to the system yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;
