import { useState } from "react";
import CourseActions from "./CourseActions";
import StatusBadge from "../../shared/StatusBadge";
import { formatDuration } from "../../../../utils/formatDuration.js";

const CourseTableRow = ({ course, userType, onAction }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const truncateDescription = (text, maxLength = 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength);
  };

  return (
    <tr className="hover:bg-slate-700/50 transition-all duration-200 border-b border-slate-700/50">
      {/* Course Info */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl">{course.title?.charAt(0)}</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white truncate mb-1">
              {course.title}
            </div>

            <div
              className="text-slate-400 text-sm cursor-pointer hover:text-slate-300 transition-colors"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded
                ? course.description
                : truncateDescription(course.description)}
              {course.description?.length > 50 && (
                <span className="text-blue-400 ml-1 text-xs">
                  {isDescriptionExpanded ? "hide ..." : "show more..."}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs mt-2">
              <span className="text-emerald-400 font-medium">
                ₹{course.price}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-500">
                {formatDuration(course.duration)}
              </span>
              <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded">
                {course.category?.name}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Instructor - Only for Admin */}
      {userType === "admin" && (
        <td className="px-6 py-4">
          <span className="text-slate-300 font-medium">
            {course.instructor?.firstName} {course.instructor?.lastName}
          </span>
        </td>
      )}

      {/* Students */}
      <td className="px-6 py-4">
        <div className="text-center">
          {course.enrolledCount > 0 || course.students > 0 ? (
            <>
              <div className="font-semibold text-white text-lg">
                {course.enrolledCount || course.students}
              </div>
              <div className="text-slate-500 text-xs uppercase tracking-wide">
                enrolled
              </div>
            </>
          ) : (
            <span className="text-slate-500 text-sm italic">
              No students yet
            </span>
          )}
        </div>
      </td>

      {/* Rating */}
      <td className="px-6 py-4">
        {course.rating > 0 ? (
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-400 text-lg">⭐</span>
            <span className="text-white font-semibold">{course.rating}</span>
            <span className="text-slate-500 text-xs">/5.0</span>
          </div>
        ) : (
          <span className="text-slate-500 text-sm italic">No ratings yet</span>
        )}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={course.status} userType={userType} />
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <CourseActions
          course={course}
          userType={userType}
          onAction={onAction}
        />
      </td>
    </tr>
  );
};

export default CourseTableRow;
