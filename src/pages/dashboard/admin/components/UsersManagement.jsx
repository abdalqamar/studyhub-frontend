import { useEffect, useState } from "react";
import { UserCheck, GraduationCap, Search, Ban, User } from "lucide-react";
import StatsGrid from "../../shared/StatsGrid";
import Pagination from "../../shared/Pagination";
import { useAdminUsers } from "../../../../hooks/admin/useAdminUsers";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import UserTable from "./UserTable";
import ErrorPage from "../../../../components/ui/ErrorPage";
import SearchBar from "../../../../components/common/SearchBar";
import {
  useDeleteUser,
  useUpdateUserStatus,
} from "../../../../hooks/admin/useUpdateUserStatus";

const UsersManagement = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const updateUserStatus = useUpdateUserStatus();
  const deleteUser = useDeleteUser();

  const role = activeTab === "students" ? "student" : "instructor";

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter]);

  const { data, isLoading, isError } = useAdminUsers({
    role,
    search: debouncedSearch,
    status: statusFilter,
    page: currentPage,
    limit: usersPerPage,
  });

  const users = data?.users || [];
  const pagination = data?.pagination;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchTerm("");
    setStatusFilter("");
  };

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
                onChange={handleStatusChange}
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
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
