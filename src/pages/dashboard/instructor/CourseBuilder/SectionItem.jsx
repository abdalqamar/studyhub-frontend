import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Save,
  GripVertical,
  X,
} from "lucide-react";
import LessonForm from "./LessonForm";
import LessonItem from "./LessonItem";
import { useUpdateSection } from "../../../../hooks/useCourses";

const SectionItem = ({
  section,
  courseId,
  isExpanded,
  onToggle,
  onDeleteRequest,
  onDeleteLessonRequest,
}) => {
  const [editingSection, setEditingSection] = useState(false);
  const [creatingLesson, setCreatingLesson] = useState(false);
  const updateSectionMutation = useUpdateSection(courseId);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handleEditSection = () => {
    setEditingSection(true);
    setValue("sectionName", section.sectionName);
  };

  const handleUpdateSection = async (data) => {
    const name = data.sectionName.trim();
    if (!name) return toast.error("Section name is required");

    try {
      await updateSectionMutation.mutateAsync({
        sectionId: section._id,
        sectionName: name,
      });

      toast.success("Section updated successfully");
      section.sectionName = name; // optimistic UI
      setEditingSection(false);
      reset();
    } catch (error) {
      toast.error("Failed to update section");
      setEditingSection(false);
      reset();
    }
  };

  const handleCancelEdit = () => {
    setEditingSection(false);
    reset();
  };

  const handleAddLesson = () => setCreatingLesson(true);
  const handleCancelLesson = () => setCreatingLesson(false);

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl border border-slate-600/50 shadow-xl">
      {/* SECTION HEADER */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Left side: name + expand */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button className="text-slate-500 cursor-grab mt-1.5">
              <GripVertical size={18} />
            </button>

            <button
              type="button"
              onClick={() => onToggle(section._id)}
              className="text-slate-300 hover:text-white mt-1.5"
            >
              {isExpanded ? <ChevronDown /> : <ChevronRight />}
            </button>

            <div className="flex-1">
              {editingSection ? (
                <form onSubmit={handleSubmit(handleUpdateSection)}>
                  <input
                    {...register("sectionName", { required: true })}
                    className="w-full bg-slate-700/50 border border-blue-500/50 text-white rounded-lg px-3 py-2"
                    autoFocus
                  />
                </form>
              ) : (
                <h3 className="text-white font-semibold">
                  {section.sectionName}
                </h3>
              )}

              <div className="text-slate-400 text-xs mt-2">
                {section.lesson?.length || 0} lectures
              </div>
            </div>
          </div>

          {/* Right side: actions */}
          <div className="flex items-center gap-2">
            {editingSection ? (
              <>
                <button
                  onClick={handleSubmit(handleUpdateSection)}
                  disabled={updateSectionMutation.isPending}
                  className="text-green-400 p-2 border border-green-400/30"
                >
                  <Save size={18} />
                </button>

                <button
                  onClick={handleCancelEdit}
                  className="text-slate-400 p-2 border border-slate-400/30"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEditSection}
                  className="text-blue-400 p-2 border border-blue-400/30"
                >
                  <Edit2 size={18} />
                </button>

                <button
                  onClick={() => onDeleteRequest(section._id)}
                  className="text-red-400 p-2 border border-red-400/30"
                >
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* EXPANDED AREA */}
      {isExpanded && (
        <div className="border-t border-slate-600/50 bg-slate-900/30 p-4 space-y-4">
          {/* LESSON CREATE FORM */}
          {creatingLesson ? (
            <LessonForm
              sectionId={section._id}
              courseId={courseId}
              onCancel={handleCancelLesson}
              isEditing={false}
            />
          ) : (
            <button
              onClick={handleAddLesson}
              className="w-full border-2 border-dashed border-slate-600 p-5 rounded-xl text-slate-400 hover:text-blue-400"
            >
              <Plus size={20} /> Add Lecture
            </button>
          )}

          {/* LESSON LIST */}
          {section.lesson?.map((lesson, index) => (
            <LessonItem
              key={lesson._id}
              lesson={lesson}
              lectureIndex={index}
              sectionId={section._id}
              courseId={courseId}
              onDeleteRequest={onDeleteLessonRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionItem;
