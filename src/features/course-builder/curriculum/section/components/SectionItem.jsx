import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2, Edit2 } from "lucide-react";
import LessonList from "../../lesson/components/LessonList";
import LessonForm from "../../lesson/components/LessonForm";
import SectionForm from "./SectionForm";

const SectionItem = ({
  section,
  index,
  courseId,
  isExpanded,
  onToggle,
  onDeleteRequest,
  onDeleteLessonRequest,
}) => {
  const [editingSection, setEditingSection] = useState(false);
  const [creatingLesson, setCreatingLesson] = useState(false);

  const lessonCount = section.lesson?.length || 0;

  if (editingSection) {
    return (
      <div className="relative">
        <div className="absolute -left-9 top-4 w-[19px] h-[19px] rounded-full border bg-gold-soft border-gold text-gold flex items-center justify-center font-mono text-[10px]">
          {String(index + 1).padStart(2, "0")}
        </div>
        <SectionForm
          courseId={courseId}
          onCancel={() => setEditingSection(false)}
          isEditing
          editingSection={section}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className={`absolute -left-9 top-4 w-[19px] h-[19px] rounded-full border flex items-center justify-center font-mono text-[10px] ${
          isExpanded
            ? "bg-gold-soft border-gold text-gold"
            : "bg-surface-2 border-border-strong text-text-3"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        className={`rounded-xl border transition-colors ${
          isExpanded
            ? "bg-surface-raised border-border-strong"
            : "bg-surface border-border"
        }`}
      >
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <button
                type="button"
                onClick={() => onToggle(section._id)}
                className="text-text-2 hover:text-text-1 mt-0.5"
              >
                {isExpanded ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base truncate">
                  {section.sectionName}
                </h3>
                <div className="font-mono text-xs text-text-3 mt-1.5">
                  {lessonCount} lectures
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => setEditingSection(true)}
                className="text-gold p-2 rounded-lg border border-gold/30 hover:bg-gold-soft"
                aria-label="Edit section"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDeleteRequest(section._id)}
                className="text-danger p-2 rounded-lg border border-danger/30 hover:bg-danger-soft"
                aria-label="Delete section"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-border-strong px-4 sm:px-5 py-4 space-y-3">
            <LessonList
              lessons={section.lesson}
              sectionId={section._id}
              courseId={courseId}
              onDeleteRequest={onDeleteLessonRequest}
            />

            {creatingLesson ? (
              <LessonForm
                sectionId={section._id}
                courseId={courseId}
                onCancel={() => setCreatingLesson(false)}
                isEditing={false}
              />
            ) : (
              <button
                onClick={() => setCreatingLesson(true)}
                className="w-full border border-dashed border-border-strong p-4 rounded-lg text-text-2 hover:text-gold hover:border-gold/50 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Plus size={16} /> Add lecture
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionItem;
