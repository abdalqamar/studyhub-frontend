import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Download,
} from "lucide-react";
import { generateExcelReport } from "../utils/exportUtils";
import { errorToast, successToast } from "../utils/toastUtils";
import StatsGrid, { AccentColor } from "./DashboardStatsGrid";
import CourseFilterBar from "./CourseFilterBar";
import CourseTableRow from "@/features/instructor/components/manageCourses/CourseTableRow";
import Pagination from "./Pagination";
import CourseModals from "@/features/instructor/components/manageCourses/CourseModals";
import { Course, Category, CourseAction, UserRole } from "@/types";

type ModalType = "delete" | "feedback" | "reject";

interface CoursesManagementProps {
  userType: UserRole;
  courses: Course[];
  categories: Category[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  categoryFilter: string;
  onCategoryChange: (categoryId: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCourseAction: (action: string, course: Course | null) => void;
  onStatusChange: (status: string) => void;
  onAddCourse: () => void;
}

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
}: CoursesManagementProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [rejectFeedback, setRejectFeedback] = useState<string>("");

  const handleExcelDownload = (): void => {
    generateExcelReport(courses, successToast, errorToast);
  };

  const handleAction = (action: CourseAction, course: Course): void => {
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

  const handleConfirmDelete = (): void => {
    onCourseAction("delete", selectedCourse);
    setShowDeleteModal(false);
    setSelectedCourse(null);
  };

  const handleConfirmReject = (): void => {
    onCourseAction("reject", {
      ...selectedCourse,
      feedback: rejectFeedback,
    } as Course);
    setShowRejectModal(false);
    setRejectFeedback("");
    setSelectedCourse(null);
  };

  const handleCloseModal = (modalType: ModalType): void => {
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

  const tableHeaders: string[] =
    userType === "admin"
      ? ["Course", "Instructor", "Students", "Rating", "Status", "Actions"]
      : ["Course", "Students", "Rating", "Status", "Actions"];

  const adminStats = [
    {
      value: courses?.length || 0,
      label: "Total Courses",
      color: "blue" as AccentColor,
      icon: BookOpen,
    },
    {
      value: courses?.filter((c) => c.status === "approved").length,
      label: userType === "instructor" ? "Active" : "Published Courses",
      color: "green" as AccentColor,
      icon: CheckCircle,
    },
    {
      value: courses?.filter((c) => c.status === "pending").length,
      label: "Pending Courses",
      color: "yellow" as AccentColor,
      icon: Clock,
    },
    {
      value: courses?.filter((c) => c.status === "rejected").length,
      label: "Rejected Courses",
      color: "red" as AccentColor,
      icon: XCircle,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-white">
              {userType === "admin" ? "All Courses" : "Manage Courses"}
            </h1>
            <p className="text-text-2 mt-1">
              {userType === "admin"
                ? "Manage all platform courses and their status"
                : "View, edit, and manage your created courses"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExcelDownload}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 whitespace-nowrap border border-green-500"
            >
              <Download className="h-4 w-4" />
              Download Excel
            </button>

            {userType === "admin" && (
              <Link
                to={"/admin/category"}
                className="flex items-center gap-2 bg-gold hover:bg-gold-dim text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 whitespace-nowrap border border-gold"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </Link>
            )}

            {userType === "instructor" && (
              <button
                onClick={onAddCourse}
                className="flex items-center gap-2 bg-gold hover:bg-gold-dim text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 whitespace-nowrap border border-gold"
              >
                <Plus className="h-5 w-5" />
                Add New Course
              </button>
            )}
          </div>
        </div>
      </div>

      <StatsGrid stats={adminStats} />

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

      <div className="bg-surface-2 rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-2">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-text-2 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
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

        {courses?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-gold" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No courses found
            </h3>
            <p className="text-text-2 text-center max-w-md mb-6">
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
                  className="flex items-center gap-2 bg-gold hover:bg-gold-dim text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                  Create Your First Course
                </Link>
              )}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>

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
