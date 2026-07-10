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
import LoaderButton from "@/shared/ui/LoaderButton";
import ReviewModal from "@/features/courses/components/ReviewModal";

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
    if (window.matchMedia("(max-width: 1023px)").matches)
      setIsSidebarOpen(false);
  };

  const handleReviewClick = () => {
    setShowReviewModal(true);
    if (window.matchMedia("(max-width: 1023px)").matches)
      setIsSidebarOpen(false);
  };

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
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`${
          isSidebarOpen
            ? "w-80 translate-x-0"
            : "w-0 -translate-x-full lg:translate-x-0 lg:w-0"
        } fixed lg:relative bg-surface-2 border-r border-border transition-all duration-300 ease-in-out h-screen lg:h-auto z-50 flex flex-col overflow-hidden`}
      >
        <div className="w-80 flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b border-border flex-shrink-0 bg-surface-2 sticky top-0">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-text-1 pr-4 leading-snug line-clamp-2">
                {course?.title || "Course Content"}
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden w-8 h-8 flex items-center justify-center border border-border-strong text-text-2 hover:text-text-1 rounded-lg transition-colors flex-shrink-0"
                aria-label="Close sidebar"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-text-3">
                  Your progress
                </span>
                <span className="text-xs font-mono font-semibold text-teal">
                  {course?.progressPercentage || 0}%
                </span>
              </div>
              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${course?.progressPercentage || 0}%` }}
                />
              </div>
              <p className="text-[10.5px] font-mono text-text-3">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>
          </div>

          {/* Sections */}
          <div
            className="flex-1 overflow-y-auto p-3 space-y-1.5
              [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-surface-raised [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {course?.courseContent?.map((section, idx) => {
              const isOpen = expandedSection === idx;
              return (
                <div
                  key={section._id}
                  className="bg-surface rounded-xl border border-border-strong overflow-hidden hover:border-gold-dim transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleSection(idx)}
                    className="w-full flex items-center justify-between p-3 hover:bg-surface-raised transition-colors text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <h3 className="font-medium text-text-1 text-[13px]">
                        {idx + 1}. {section.sectionName}
                      </h3>
                      <p className="text-[10.5px] font-mono text-text-3 mt-0.5">
                        {section.lesson?.length} lessons
                      </p>
                    </div>
                    <ChevronDown
                      size={15}
                      className={`text-text-3 transition-transform flex-shrink-0 ${isOpen ? "rotate-180 text-gold" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-border-strong">
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
                            className={`w-full text-left p-3 text-sm transition-colors duration-150 flex items-start gap-2.5 border-b border-border-strong last:border-b-0 ${
                              isActive
                                ? "bg-gold-soft text-gold font-medium"
                                : "text-text-2 hover:bg-surface-raised"
                            }`}
                          >
                            <div
                              className={`pt-0.5 flex-shrink-0 ${isCompleted ? "text-teal" : "text-text-3"}`}
                            >
                              {isCompleted ? (
                                <CheckCircle size={14} fill="currentColor" />
                              ) : (
                                <Play size={14} />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="truncate leading-snug text-[13px]">
                                {lesson.title}
                              </p>
                              <p className="text-[10.5px] font-mono text-text-3 flex items-center gap-1 mt-0.5">
                                <Clock size={11} />
                                {lesson.duration}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t border-border flex-shrink-0 bg-surface-2 sticky bottom-0">
            <LoaderButton
              onClick={handleReviewClick}
              text="Add review"
              type="button"
              icon={MessageSquare}
              className="w-full bg-gold hover:bg-gold-dim text-bg"
            />
          </div>
        </div>
      </div>

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
