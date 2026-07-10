import { useNavigate, useParams } from "react-router-dom";
import {
  Play,
  Clock,
  FileText,
  CheckCircle,
  Download,
  BookOpen,
} from "lucide-react";
import { useCourseContent } from "@/features/courses/hooks/useCourseContent";
import LoadingSpinner from "@/shared/layout/LoadingSpinner";
import { useCallback, useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import { downloadNotesAsPDF } from "@/shared/utils/downloadNotes";

const ViewCoursePage = () => {
  const { courseId, sectionId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showNotes, setShowNotes] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [watchProgress, setWatchProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const { data: course, isLoading, isError } = useCourseContent(courseId);

  useEffect(() => {
    if (!course) return;
    const firstSection = course.courseContent?.[0];
    const firstLesson = firstSection?.lesson?.[0];
    if (!sectionId || !lessonId) {
      navigate(
        `/student/view-course/${courseId}/sections/${firstSection._id}/lessons/${firstLesson._id}`,
        { replace: true }
      );
    }
  }, [course, sectionId, lessonId, navigate, courseId]);

  useEffect(() => {
    setWatchProgress(0);
    setVideoDuration(0);
    setUserNotes("");
  }, [lessonId]);

  const currentSection = course?.courseContent?.find(
    (section) => section._id === sectionId
  );
  const currentLesson = currentSection?.lesson?.find(
    (lesson) => lesson._id === lessonId
  );

  const handleProgressUpdate = useCallback((currentTime, totalDuration) => {
    setWatchProgress(currentTime);
    setVideoDuration(totalDuration);
  }, []);

  const progressPercentage =
    videoDuration > 0
      ? Math.min(100, Math.floor((watchProgress / videoDuration) * 100))
      : 0;

  const handleMarkComplete = () => {
    if (watchProgress === 0 || videoDuration === 0)
      return errorToast("Please play the video first!");
    if (progressPercentage < 5)
      return errorToast("Please watch at least 5% of the video");
    // TODO: backend call S
    successToast("Lesson marked as complete!");
  };

  const handleDownloadNotes = () => {
    downloadNotesAsPDF({ userNotes, currentLesson, currentSection });
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-red-400" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-2">
            Failed to Load
          </h3>
          <p className="text-slate-400">
            Unable to load course content. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Play className="text-blue-400" size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-100 mb-3">
          Welcome to the Course!
        </h3>
        <p className="text-slate-400 max-w-md">
          Select a lesson from the sidebar to start your learning journey.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-8">
      {isLoading && <LoadingSpinner />}
      <div className="rounded-2xl overflow-hidden bg-slate-800 shadow-2xl border border-slate-700">
        <div className="w-full bg-black aspect-video h-full overflow-hidden rounded-2xl">
          <VideoPlayer
            src={currentLesson?.videoUrl || ""}
            onProgressUpdate={handleProgressUpdate}
          />
        </div>
        <div className="p-4 bg-slate-750 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-400" />
                <span>{currentLesson?.duration || "00:00"}</span>
              </div>
              {currentLesson?.isCompleted && (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={16} className="text-green-400" />
                  <span>Completed</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
            >
              <FileText size={16} />
              {showNotes ? "Close Notes" : "Open Notes"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                {currentLesson?.title}
              </h1>
              <p className="text-slate-400 text-lg mb-4">
                Section: {currentSection?.sectionName}
              </p>
              <div className="flex items-center gap-6 text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-blue-400" />
                  <span>{currentLesson?.duration}</span>
                </div>
                {currentLesson?.difficulty && (
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentLesson.difficulty === "beginner"
                        ? "bg-green-500/20 text-green-400"
                        : currentLesson.difficulty === "intermediate"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {currentLesson.difficulty}
                  </div>
                )}
              </div>
            </div>
            <hr className="border-slate-700 my-6" />
            <div>
              <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-blue-400" />
                About this lecture
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                {currentLesson?.description ||
                  "This lecture covers important concepts and best practices."}
              </p>
            </div>
          </div>

          {showNotes && (
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 animate-fade-in">
              <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-400" />
                Your Notes
              </h3>
              <textarea
                value={userNotes}
                autoFocus
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Write your notes here... You can add key points, questions, or ideas from this lesson."
                rows="6"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 resize-none transition-all duration-200"
              />
              <div className="flex justify-end items-center mt-4">
                <button
                  onClick={handleDownloadNotes}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-slate-100 mb-4">
              Lesson Progress
            </h3>
            <button
              onClick={handleMarkComplete}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                currentLesson?.isCompleted
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.02]"
              }`}
            >
              <CheckCircle size={20} />
              {currentLesson?.isCompleted
                ? "Lesson Completed"
                : "Mark as Complete"}
            </button>
          </div>

          {currentSection && (
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">
                Up Next
              </h3>
              {(() => {
                const lessons = currentSection.lesson;
                const currentIndex = lessons.findIndex(
                  (l) => l._id === currentLesson?._id
                );
                const nextLesson = lessons[currentIndex + 1];
                return nextLesson ? (
                  <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Play size={16} className="text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-200 font-medium text-sm truncate">
                          Next: {nextLesson.title}
                        </p>
                        <p className="text-slate-400 text-xs">
                          Coming up in this section
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-600/40 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-green-400 font-medium text-sm">
                        Section Completed!
                      </p>
                      <p className="text-slate-400 text-xs">
                        Great job finishing this section!
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCoursePage;
