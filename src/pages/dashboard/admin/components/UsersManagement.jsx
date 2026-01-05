import { useState } from "react";
import { Users, UserCheck, GraduationCap, Search } from "lucide-react";
import StatsGrid from "../../shared/StatsGrid";
import Pagination from "../../shared/Pagination";

const UsersManagement = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);

  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      joinDate: "2024-01-15",
      coursesEnrolled: 12,
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      joinDate: "2024-01-10",
      coursesEnrolled: 8,
      status: "active",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      joinDate: "2024-01-05",
      coursesEnrolled: 15,
      status: "suspended",
      lastActive: "1 week ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      joinDate: "2024-01-02",
      coursesEnrolled: 6,
      status: "active",
      lastActive: "3 hours ago",
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex.brown@example.com",
      joinDate: "2023-12-28",
      coursesEnrolled: 3,
      status: "inactive",
      lastActive: "2 weeks ago",
    },
  ];

  const instructors = [
    {
      id: 1,
      name: "Dr. Robert Smith",
      email: "robert.smith@example.com",
      joinDate: "2023-11-15",
      coursesCreated: 8,
      totalStudents: 1247,
      status: "active",
      rating: 4.8,
      earnings: 24500,
    },
    {
      id: 2,
      name: "Prof. Maria Garcia",
      email: "maria.garcia@example.com",
      joinDate: "2023-12-01",
      coursesCreated: 5,
      totalStudents: 892,
      status: "active",
      rating: 4.9,
      earnings: 18700,
    },
    {
      id: 3,
      name: "David Wilson",
      email: "david.wilson@example.com",
      joinDate: "2024-01-10",
      coursesCreated: 2,
      totalStudents: 156,
      status: "pending",
      rating: 4.7,
      earnings: 3200,
    },
    {
      id: 4,
      name: "Lisa Chen",
      email: "lisa.chen@example.com",
      joinDate: "2023-10-20",
      coursesCreated: 12,
      totalStudents: 2345,
      status: "active",
      rating: 4.6,
      earnings: 31200,
    },
  ];

  const allUsers = activeTab === "students" ? students : instructors;
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? user.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // ✅ Step 4: Get current page users (sliced data)
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // ✅ Handle search with page reset
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchTerm("");
    setSelectedUsers([]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "suspended":
        return "bg-red-500";
      case "inactive":
        return "bg-gray-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "suspended":
        return "Suspended";
      case "inactive":
        return "Inactive";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (
      selectedUsers.length === currentUsers.length &&
      currentUsers.length > 0
    ) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map((user) => user.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for users:`, selectedUsers);
    // API call would go here
  };

  const handleEditUser = (user) => {
    console.log("Edit user:", user);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("Delete user:", userId);
    }
  };

  const handleSuspendUser = (userId) => {
    console.log("Suspend user:", userId);
  };

  const adminStats = [
    {
      value: students.length,
      label: "Total Students",
      color: "blue",
      icon: GraduationCap,
    },
    {
      value: instructors.length,
      label: "Total Instructors",
      color: "green",
      icon: Users,
    },
    {
      value: students.filter((s) => s.status === "active").length,
      label: "Active Students",
      color: "yellow",
      icon: UserCheck,
    },
    {
      value: instructors.filter((i) => i.status === "active").length,
      label: "Active Instructors",
      color: "purple",
      icon: UserCheck,
    },
  ];

  return (
    <div>
      <StatsGrid stats={adminStats} />

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          {selectedUsers.length > 0 && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction("suspend")}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Suspend Selected ({selectedUsers.length})
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Delete Selected ({selectedUsers.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-slate-700 rounded-lg p-1">
            <button
              onClick={() => handleTabChange("students")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "students"
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Students ({students.length})
            </button>
            <button
              onClick={() => handleTabChange("instructors")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "instructors"
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Instructors ({instructors.length})
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            {/* Select Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === currentUsers.length &&
                      currentUsers.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  {activeTab === "students"
                    ? "Courses Enrolled"
                    : "Courses Created"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  {activeTab === "students" ? "Last Active" : "Total Students"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-750 transition-colors"
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-slate-300 font-semibold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-white">
                          {user.name}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {user.email}
                        </div>
                        <div className="text-slate-500 text-xs">
                          Joined: {user.joinDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {activeTab === "students"
                      ? user.coursesEnrolled
                      : user.coursesCreated}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {activeTab === "students"
                      ? user.lastActive
                      : user.totalStudents?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        user.status
                      )} text-white`}
                    >
                      {getStatusText(user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        Edit
                      </button>
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleSuspendUser(user.id)}
                          className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => console.log("Activate user:", user.id)}
                          className="text-green-400 hover:text-green-300 text-sm font-medium"
                        >
                          Activate
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-400 hover:text-red-300 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-white mb-2">
              No users found
            </h3>
            <p className="text-slate-400">
              {searchTerm
                ? "Try adjusting your search terms"
                : `No ${activeTab} found`}
            </p>
          </div>
        )}

        {/* Pagination - Show only if there are more users than per page */}
        {filteredUsers.length > usersPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={usersPerPage}
            itemName={activeTab}
          />
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
