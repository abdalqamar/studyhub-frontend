import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCoursePreview } from "@/features/courses/hooks";
import { ArrowLeft, Clock, Users, Star, User, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import SkeletonLoader from "../ui/SkeletonLoader";
import CourseTabs from "@/features/courses/components/CourseTabs";

const statusConfig = {
  approved: { text: "Approved", classes: "bg-teal-soft text-teal" },
  pending: { text: "Pending", classes: "bg-accent-blue-soft text-accent-blue" },
  rejected: { text: "Rejected", classes: "bg-danger-soft text-danger" },
};

const CoursePreview = () => {
  const user = useAuthStore((state) => state.user);
  const { courseId } = useParams();
  const { data: courseData, isLoading } = useCoursePreview(courseId);

  if (isLoading) return <SkeletonLoader />;

  const status = statusConfig[courseData?.status] || statusConfig.pending;

  return (
    <section className="min-h-screen bg-surface pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <Link
          to={
            user?.role === "admin"
              ? "/admin/courses"
              : "/instructor/manage-courses"
          }
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-surface-2 hover:bg-surface-raised text-text-2 hover:text-text-1 rounded-xl transition-all duration-200 border border-border-strong group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span className="hidden sm:inline text-[13px] font-medium">
            Back to courses
          </span>
        </Link>
      </div>

      {user?.role === "admin" && (
        <div className="border-y border-border py-3 mb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
            <span className="text-text-3 text-xs font-mono">Course status</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium font-mono ${status.classes}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {status.text}
            </span>
          </div>
        </div>
      )}

      <div className="bg-surface-2 border-b border-border py-8 lg:py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-3">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-1 leading-tight">
                  {courseData?.title}
                </h1>
                <p className="text-text-2 leading-relaxed max-w-3xl">
                  {courseData?.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-surface border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gold">
                    <Star size={16} className="fill-gold" />
                    <span className="font-mono font-bold text-text-1 text-lg">
                      {courseData?.averageRating || 0}
                    </span>
                  </div>
                  <p className="text-xs text-text-3 mt-1">
                    {courseData?.reviews?.length || 0} ratings
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 text-accent-blue">
                    <Users size={16} />
                    <span className="font-mono font-bold text-text-1 text-lg">
                      {courseData?.totalStudents?.toLocaleString() || 0}
                    </span>
                  </div>
                  <p className="text-xs text-text-3 mt-1">students</p>
                </div>

                <div className="bg-surface border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 text-teal">
                    <Clock size={16} />
                    <span className="font-mono font-bold text-text-1 text-lg">
                      {courseData?.totalDuration || "0h 0m"}
                    </span>
                  </div>
                  <p className="text-xs text-text-3 mt-1">total duration</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-sm text-text-2 pt-1">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-text-3" />
                  <span>Created by</span>
                  <span className="text-text-1 font-medium">
                    {courseData?.instructor?.firstName}{" "}
                    {courseData?.instructor?.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-text-3" />
                  <span>Created on</span>
                  <span className="text-text-1 font-medium">
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

            <div className="lg:col-span-1">
              <div className="bg-surface border border-border rounded-2xl p-5">
                <img
                  src={courseData?.thumbnail}
                  alt={courseData?.title}
                  className="w-full h-48 sm:h-56 object-cover rounded-xl"
                />
                <div className="mt-4 text-center">
                  <div className="font-display text-3xl font-bold text-gold mb-1">
                    ₹{courseData?.price || 0}
                  </div>
                  <div className="text-text-3 text-xs font-mono">
                    One-time payment • Lifetime access
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CourseTabs courseData={courseData} defaultTab="overview" />
      </div>
    </section>
  );
};

export default CoursePreview;
