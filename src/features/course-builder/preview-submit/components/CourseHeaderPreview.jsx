import { Edit } from "lucide-react";

const CourseHeaderPreview = ({ course, totalLectures, onEditStep }) => (
  <div className="bg-surface rounded-xl p-5 border border-border">
    <div className="flex flex-col sm:flex-row gap-5">
      {course.thumbnail && (
        <img src={course.thumbnail} alt="" className="w-full sm:w-44 h-28 object-cover rounded-lg flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="font-display text-lg truncate">{course.title}</h3>
          <button
            onClick={() => onEditStep(1)}
            className="text-gold text-xs px-3 py-1.5 border border-gold/30 rounded-lg flex items-center gap-1.5 flex-shrink-0 hover:bg-gold-soft"
          >
            <Edit size={13} /> Edit
          </button>
        </div>
        <p className="text-text-2 text-sm line-clamp-2">{course.description}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-3 text-xs mt-3 font-mono">
          <span>{course.category?.name}</span>
          <span>₹{course.price}</span>
          <span>{course.courseContent?.length || 0} sections</span>
          <span>{totalLectures} lectures</span>
        </div>
      </div>
    </div>
  </div>
);

export default CourseHeaderPreview;
