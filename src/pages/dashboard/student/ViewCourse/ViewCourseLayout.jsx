import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ViewCourseSidebar from "./ViewCourseSidebar";
import { useCourseContent } from "../../../../hooks/useCourses";
import { ArrowLeft, Menu, BookOpen } from "lucide-react";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

const ViewCourseLayout = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { data: course, isLoading, error } = useCourseContent(courseId);

  const handleBackToCourses = () => {
    navigate("/student/my-courses");
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="text-center p-8 bg-slate-800 rounded-xl border border-slate-700">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-red-400" size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-100 mb-2">
            Course Not Found
          </h2>
          <p className="text-slate-400 mb-6">
            We couldn't load the course content.
          </p>
          <button
            onClick={handleBackToCourses}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900">
      {isLoading && <LoadingSpinner />}
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <ViewCourseSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        course={course}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center  gap-4 ">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <Menu size={20} />
          </button>

          <button
            onClick={handleBackToCourses}
            className="flex items-center gap-2 py-2 px-4 text-white hover:text-blue-300 border border-blue-500/30  hover:border-blue-400/40 bg-slate-800 hover:bg-slate-800/80 font-semibold rounded-lg transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex items-center gap-2 px-4 py-2 text-white hover:text-blue-300 border border-blue-500/30  hover:border-blue-400/40 bg-slate-800 hover:bg-slate-800/80 font-semibold rounded-lg transition-all duration-300"
          >
            <Menu size={18} />
            {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>

          <div className="flex-1" />
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ViewCourseLayout;
