import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronDown,
  Play,
  Clock,
  MessageSquare,
  X,
  CheckCircle,
} from "lucide-react";

import ReviewModal from "../../../../components/ReviewModal";
import LoaderButton from "../../../../shared/ui/LoaderButton";

const ViewCourseSidebar = ({ isSidebarOpen, setIsSidebarOpen, course }) => {
  const [expandedSection, setExpandedSection] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const navigate = useNavigate();
  const { lessonId, courseId } = useParams();

  const activeLessonRef = useRef(null);

  useEffect(() => {
    if (activeLessonRef.current) {
      activeLessonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [lessonId]);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? -1 : index);
  };

  const handleLessonClick = (sectionId, lessonId) => {
    navigate(
      `/student/view-course/${courseId}/sections/${sectionId}/lessons/${lessonId}`
    );

    if (window.matchMedia("(max-width: 1023px)").matches) {
      setIsSidebarOpen(false);
    }
  };
  const handleReviewClick = () => {
    setShowReviewModal(true);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setIsSidebarOpen(false);
    }
  };

  // Calculate total progress and stats
  const totalLessons =
    course?.courseContent?.reduce(
      (total, section) => total + (section.lesson?.length || 0),
      0
    ) || 0;

  const completedLessons =
    course?.courseContent?.reduce(
      (total, section) =>
        total +
        (section.lesson?.filter((lesson) => lesson.isCompleted)?.length || 0),
      0
    ) || 0;

  return (
    <>
      {/* Mobile Overlay  */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`${
          isSidebarOpen
            ? "w-80 translate-x-0"
            : "w-0 -translate-x-full lg:translate-x-0 lg:w-0"
        } fixed lg:relative bg-surface-2 border-r border-border transition-all duration-300 ease-in-out h-screen lg:h-auto z-50 flex flex-col overflow-hidden shadow-2xl`}
      >
        <div className="w-80 flex flex-col h-full">
          <div className="p-5 border-b border-border flex-shrink-0 bg-surface-2 sticky top-0">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-extrabold text-slate-100 pr-4 leading-snug line-clamp-2">
                {course?.title || "Course Content"}
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-surface-2 rounded-full transition-colors flex-shrink-0"
                aria-label="Close sidebar"
              >
                <X size={20} className="text-text-2" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3 w-full">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-2 font-medium">
                  Your Progress
                </span>
                <span className="font-semibold text-teal-400">
                  {course?.progressPercentage || 0}%
                </span>
              </div>
              <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-gold transition-all duration-500 ease-out"
                  style={{ width: `${course?.progressPercentage || 0}%` }}
                />
              </div>
              <div className="text-xs text-text-3 flex justify-between">
                <span>
                  {completedLessons} of {totalLessons} lessons completed
                </span>
              </div>
            </div>
          </div>

          {/* Sections List (Scrollable Middle) */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-2 
              [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent 
              [&::-webkit-scrollbar-thumb]:bg-surface-2 [&::-webkit-scrollbar-thumb]:rounded-full 
              hover:[&::-webkit-scrollbar-thumb]:bg-surface-2"
          >
            {course?.courseContent?.map((section, idx) => (
              <div
                key={section._id}
                className="border-b border-border last:border-b-0"
              >
                {/* Section Header (Accordion Trigger) */}
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between p-3 py-4 hover:bg-surface-2 rounded-lg transition-colors text-left group"
                  aria-expanded={expandedSection === idx}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-bold text-text-2 text-sm">
                      {idx + 1}. {section.sectionName}
                    </h3>
                    <p className="text-xs text-text-3 mt-0.5">
                      {section.lesson?.length} lessons
                    </p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-text-3 transition-transform flex-shrink-0 ${
                      expandedSection === idx ? "rotate-180 text-gold" : ""
                    }`}
                  />
                </button>

                {/* Lessons */}
                {expandedSection === idx && (
                  <div className="mt-1 pb-2 space-y-1">
                    {section.lesson?.map((lesson) => {
                      const isActive = lessonId === lesson._id;
                      const isCompleted = lesson.isCompleted;

                      return (
                        <button
                          key={lesson._id}
                          ref={isActive ? activeLessonRef : null}
                          onClick={() =>
                            handleLessonClick(section._id, lesson._id)
                          }
                          className={`w-full text-left p-3 rounded-lg text-sm transition-all flex items-start gap-2 ${
                            isActive
                              ? "bg-gold/20 border border-teal-500/50 text-gold font-semibold"
                              : "text-text-2 hover:bg-surface-2/80"
                          }`}
                        >
                          {/* Lesson Icon */}
                          <div
                            className={`pt-0.5 flex-shrink-0 ${
                              isCompleted ? "text-green-400" : "text-text-3"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle size={16} fill="currentColor" />
                            ) : (
                              <Play size={16} />
                            )}
                          </div>

                          {/* Lesson Details */}
                          <div className="flex-1 min-w-0">
                            <p className="truncate leading-snug">
                              {lesson.title}
                            </p>
                            <p className="text-xs opacity-70 flex items-center gap-1 mt-0.5 text-text-3">
                              <Clock size={12} />
                              {lesson.duration}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border flex-shrink-0 bg-surface-2 sticky bottom-0">
            <LoaderButton
              onClick={handleReviewClick}
              text="Add Review"
              type="button"
              icon={MessageSquare}
              className="w-full bg-gold hover:bg-gold-dim text-white"
            />
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          setShowReviewModal={setShowReviewModal}
          courseId={courseId}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </>
  );
};

export default ViewCourseSidebar;
