import { useState } from "react";
import CourseFilterBar from "../shared/CourseFilterBar";
import CourseTableRow from "../instructor/manageCourses/CourseTableRow";
import CourseModals from "../instructor/manageCourses/CourseModals";
import Pagination from "../shared/Pagination";
import {
  BookOpen,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatsGrid from "./StatsGrid";
import { generateExcelReport } from "../../../utils/exportUtils";
import { errorToast, successToast } from "../../../utils/toastUtils";

const CoursesManagement = ({
  userType,
  courses,
  categories,
  searchTerm,
  onSearchChange,
  statusFilter,
  categoryFilter,
  onCategoryChange,
  currentPage,
  totalPages,
  onPageChange,
  onCourseAction,
  onStatusChange,
  onAddCourse,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rejectFeedback, setRejectFeedback] = useState("");

  const handleExcelDownload = () => {
    generateExcelReport(courses, successToast, errorToast);
  };

  // Handle Actions
  const handleAction = (action, course) => {
    setSelectedCourse(course);

    switch (action) {
      case "delete":
        setShowDeleteModal(true);
        break;
      case "feedback":
        setShowFeedbackModal(true);
        break;
      case "reject":
        setShowRejectModal(true);
        break;
      case "edit":
      case "preview":
      case "approve":
        onCourseAction(action, course);
        break;
      default:
        break;
    }
  };

  const handleConfirmDelete = () => {
    onCourseAction("delete", selectedCourse);
    setShowDeleteModal(false);
    setSelectedCourse(null);
  };

  const handleConfirmReject = () => {
    onCourseAction("reject", {
      ...selectedCourse,
      feedback: rejectFeedback,
    });
    setShowRejectModal(false);
    setRejectFeedback("");
    setSelectedCourse(null);
  };

  const handleCloseModal = (modalType) => {
    switch (modalType) {
      case "delete":
        setShowDeleteModal(false);
        break;
      case "feedback":
        setShowFeedbackModal(false);
        break;
      case "reject":
        setShowRejectModal(false);
        setRejectFeedback("");
        break;
    }
    setSelectedCourse(null);
  };

  // Table Headers
  const tableHeaders =
    userType === "admin"
      ? ["Course", "Instructor", "Students", "Rating", "Status", "Actions"]
      : ["Course", "Students", "Rating", "Status", "Actions"];

  const adminStats = [
    {
      value: courses?.length || 0,
      label: "Total Courses",
      color: "blue",
      icon: BookOpen,
    },
    {
      value: courses?.filter((c) => c.status === "approved").length,
      label: userType === "instructor" ? "Active" : "Published Courses",
      color: "green",
      icon: CheckCircle,
    },
    {
      value: courses?.filter((c) => c.status === "pending").length,
      label: "Pending Courses",
      color: "yellow",
      icon: Clock,
    },
    {
      value: courses?.filter((c) => c.status === "rejected").length,
      label: "Rejected Courses",
      color: "red",
      icon: XCircle,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-white">
              {userType === "admin" ? "All Courses" : "Manage Courses"}
            </h1>
            <p className="text-slate-400 mt-1">
              {userType === "admin"
                ? "Manage all platform courses and their status"
                : "View, edit, and manage your created courses"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Download Excel Button */}
            <button
              onClick={handleExcelDownload}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 whitespace-nowrap border border-green-500"
            >
              <Download className="h-4 w-4" />
              Download Excel
            </button>

            {/* Conditional Buttons */}
            {userType === "admin" && (
              <Link
                to={"/admin/category"}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 whitespace-nowrap border border-blue-500"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </Link>
            )}

            {userType === "instructor" && (
              <button
                onClick={onAddCourse}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 whitespace-nowrap border border-blue-500"
              >
                <Plus className="h-5 w-5" />
                Add New Course
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsGrid stats={adminStats} />

      {/* Filter Bar */}
      <CourseFilterBar
        userType={userType}
        statusFilter={statusFilter}
        onStatusChange={onStatusChange}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        categoryFilter={categoryFilter}
        onCategoryChange={onCategoryChange}
        categories={categories}
      />
      {/* Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {courses?.map((course) => (
                <CourseTableRow
                  key={course._id}
                  course={course}
                  userType={userType}
                  onAction={handleAction}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {courses?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No courses found
            </h3>
            <p className="text-slate-400 text-center max-w-md mb-6">
              {searchTerm || categoryFilter || statusFilter
                ? "Try adjusting your search terms or filters to find what you're looking for"
                : userType === "admin"
                  ? "No courses available in the system yet"
                  : "You haven't created any courses yet. Start by creating your first course!"}
            </p>
            {!searchTerm &&
              !categoryFilter &&
              !statusFilter &&
              userType !== "admin" && (
                <Link
                  to="/instructor/create-course"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                  Create Your First Course
                </Link>
              )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>

      {/* Modals */}
      <CourseModals
        showDeleteModal={showDeleteModal}
        showFeedbackModal={showFeedbackModal}
        showRejectModal={showRejectModal}
        selectedCourse={selectedCourse}
        rejectFeedback={rejectFeedback}
        setRejectFeedback={setRejectFeedback}
        onClose={handleCloseModal}
        onConfirmDelete={handleConfirmDelete}
        onConfirmReject={handleConfirmReject}
      />
    </div>
  );
};

export default CoursesManagement;
