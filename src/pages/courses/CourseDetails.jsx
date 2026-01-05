import { useState } from "react";
import { ArrowLeft, X, Clock, Users, Star, BookOpen, Play } from "lucide-react";
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
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden pt-32 ">
      {isLoading && <LoadingSpinner />}

      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto p-6 md:px-0">
          {/* Back Button */}
          <Link
            to={"/courses"}
            className="inline-flex items-center text-slate-300 hover:text-white mb-4 md:mb-6 transition-colors duration-200 text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
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

          {/* Stats - Flex wrap version */}
          <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-6">
            {/* Rating */}
            <div className="flex items-center bg-slate-800/50 px-3 py-2 rounded-lg text-sm flex-1 min-w-[150px] sm:min-w-0 sm:flex-initial">
              <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0 fill-current" />
              <span className="text-yellow-400 font-semibold mr-1 whitespace-nowrap">
                {course?.averageRating}
              </span>
              Avg Ratings
            </div>

            {/* Students */}
            <div className="flex items-center text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg text-sm flex-1 min-w-[150px] sm:min-w-0 sm:flex-initial">
              <Users className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{course?.totalStudents} students</span>
            </div>

            {/* Duration */}
            <div className="flex items-center text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg text-sm flex-1 min-w-[150px] sm:min-w-0 sm:flex-initial">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{course?.totalDuration}</span>
            </div>

            {/* Lectures */}
            <div className="flex items-center text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg text-sm flex-1 min-w-[150px] sm:min-w-0 sm:flex-initial">
              <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">
                {course?.totalLectures || 28} lectures
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
            <CoursePurchaseCard
              course={course}
              user={user}
              showVideo={showVideo}
              setShowVideo={setShowVideo}
            />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                {course?.title} - Preview
              </h3>
              <button
                onClick={() => setShowVideo(false)}
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors duration-200 text-slate-300 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-slate-700/50">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                  <Play className="w-8 h-8 text-blue-400 ml-1" />
                </div>
                <p className="text-slate-300 text-lg mb-2">
                  Course preview video would play here
                </p>
                <p className="text-slate-500">
                  Interactive lessons, hands-on projects, and expert guidance
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
