import { useState } from "react";
import LessonForm from "./LessonForm";
import { Trash2, Edit2, Save, X } from "lucide-react";

const LessonItem = ({
  lesson,
  lectureIndex,
  sectionId,
  courseId,
  onDeleteRequest,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 rounded-xl p-4 sm:p-5 space-y-4 border border-slate-600/30 hover:border-slate-500/50 transition-all shadow-lg">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3 mb-4">
        {/* Index + title */}
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-bold border border-blue-500/30">
            {lectureIndex + 1}
          </span>

          <h4 className="text-slate-300 font-medium text-sm">
            Lecture {lectureIndex + 1}
          </h4>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!isEditing && (
            <>
              {/* EDIT */}
              <button
                type="button"
                onClick={handleEdit}
                className="text-blue-400 hover:text-blue-300 p-1.5 rounded-lg hover:bg-blue-400/10 transition-all border border-blue-400/30"
              >
                <Edit2 size={16} />
              </button>

              {/* DELETE */}
              <button
                type="button"
                onClick={() => onDeleteRequest(sectionId, lesson._id)}
                className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-400/10 transition-all border border-red-400/30"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* IF EDITING, SHOW FORM */}
      {isEditing ? (
        <LessonForm
          sectionId={sectionId}
          courseId={courseId}
          onCancel={handleCancelEdit}
          isEditing={true}
          editingLesson={{
            _id: lesson._id,
            sectionId,
            title: lesson.title,
            description: lesson.description,
            videoUrl: lesson.videoUrl,
          }}
        />
      ) : (
        /* DEFAULT VIEW */
        <div className="space-y-3">
          <div>
            <h5 className="text-white font-medium">{lesson.title}</h5>
            <p className="text-slate-400 text-sm mt-1">{lesson.description}</p>
          </div>

          {lesson?.videoUrl && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <span>✓</span>
              <span>Video Uploaded</span>
              {lesson.duration && (
                <span className="text-slate-400">• {lesson.duration} min</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonItem;
