import renderStars from "@/shared/ui/renderStars";
import { formatDuration } from "@/shared/utils/formatDuration";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import CourseActions from "./CourseActions";

const CourseTableRow = ({ course, userType, onAction }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const truncateDescription = (text, maxLength = 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength);
  };

  return (
    <tr className="hover:bg-surface-2/60 transition-colors border-t border-border">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3 min-w-[260px]">
          <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-surface-raised to-surface-2 border border-border-strong flex-shrink-0 flex items-center justify-center overflow-hidden text-text-3">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-display">
                {course.title?.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[13.5px] font-medium text-text-1 truncate mb-1">
              {course.title}
            </p>

            <div
              className="text-text-3 text-xs cursor-pointer hover:text-text-2 transition-colors"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded
                ? course.description
                : truncateDescription(course.description)}
              {course.description?.length > 50 && (
                <span className="text-gold ml-1">
                  {isDescriptionExpanded ? "hide" : "more"}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1.5">
              <span className="font-mono text-[10.5px] text-gold bg-gold-soft border border-gold-dim px-2 py-0.5 rounded-full">
                {course.category?.name}
              </span>
              <span className="text-text-3 text-[11px]">₹{course.price}</span>
              <span className="text-text-3 text-[11px]">
                {formatDuration(course.duration)}
              </span>
            </div>
          </div>
        </div>
      </td>

      {userType === "admin" && (
        <td className="px-5 py-3.5 text-[13px] text-text-2">
          {course.instructor?.firstName} {course.instructor?.lastName}
        </td>
      )}

      <td className="px-5 py-3.5 font-mono text-[13px] text-text-1">
        {course.enrolledCount || course.students || "—"}
      </td>

      <td className="px-5 py-3.5">
        <div className="flex items-center gap-1.5 font-mono text-[13px]">
          <div className="flex items-center gap-0.5 text-gold">
            {renderStars(course.averageRating || 0)}
          </div>
          <span className="text-text-1">
            {(course.averageRating || 0).toFixed(1)}
          </span>
        </div>
      </td>

      <td className="px-5 py-3.5">
        <StatusBadge status={course.status} userType={userType} />
      </td>

      <td className="px-5 py-3.5">
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
