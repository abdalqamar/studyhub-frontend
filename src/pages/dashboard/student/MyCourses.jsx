import { useEnrolledCourses } from "../../../hooks/useEnrolledCourse";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

import {
  BookOpen,
  Clock,
  Award,
  Play,
  CheckCircle,
  BarChart,
} from "lucide-react";
import CourseCard from "../../../components/ui/CourseCard";

const getCategoryColor = (category) => {
  const colors = {
    Development: "bg-blue-500",
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
  const stats = calculateStats(courses);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!courses || courses.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">
        <div className="text-center p-10 bg-slate-800 rounded-xl border border-slate-700">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-400" />
          <h2 className="text-2xl font-bold mb-2">No Enrolled Courses</h2>
          <p className="text-slate-400">
            Time to find your next great subject!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Courses</h1>
              <p className="text-slate-400 mt-1">
                Continue your learning journey
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Total Progress</p>

                <p className="text-2xl font-bold text-blue-400">
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
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Enrolled Courses</p>
                {/* Dynamic Total Courses */}
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Completed</p>
                {/* Dynamic Completed Courses */}
                <p className="text-2xl font-bold">{stats.completedCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Learning Hours</p>
                {/* Dynamic Learning Hours */}
                <p className="text-2xl font-bold">{stats.totalLearningHours}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500/20 p-3 rounded-lg">
                <Award className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Certificates</p>
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
