import { useState } from "react";
import { Users, UserCheck, Clock, UserX, Search } from "lucide-react";
import StatsGrid from "../shared/StatsGrid";
import Pagination from "../shared/Pagination";

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);

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
    {
      id: 6,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      joinDate: "2024-01-08",
      coursesEnrolled: 10,
      status: "active",
      lastActive: "5 hours ago",
    },
    {
      id: 7,
      name: "David Lee",
      email: "david.lee@example.com",
      joinDate: "2024-01-12",
      coursesEnrolled: 7,
      status: "pending",
      lastActive: "1 day ago",
    },
  ];

  // Filter students based on search and status
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

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
    if (selectedUsers.length === currentStudents.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentStudents.map((user) => user.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for users:`, selectedUsers);
    // Reset selection after action
    setSelectedUsers([]);
  };

  const handleEditUser = (user) => {
    console.log("Edit user:", user);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      console.log("Delete user:", userId);
    }
  };

  const handleSuspendUser = (userId) => {
    console.log("Suspend user:", userId);
  };

  const handleActivateUser = (userId) => {
    console.log("Activate user:", userId);
  };

  const studentStats = [
    {
      value: students.length,
      label: "Total Students",
      color: "blue",
      icon: Users,
    },
    {
      value: students.filter((s) => s.status === "active").length,
      label: "Active Students",
      color: "green",
      icon: UserCheck,
    },
    {
      value: students.filter((s) => s.status === "pending").length,
      label: "Pending Students",
      color: "yellow",
      icon: Clock,
    },
    {
      value: students.filter((s) => s.status === "suspended").length,
      label: "Suspended Students",
      color: "red",
      icon: UserX,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Student Management</h1>
        <p className="text-slate-400 mt-2">
          Manage all students and their accounts
        </p>
      </div>

      {/* Stats Cards */}
      <StatsGrid stats={studentStats} />

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-blue-700">
          <div className="flex items-center justify-between">
            <div className="text-blue-400 font-medium">
              {selectedUsers.length} student(s) selected
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction("activate")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Activate Selected
              </button>
              <button
                onClick={() => handleBulkAction("suspend")}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Suspend Selected
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
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
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Add Student Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            + Add New Student
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === currentStudents.length &&
                      currentStudents.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Courses Enrolled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Last Active
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
              {currentStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-750 transition-colors"
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(student.id)}
                      onChange={() => handleSelectUser(student.id)}
                      className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-slate-300 font-semibold">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-white">
                          {student.name}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    <div className="text-center font-medium">
                      {student.coursesEnrolled}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {new Date(student.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        student.status
                      )} text-white`}
                    >
                      {getStatusText(student.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(student)}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        Edit
                      </button>
                      {student.status === "active" ||
                      student.status === "pending" ? (
                        <button
                          onClick={() => handleSuspendUser(student.id)}
                          className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivateUser(student.id)}
                          className="text-green-400 hover:text-green-300 text-sm font-medium"
                        >
                          Activate
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(student.id)}
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
        {currentStudents.length === 0 && (
          <div className="flex flex-col items-center py-12 gap-y-2">
            <div className="text-4xl">
              <Users />
            </div>
            <h3 className="text-lg font-medium text-white ">
              No students found
            </h3>
            <p className="text-slate-400">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search terms or filters"
                : "No students found in the system"}
            </p>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredStudents.length}
          itemsPerPage={studentsPerPage}
          itemName="students" // 👈 Ye change karo
        />
      </div>
    </div>
  );
};

export default StudentManagement;
