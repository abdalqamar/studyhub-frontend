import { useEnrolledCourses } from "@/features/courses/hooks/useEnrolledCourse";
import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import { formatDuration } from "@/shared/utils/formatDuration";
import { BookOpen, Clock, Award, CheckCircle } from "lucide-react";
import EnrolledCourseCard from "../components/EnrolledCourseCard";

const calculateStats = (courses) => {
  if (!courses || courses.length === 0) {
    return {
      totalCourses: 0,
      totalProgress: 0,
      completedCourses: 0,
      totalLearningMinutes: 0,
      certificates: 0,
    };
  }

  const totalProgressSum = courses.reduce(
    (sum, course) => sum + (course.progress ?? 0),
    0
  );
  const totalProgress = (totalProgressSum / courses.length).toFixed(1);
  const completedCourses = courses.filter((c) => c.progress === 100).length;
  const totalLearningMinutes = courses.reduce(
    (sum, course) => sum + (course.totalDuration ?? 0),
    0
  );

  return {
    totalCourses: courses.length,
    totalProgress,
    completedCourses,
    totalLearningMinutes,
    certificates: completedCourses,
  };
};

const MyCourses = () => {
  const { data: courses, isLoading } = useEnrolledCourses();
  if (isLoading) return <SkeletonLoader />;

  const stats = calculateStats(courses);

  if (!courses || courses.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex justify-center items-center">
        <div className="text-center p-10 bg-surface-2 rounded-2xl border border-border">
          <BookOpen className="w-10 h-10 mx-auto mb-4 text-gold" />
          <h2 className="font-display text-xl font-bold text-text-1 mb-2">
            No enrolled courses
          </h2>
          <p className="text-text-2 text-sm">
            Time to find your next great subject!
          </p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Enrolled",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "accent-blue",
      share: 100,
    },
    {
      label: "Completed",
      value: stats.completedCourses,
      icon: CheckCircle,
      color: "teal",
      share: stats.totalCourses
        ? Math.round((stats.completedCourses / stats.totalCourses) * 100)
        : 0,
    },
    {
      label: "Learning hours",
      value: formatDuration(stats.totalLearningMinutes),
      icon: Clock,
      color: "gold",
      share: 100,
    },
    {
      label: "Certificates",
      value: stats.certificates,
      icon: Award,
      color: "gold",
      share: stats.totalCourses
        ? Math.round((stats.certificates / stats.totalCourses) * 100)
        : 0,
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-surface-2 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-text-1">
                My courses
              </h1>
              <p className="text-text-2 text-sm mt-1">
                Continue your learning journey
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-text-3">Total progress</p>
              <p className="font-display text-2xl font-bold text-gold">
                {stats.totalProgress}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="relative bg-surface-2 border border-border rounded-xl p-5 overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
              }}
            >
              <div
                className={`w-9 h-9 rounded-lg bg-${card.color}-soft flex items-center justify-center mb-4`}
              >
                <card.icon size={18} className={`text-${card.color}`} />
              </div>

              <p className="text-2xl font-bold text-text-1 mb-1">
                {card.value}
              </p>
              <p className="text-sm text-text-2 mb-4">{card.label}</p>

              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10.5px] font-mono text-text-3">
                  Share of total
                </span>
                <span className="text-[10.5px] font-mono text-text-3">
                  {card.share}%
                </span>
              </div>
              <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-${card.color}`}
                  style={{ width: `${card.share}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <EnrolledCourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
