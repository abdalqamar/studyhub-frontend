import { useState } from "react";
import CourseFilterBar from "../shared/CourseFilterBar";
import CourseTableRow from "../instructor/manageCourses/CourseTableRow";
import CourseModals from "../instructor/manageCourses/CourseModals";
import Pagination from "../shared/Pagination";

const CoursesManagement = ({
  userType,
  courses,
  categories,
  onCourseAction = () => {},
  onAddCourse = () => {},
}) => {
  // State
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);

  // Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rejectFeedback, setRejectFeedback] = useState("");

  const statusConfig = {
    approved: { text: "Active", color: "bg-green-500", badge: "✅" },
    published: { text: "Published", color: "bg-green-500", badge: "✅" },
    pending: { text: "Pending Review", color: "bg-yellow-500", badge: "⏳" },
    rejected: { text: "Rejected", color: "bg-red-500", badge: "❌" },
  };

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${course.instructor?.firstName} ${course.instructor?.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || course.category?._id === categoryFilter;

    const matchesStatus = activeTab === "all" || course.status === activeTab;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

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

  // // Tabs
  const tabs = [
    { id: "all", label: "All Courses", count: courses.length },
    {
      id: "approved",
      label: userType === "instructor" ? "Active" : "Published",
      count: courses.filter((course) => course.status === "approved").length,
    },
    {
      id: "pending",
      label: "Pending",
      count: courses.filter((c) => c.status === "pending").length,
    },
    {
      id: "rejected",
      label: "Rejected",
      count: courses.filter((c) => c.status === "rejected").length,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            {userType === "admin" ? "📚 All Courses" : "📚 Manage Courses"}
          </h1>
          <p className="text-slate-400 mt-1">
            {userType === "admin"
              ? "Manage all platform courses and their status"
              : "View, edit, and manage your created courses"}
          </p>
        </div>

        {userType === "instructor" && (
          <button
            onClick={onAddCourse}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center mt-4 md:mt-0 transition-colors"
          >
            <span className="mr-2">+</span> Add New Course
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`bg-slate-800 rounded-2xl p-5 border-l-4 border border-slate-700/50 transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] cursor-pointer ${
              activeTab === tab.id
                ? "border-l-blue-500 shadow-blue-900/20"
                : "border-l-slate-700"
            }`}
          >
            <div className="text-3xl font-extrabold text-blue-400 mb-1">
              {tab.count}
            </div>
            <div className="text-slate-400 text-sm font-medium">
              {tab.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <CourseFilterBar
        courses={courses}
        userType={userType}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
        setCurrentPage={setCurrentPage}
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
              {currentCourses.map((course) => (
                <CourseTableRow
                  key={course._id}
                  course={course}
                  userType={userType}
                  onAction={handleAction}
                  statusConfig={statusConfig}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-white mb-2">
              No courses found
            </h3>
            <p className="text-slate-400">
              {searchTerm || categoryFilter !== "all" || activeTab !== "all"
                ? "Try adjusting your search terms or filters"
                : userType === "admin"
                ? "No courses available in the system"
                : "You haven't created any courses yet"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredCourses.length > coursesPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredCourses.length}
            itemsPerPage={coursesPerPage}
            itemName="courses"
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
