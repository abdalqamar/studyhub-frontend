import { Link } from "react-router-dom";
import { Clock, Book } from "lucide-react";
import { formatDuration } from "@/shared/utils/formatDuration";

const EnrolledCourseCard = ({ course }) => {
  const progress = course.progress ?? 0;
  const isCompleted = progress === 100;

  return (
    <Link
      to={`/student/view-course/${course._id}`}
      className="bg-surface-2 rounded-xl border border-border hover:border-gold-dim transition-colors duration-200 overflow-hidden group flex flex-col"
    >
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail || "/placeholder-course.jpg"}
          alt={course.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.category?.name && (
          <span className="absolute top-2 right-2 px-2 py-1 bg-gold text-bg text-[11px] font-mono font-medium rounded-full">
            {course.category.name}
          </span>
        )}
        {isCompleted && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-teal text-bg text-[11px] font-mono font-medium rounded-full">
            Completed
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[14.5px] font-semibold text-text-1 line-clamp-2 min-h-[2.75rem] mb-1">
          {course.title}
        </h3>

        <p className="text-sm text-text-3 truncate">
          {course.instructor?.firstName} {course.instructor?.lastName}
        </p>

        <div className="flex items-center gap-4 mt-3 text-xs text-text-3 font-mono">
          {course.totalDuration > 0 && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{formatDuration(course.totalDuration)}</span>
            </div>
          )}
          {course.totalLectures > 0 && (
            <div className="flex items-center gap-1">
              <Book size={14} />
              <span>{course.totalLectures} lessons</span>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono text-text-3">Progress</span>
            <span
              className={`text-xs font-mono font-semibold ${isCompleted ? "text-teal" : "text-gold"}`}
            >
              {progress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${isCompleted ? "bg-teal" : "bg-gold"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EnrolledCourseCard;
