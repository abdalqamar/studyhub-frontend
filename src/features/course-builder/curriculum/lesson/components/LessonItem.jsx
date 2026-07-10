import { useState } from "react";
import { Trash2, Edit2, PlayCircle } from "lucide-react";
import LessonForm from "./LessonForm";

const LessonItem = ({ lesson, lectureIndex, sectionId, courseId, onDeleteRequest }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <LessonForm
        sectionId={sectionId}
        courseId={courseId}
        onCancel={() => setIsEditing(false)}
        isEditing
        editingLesson={{
          _id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          videoUrl: lesson.videoUrl,
        }}
      />
    );
  }

  return (
    <div className="flex items-start gap-3 bg-surface-2 rounded-lg p-3.5 border border-border hover:border-border-strong transition-colors">
      <div className="w-7 h-7 rounded-md bg-teal-soft border border-teal/30 flex items-center justify-center font-mono text-[11px] text-teal flex-shrink-0 mt-0.5">
        {String(lectureIndex + 1).padStart(2, "0")}
      </div>

      <div className="flex-1 min-w-0">
        <h5 className="text-sm text-text-1 font-medium truncate">{lesson.title}</h5>
        <p className="text-text-3 text-xs mt-0.5 line-clamp-2">{lesson.description}</p>
        {lesson?.videoUrl && (
          <div className="flex items-center gap-1.5 text-teal text-xs mt-2">
            <PlayCircle size={13} />
            <span>Video uploaded</span>
            {lesson.duration && (
              <span className="font-mono text-text-3 bg-surface px-1.5 py-0.5 rounded">
                {lesson.duration} min
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="text-gold p-1.5 rounded-lg hover:bg-gold-soft"
          aria-label="Edit lesson"
        >
          <Edit2 size={14} />
        </button>
        <button
          type="button"
          onClick={() => onDeleteRequest(sectionId, lesson._id)}
          className="text-danger p-1.5 rounded-lg hover:bg-danger-soft"
          aria-label="Delete lesson"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default LessonItem;
