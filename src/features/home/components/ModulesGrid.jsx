import { Link } from "react-router-dom";
import { useCourses } from "@/features/courses/hooks";
import { formatDuration } from "@/shared/utils/formatDuration.js";
import ClipCorner from "@/shared/ui/ClipCorner";
import { clipCardStyle } from "@/shared/ui/clipCardStyle";

// cycled gradient tints for the thumbnail banner — purely decorative
const THUMB_GRADIENTS = [
  "linear-gradient(135deg, rgba(212,165,55,0.25), rgba(91,141,239,0.15))",
  "linear-gradient(135deg, rgba(45,212,191,0.22), rgba(91,141,239,0.16))",
  "linear-gradient(135deg, rgba(139,122,224,0.22), rgba(212,165,55,0.16))",
];

const ModulesGrid = () => {
  const { data: coursesData, isLoading } = useCourses({
    search: "",
    category: "",
    page: 1,
    limit: 4,
  });

  const courses = coursesData?.courses || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-14">
        <div className="w-7 h-7 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!courses.length) {
    return (
      <p className="text-text-3 text-sm py-8">No courses published yet.</p>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {courses.map((course, i) => {
        const instructorName = course.instructor?.name || "StudyHub Instructor";
        const instructorInitials = instructorName
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return (
          <Link
            key={course._id}
            to={`/course/${course._id}`}
            className="relative block border border-border bg-surface p-[22px] hover:border-gold-dim transition-colors"
            style={clipCardStyle}
          >
            <ClipCorner />

            {/* thumbnail banner */}
            <div
              className="relative aspect-video -mx-[22px] -mt-[22px] mb-4 overflow-hidden"
              style={{
                background: THUMB_GRADIENTS[i % THUMB_GRADIENTS.length],
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[34px] h-[34px] rounded-full bg-bg/55 border border-white/40 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* floating badge */}
            <span className="absolute -top-2.5 left-[22px] bg-bg border border-gold-dim px-2 py-0.5 font-mono text-[10px] text-gold">
              CRS-{String(i + 1).padStart(3, "0")}
            </span>

            <div className="font-mono text-[10px] text-teal uppercase tracking-wide mb-2.5 mt-1.5">
              {course.category?.name || "General"}
            </div>

            <h3 className="font-display font-bold text-[17px] mb-4 leading-[1.35] line-clamp-2">
              {course.title}
            </h3>

            <div className="flex items-center justify-between font-mono text-[11px] text-text-3 border-t border-border pt-3 mb-3.5">
              <span>
                {course.totalDuration > 0
                  ? formatDuration(course.totalDuration)
                  : "Self-paced"}
                {course.totalLectures > 0
                  ? ` · ${course.totalLectures} lessons`
                  : ""}
              </span>
              <span className="text-gold">
                {course.averageRating > 0
                  ? `★ ${course.averageRating.toFixed(1)}`
                  : "New"}
              </span>
            </div>

            {/* instructor row */}
            <div className="flex items-center gap-2">
              <div className="w-[22px] h-[22px] rounded-full bg-gold flex items-center justify-center font-display text-[9px] font-bold text-bg">
                {instructorInitials}
              </div>
              <span className="text-[11.5px] text-text-2 truncate">
                {instructorName}
                {course.totalEnrollments > 0
                  ? ` · ${course.totalEnrollments} enrolled`
                  : ""}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ModulesGrid;
