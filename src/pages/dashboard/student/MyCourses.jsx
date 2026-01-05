// import { Clock, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEnrolledCourses } from "../../../hooks/useEnrolledCourse";
// import { formatDuration } from "../../../utils/formatDuration";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

// const MyCourses = () => {
//   const navigate = useNavigate();
//   const { data: enrolledCourses, isLoading } = useEnrolledCourses();

//   const handleCourseClick = (course) => {
//     navigate(`/student/view-course/${course._id}`);
//   };

//   const getProgressColor = (percentage) => {
//     if (percentage >= 75) return "from-green-500 to-emerald-600";
//     if (percentage >= 50) return "from-blue-500 to-cyan-600";
//     if (percentage >= 25) return "from-yellow-500 to-orange-600";
//     return "from-gray-500 to-slate-600";
//   };

//   const getProgressLabel = (percentage) => {
//     if (percentage >= 100) return "Completed";
//     if (percentage >= 75) return "Almost Done";
//     if (percentage >= 50) return "In Progress";
//     if (percentage >= 25) return "Just Started";
//     return "Not Started";
//   };

//   return (
//     <div className="min-h-screen bg-slate-900">
//       {isLoading && <LoadingSpinner />}
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2">
//             Your Courses
//           </h1>
//           <p className="text-slate-400 text-lg">
//             Continue learning and track your progress
//           </p>
//         </div>

//         {/* No Courses */}
//         {!enrolledCourses?.length ? (
//           <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800 p-16 text-center">
//             <BookOpen className="mx-auto mb-4 h-16 w-16 text-slate-500" />
//             <p className="text-2xl font-semibold text-slate-200 mb-2">
//               No courses yet
//             </p>
//             <p className="text-slate-400 mb-6">
//               You haven't enrolled in any courses yet.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//             {enrolledCourses.map((course) => (
//               <div
//                 key={course._id}
//                 className="group rounded-xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
//                 onClick={() => handleCourseClick(course)}
//               >
//                 {/* Thumbnail */}
//                 <div className="relative overflow-hidden h-40 bg-slate-700">
//                   <img
//                     src={course.thumbnail}
//                     alt={course.title}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                   />

//                   {/* Progress Badge */}
//                   <div className="absolute top-3 right-3 bg-slate-900 bg-opacity-90 backdrop-blur px-3 py-1 rounded-full">
//                     <p className="text-sm font-semibold text-blue-400">
//                       {course.progressPercentage}%
//                     </p>
//                   </div>

//                   {/* Completed Badge (CheckCircle2) */}
//                   {course.progressPercentage === 100 && (
//                     <div className="absolute top-3 left-3 flex items-center gap-1 bg-green-600 bg-opacity-90 px-3 py-1 rounded-full">
//                       <CheckCircle2 size={16} />
//                       <p className="text-sm font-semibold text-white">
//                         Completed
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div className="p-5">
//                   <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-blue-400">
//                     {course.title}
//                   </h3>

//                   <p className="text-sm text-slate-400 mb-4 line-clamp-2">
//                     {course.description}
//                   </p>

//                   {/* Duration */}
//                   <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm">
//                     <Clock size={16} className="text-blue-400" />
//                     <span>{formatDuration(course.totalDuration)}</span>
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="mb-3">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-xs font-semibold text-slate-400">
//                         {getProgressLabel(course.progressPercentage)}
//                       </span>
//                       <span className="text-xs font-bold text-blue-400">
//                         {course.progressPercentage}%
//                       </span>
//                     </div>

//                     <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
//                       <div
//                         className={`h-full bg-gradient-to-r ${getProgressColor(
//                           course.progressPercentage
//                         )}`}
//                         style={{ width: `${course.progressPercentage}%` }}
//                       />
//                     </div>
//                   </div>

//                   {/* Button */}
//                   <button className="w-full mt-4 py-2 px-4 bg-slate-700 hover:bg-blue-500 text-slate-100 hover:text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
//                     {course.progressPercentage === 100
//                       ? "Review Course"
//                       : "Continue Learning"}
//                     <ArrowRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyCourses;

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
      {/* {isLoading && <LoadingSpinner />} */}
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
