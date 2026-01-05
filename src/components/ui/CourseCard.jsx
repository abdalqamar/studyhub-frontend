import { BarChart, Clock, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../../utils/formatDuration";
const CourseCard = ({ course, getCategoryColor }) => {
  const completedLessons =
    course?.courseContent?.reduce(
      (total, section) =>
        total +
        (section.lesson?.filter((lesson) => lesson.isCompleted)?.length || 0),
      0
    ) || 0;
  const isCompleted = course.progress === 100;
  const navigate = useNavigate();
  return (
    <div
      key={course._id}
      className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition group"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

        {/* Play Button */}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 rounded-full p-4 opacity-0 group-hover:opacity-100 transition">
          <Play className="w-6 h-6 fill-current" />
        </button>

        {/* Category Tag */}
        <span
          className={`absolute top-4 left-4 ${getCategoryColor(
            course.category
          )} px-3 py-1 rounded-full text-xs font-semibold`}
        >
          {course.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">
          {course.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4">By: {course.instructor}</p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Progress</span>
            <span
              className={`font-semibold ${
                isCompleted ? "text-green-400" : "text-blue-400"
              }`}
            >
              {course.progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className={`${
                isCompleted ? "bg-green-500" : "bg-blue-500"
              } h-2 rounded-full transition-all duration-300`}
              style={{ width: `${course.progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
          <div className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            <span>
              {completedLessons}/{course.totalLessons} lessons
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(course?.totalDuration)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <span className="text-xs text-slate-500">
            Last accessed: {course.lastAccessed}
          </span>
          <button
            onClick={() => navigate(`/student/view-course/${course._id}`)}
            className={`px-4 py-2 ${
              isCompleted
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-lg text-sm font-medium transition`}
          >
            {isCompleted ? "View Certificate" : "Continue Learning"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CourseCard;
