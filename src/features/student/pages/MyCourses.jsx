import { useEnrolledCourses } from "@/features/courses/hooks/useEnrolledCourse";
import CourseCard from "@/features/courses/components/CourseCard";
import PageLoader from "@/shared/ui/PageLoader";
import { BookOpen, Clock, Award, CheckCircle } from "lucide-react";

const getCategoryColor = (category) => {
  const colors = {
    Development: "bg-gold",
    Design: "bg-purple-500",
    "Data Science": "bg-green-500",
    Marketing: "bg-orange-500",
  };
  return colors[category] || "bg-gray-500";
};

const calculateStats = (courses) => {
  if (!courses || courses.length === 0) {
    return {
      totalCourses: 0,
      totalProgress: 0,
      completedCourses: 0,
      totalLearningHours: "0h",
      certificates: 0,
    };
  }

  const totalProgressSum = courses.reduce(
    (sum, course) => sum + course.progress,
    0
  );
  const totalProgress = (totalProgressSum / courses.length).toFixed(1);
  const completedCourses = courses.filter((c) => c.progress === 100).length;

  return {
    totalCourses: courses.length,
    totalProgress,
    completedCourses,
    // totalLearningHours: `${totalLearningHours}h`,
  };
};

const MyCourses = () => {
  const { data: courses, isLoading } = useEnrolledCourses();
  if (isLoading) return <PageLoader />;
  const stats = calculateStats(courses);

  if (!courses || courses.length === 0) {
    return (
      <div className="min-h-screen bg-surface text-white flex justify-center items-center">
        <div className="text-center p-10 bg-surface-2 rounded-xl border border-border">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-gold" />
          <h2 className="text-2xl font-bold mb-2">No Enrolled Courses</h2>
          <p className="text-text-2">Time to find your next great subject!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-white">
      {/* Header */}
      <div className="bg-surface-2 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Courses</h1>
              <p className="text-text-2 mt-1">Continue your learning journey</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-text-2">Total Progress</p>

                <p className="text-2xl font-bold text-gold">
                  {stats.totalProgress}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface-2 rounded-lg p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="bg-gold/20 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-text-2 text-sm">Enrolled Courses</p>
                {/* Dynamic Total Courses */}
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-2 rounded-lg p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-text-2 text-sm">Completed</p>
                {/* Dynamic Completed Courses */}
                <p className="text-2xl font-bold">{stats.completedCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-2 rounded-lg p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-text-2 text-sm">Learning Hours</p>
                {/* Dynamic Learning Hours */}
                <p className="text-2xl font-bold">{stats.totalLearningHours}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-2 rounded-lg p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500/20 p-3 rounded-lg">
                <Award className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-text-2 text-sm">Certificates</p>
                {/* Dynamic Certificates */}
                <p className="text-2xl font-bold">{stats.certificates}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
