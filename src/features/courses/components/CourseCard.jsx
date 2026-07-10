import { Link } from "react-router-dom";
import { Clock, Book } from "lucide-react";
import { formatDuration } from "@/shared/utils/formatDuration";
import renderStars from "@/shared/ui/renderStars";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-surface-2 rounded-xl border border-border hover:border-gold-dim transition-colors duration-200 overflow-hidden group flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail || "/placeholder-course.jpg"}
          alt={course.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.category && (
          <span className="absolute top-2 right-2 px-2 py-1 bg-gold text-bg text-[11px] font-mono font-medium rounded-full">
            {course.category.name}
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

        {(course.averageRating > 0 || course.enrolledStudents > 0) && (
          <div className="mt-3 space-y-1">
            {course.averageRating > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 text-gold">
                  {renderStars(course.averageRating)}
                </div>
                <span className="text-text-1 font-semibold text-sm">
                  {course.averageRating.toFixed(1)}
                </span>
                <span className="text-text-3 text-xs">/5.0</span>
              </div>
            )}
            {course.enrolledStudents > 0 && (
              <p className="text-xs text-text-3">
                {course.enrolledStudents.toLocaleString()} students enrolled
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <span className="font-display text-lg font-bold text-text-1">
            {course.price > 0 ? `₹${course.price}` : "Free"}
          </span>

          <Link
            to={`/course/${course._id}`}
            className="px-3.5 py-2 rounded-lg bg-gold hover:bg-gold-dim text-bg text-[13px] font-medium transition-colors"
          >
            View course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
