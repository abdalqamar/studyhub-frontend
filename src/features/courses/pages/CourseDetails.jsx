import {
  ArrowLeft,
  Clock,
  Users,
  BookOpen,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useCourseDetails } from "../hooks";
import { useAuthStore } from "@/features/auth/store/auth.store";
import PageLoader from "@/shared/ui/PageLoader";
import renderStars from "@/shared/ui/renderStars";
import { formatDuration } from "@/shared/utils/formatDuration";
import CourseTabs from "../components/CourseTabs";
import CoursePurchaseCard from "../components/CoursePurchaseCard";

const CourseDetails = () => {
  const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useCourseDetails(courseId);
  const user = useAuthStore((state) => state.user);

  if (isLoading) return <PageLoader />;

  // Error Handling
  if (isError) {
    return (
      <div className="min-h-screen bg-bg text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            No course found
          </h2>
          <p className="text-text-2 text-sm mb-6">
            {error?.message || "Kuch problem aa gayi, thodi der baad try karo."}
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-dim text-white rounded-lg text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-bg text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-text-3" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            No course found
          </h2>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-dim text-white rounded-lg text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-white pt-16">
      {/*  Course Header  */}
      <div className="bg-surface border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Back Button */}
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-2 px-3 py-2 rounded-lg text-white text-sm transition-all duration-200 mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to courses
          </Link>

          <div className="flex items-center gap-1 text-xs md:text-sm text-text-2 mb-3 truncate">
            <span>{course.category?.name}</span>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{course.title}</span>
          </div>

          {/* Course Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
            {course.title}
          </h1>

          {/* Course Description */}
          <p className="text-text-2 text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-4xl leading-relaxed">
            {course.description}
          </p>

          {/* Meta Pills */}
          <div className="flex flex-wrap gap-3">
            {course.averageRating > 0 && (
              <div className="flex items-center gap-2 bg-surface-2/50 px-4 py-2.5 rounded-lg">
                <div className="flex items-center gap-0.5">
                  {renderStars(course.averageRating)}
                </div>
                <span className="text-white font-semibold text-sm">
                  {course.averageRating.toFixed(1)}
                </span>
              </div>
            )}

            {/* Students */}
            <div className="flex items-center gap-2 text-text-2 bg-surface-2/50 px-4 py-2.5 rounded-lg">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">
                {course.totalStudents > 0
                  ? `${course.totalStudents.toLocaleString()} student${course.totalStudents !== 1 ? "s" : ""}`
                  : "Be the first!"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-text-2 bg-surface-2/50 px-4 py-2.5 rounded-lg">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">
                {course.totalLectures > 0
                  ? formatDuration(course.totalDuration)
                  : 0}
              </span>
            </div>

            {/* Lectures */}
            <div className="flex items-center gap-2 text-text-2 bg-surface-2/50 px-4 py-2.5 rounded-lg">
              <BookOpen className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">
                {course.totalLectures > 0
                  ? `${course.totalLectures} lecture${course.totalLectures !== 1 ? "s" : ""}`
                  : "No lectures yet"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Course Tabs  */}
          <div className="lg:w-2/3">
            <CourseTabs courseData={course} defaultTab="curriculum" />
          </div>

          {/* Purchase Card */}
          <div className="lg:w-1/3">
            <CoursePurchaseCard course={course} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
