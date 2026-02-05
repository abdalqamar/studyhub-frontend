import { ArrowLeft, Clock, Users, Star, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCourseDetails } from "../../hooks/useCourses";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import CourseTabs from "../../components/CourseTabs";
import CoursePurchaseCard from "../../components/CoursePurchaseCard";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { data: course, isLoading } = useCourseDetails(courseId);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden pt-32 ">
      {isLoading && <LoadingSpinner />}

      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto p-6 md:px-0">
          {/* Back Button */}
          <Link
            to={"/student/courses"}
            className="inline-flex items-center bg-slate-700 px-3 py-2 rounded-lg text-white hover:bg-slate-600 mb-4 md:mb-6 transition-all duration-200 text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to courses
          </Link>

          {/* Breadcrumb */}
          <div className="text-xs md:text-sm text-slate-400 mb-3 truncate">
            {course?.category?.name} &gt; {course?.title}
          </div>

          {/* Course Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
            {course?.title}
          </h1>

          {/* Course Description */}
          <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-4xl leading-relaxed">
            {course?.description}
          </p>

          {/* Stats   */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            {/* Rating */}
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2.5 rounded-lg flex-1 min-w-[140px] sm:flex-initial">
              {course?.averageRating > 0 ? (
                <>
                  <Star
                    className="text-yellow-400 fill-yellow-400 flex-shrink-0"
                    size={18}
                  />
                  <span className="text-lg font-bold text-white">
                    {course?.averageRating || 0}
                  </span>
                  <span className="text-sm text-slate-400 whitespace-nowrap">
                    out of 5
                  </span>
                </>
              ) : (
                <>
                  <Star className="text-slate-500 flex-shrink-0" size={18} />
                  <span className="text-sm text-slate-400">No ratings yet</span>
                </>
              )}
            </div>

            {/* Students */}
            <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-2.5 rounded-lg flex-1 min-w-[140px] sm:flex-initial">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm truncate">
                {course?.totalStudents > 0
                  ? `${course.totalStudents} student${course.totalStudents !== 1 ? "s" : ""}`
                  : "Be the first!"}
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-2.5 rounded-lg flex-1 min-w-[140px] sm:flex-initial">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm truncate">
                {course?.totalDuration || "Not set"}
              </span>
            </div>

            {/* Lectures */}
            <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-2.5 rounded-lg flex-1 min-w-[140px] sm:flex-initial">
              <BookOpen className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm truncate">
                {course?.totalLectures > 0
                  ? `${course.totalLectures} lecture${course.totalLectures !== 1 ? "s" : ""}`
                  : "No lectures"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto  py-8">
        <div className="flex flex-col-reverse lg:flex-row gap-8 p-6 md:p-0">
          {/* Course Tabs - Main Content */}
          <div className="lg:w-2/3">
            <CourseTabs courseData={course} defaultTab="curriculum" />
          </div>

          {/* Purchase Card - Sidebar */}
          <div className="lg:w-1/3">
            <CoursePurchaseCard course={course} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
