import { ArrowLeft, Clock, Users, Star, User, Calendar } from "lucide-react";
import CourseTabs from "../../../components/CourseTabs";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { useCoursePreview } from "../../../hooks/useCourses";

const CoursePreview = () => {
  const { user } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const { data: courseData, isLoading } = useCoursePreview(courseId);
  console.log(courseData);
  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Back button */}
      <div className="flex items-center mb-4">
        <Link
          to={
            user?.role === "admin"
              ? "/admin/courses"
              : "/instructor/manage-courses"
          }
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-lg transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Back to courses</span>
        </Link>
      </div>

      {/* Admin Status */}
      {user?.role === "admin" && (
        <div className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/30">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-sm">Course Status:</span>

              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm ${
                  courseData?.status === "approved"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : courseData?.status === "pending"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    courseData?.status === "approved"
                      ? "bg-emerald-400"
                      : courseData?.status === "pending"
                      ? "bg-amber-400"
                      : "bg-rose-400"
                  }`}
                />
                <span className="capitalize">{courseData?.status}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-slate-700/30">
        <div className="absolute inset-0 bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {courseData?.title}
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
                  {courseData?.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Star
                      className="text-yellow-400 fill-yellow-400"
                      size={20}
                    />
                    <span className="font-bold text-white text-lg">
                      {courseData?.averageRating || 0}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    {courseData?.reviews?.length || 0} ratings
                  </p>
                </div>

                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users size={20} />
                    <span className="font-bold text-white text-lg">
                      {courseData?.totalStudents?.toLocaleString() || 0}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">students</p>
                </div>

                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock size={20} />
                    <span className="font-bold text-white text-lg">
                      {courseData?.totalDuration || "0h 0m"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">total duration</p>
                </div>
              </div>

              {/* Instructor & Date */}
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>Created by</span>
                  <span className="text-white font-medium">
                    {courseData?.instructor?.firstName}{" "}
                    {courseData?.instructor?.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Created on</span>
                  <span className="text-white font-medium">
                    {courseData?.createdAt
                      ? new Date(courseData.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30 backdrop-blur-sm">
                <img
                  src={courseData?.thumbnail}
                  alt={courseData?.title}
                  className="w-full h-48 sm:h-64 object-cover rounded-xl shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    Rs.{courseData?.price || 0}
                  </div>
                  <div className="text-slate-400 text-sm">
                    One-time payment • Lifetime access
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CourseTabs courseData={courseData} defaultTab="overview" />
      {/* Content */}
    </section>
  );
};

export default CoursePreview;
