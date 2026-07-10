import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Menu, BookOpen } from "lucide-react";
import { useCourseContent } from "@/features/courses/hooks";
import ViewCourseSidebar from "./ViewCourseSidebar";

const ViewCourseLayout = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { data: course, error } = useCourseContent(courseId);

  const handleBackToCourses = () => {
    navigate("/student/my-courses");
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface">
        <div className="text-center p-8 bg-surface-2 rounded-2xl border border-border">
          <div className="w-14 h-14 bg-danger-soft rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-danger" size={22} />
          </div>
          <h2 className="font-display text-xl font-bold text-text-1 mb-2">
            Course not found
          </h2>
          <p className="text-text-2 text-sm mb-6">
            We couldn't load the course content.
          </p>
          <button
            onClick={handleBackToCourses}
            className="px-5 py-2.5 bg-gold hover:bg-gold-dim text-bg font-semibold rounded-xl transition-colors duration-200"
          >
            Back to courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <ViewCourseSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        course={course}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-surface-2 border-b border-border px-5 py-3.5 flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center bg-surface border border-border-strong text-text-2 hover:text-text-1 rounded-lg transition-colors"
          >
            <Menu size={18} />
          </button>

          <button
            onClick={handleBackToCourses}
            className="flex items-center gap-2 py-2 px-3.5 text-text-2 hover:text-gold border border-border-strong hover:border-gold-dim bg-surface font-medium text-[13px] rounded-lg transition-all duration-200"
          >
            <ArrowLeft size={16} />
            Back to courses
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex items-center gap-2 px-3.5 py-2 text-text-2 hover:text-gold border border-border-strong hover:border-gold-dim bg-surface font-medium text-[13px] rounded-lg transition-all duration-200"
          >
            <Menu size={16} />
            {isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
          </button>

          <div className="flex-1" />
        </div>

        <main className="flex-1 overflow-y-auto p-6 bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ViewCourseLayout;
