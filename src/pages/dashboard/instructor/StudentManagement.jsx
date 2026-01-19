import { useEffect, useState } from "react";
import { Users, UserCheck, Clock, UserX, Search } from "lucide-react";
import StatsGrid from "../shared/StatsGrid";
import Pagination from "../shared/Pagination";
import StudentsTable from "./components/StudentsTable";
import { useInstructorStudents } from "../../../hooks/instructor/useInstructor";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import ErrorPage from "../../../components/ui/ErrorPage";
import SearchBar from "../../../components/common/SearchBar";

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(12);

  const { data, isLoading, isError } = useInstructorStudents({
    search: debouncedSearch,
    status: statusFilter,
    page: currentPage,
    limit: studentsPerPage,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const users = data?.users || [];
  const pagination = data?.pagination;

  const studentStats = [
    {
      value: users.length,
      label: "Total Students",
      color: "blue",
      icon: Users,
    },
    {
      value: users.filter((s) => s.status === "active").length,
      label: "Active Students",
      color: "green",
      icon: UserCheck,
    },
    {
      value: users.filter((s) => s.status === "inactive").length,
      label: "Inactive Students",
      color: "yellow",
      icon: Clock,
    },
    {
      value: users.filter((s) => s.status === "suspended").length,
      label: "Suspended Students",
      color: "red",
      icon: UserX,
    },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    setCurrentPage(1);
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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {isLoading && <LoadingSpinner />}
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Student Management</h1>
        <p className="text-slate-400 mt-2">
          Manage all students and their accounts
        </p>
      </div>

      {/* Stats Cards */}
      <StatsGrid stats={studentStats} />

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Students..."
        />

        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="lg:w-48 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        {users.length > 0 ? (
          <>
            <StudentsTable users={users} />

            {pagination?.totalPages > 1 && (
              <div className="px-6 pb-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 rounded-full bg-slate-700/50 flex items-center justify-center mb-4">
              <Users className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No students found
            </h3>
            <p className="text-slate-400 text-center max-w-md text-sm">
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
