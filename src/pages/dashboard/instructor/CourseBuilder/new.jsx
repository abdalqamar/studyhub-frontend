import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ConfirmationModal from "../../shared/ConfirmationModal";
import SectionForm from "./SectionForm"; // small form component kept external
import FileUploader from "../../shared/FileUploader"; // used by LessonForm
import {
  Plus,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Edit2,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { useSectionCrud } from "../../hooks/useSectionCrud";
import { useLessonCrud } from "../../hooks/useLessonCrud";

/* -------------------------------------------------------------------------- */
/* CourseCurriculum (named export)                                            */
/* -------------------------------------------------------------------------- */
export const CourseCurriculum = ({ course, courseId, onNext, onBack }) => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [creatingSection, setCreatingSection] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { createSection, deleteSection } = useSectionCrud(courseId);

  const {
    register: registerSection,
    handleSubmit: handleSubmitSection,
    reset: resetSection,
    formState: { errors: sectionErrors },
  } = useForm();

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleAddSection = () => {
    setCreatingSection(true);
    resetSection({ sectionName: "" });
  };

  const handleCancelSection = () => {
    setCreatingSection(false);
    resetSection();
  };

  const handleSaveSection = async (data) => {
    if (!data.sectionName?.trim())
      return toast.error("Section name is required");

    try {
      await createSection({ sectionName: data.sectionName.trim() });
      toast.success("Section created");
      setCreatingSection(false);
      resetSection();
    } catch (err) {
      toast.error("Failed to create section");
    }
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      await deleteSection({ sectionId });
      toast.success("Section deleted");
      setShowDeleteModal(false);
      setDeleteTarget(null);
    } catch (err) {
      toast.error("Failed to delete section");
    }
  };

  const totalLectures =
    course?.courseContent?.reduce(
      (total, section) => total + (section?.lesson?.length || 0),
      0
    ) || 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="px-2 sm:px-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Course Curriculum
              </h2>
              <p className="text-slate-400 text-sm">
                Design your course structure
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2.5 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">
                    {course?.courseContent?.length || 0}
                  </div>
                  <div className="text-xs text-slate-500">Sections</div>
                </div>
                <div className="w-px h-8 bg-slate-700"></div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">
                    {totalLectures}
                  </div>
                  <div className="text-xs text-slate-500">Lectures</div>
                </div>
              </div>
            </div>
          </div>

          {creatingSection && (
            <SectionForm
              register={registerSection}
              handleSubmit={handleSubmitSection}
              onSave={handleSaveSection}
              onCancel={handleCancelSection}
              errors={sectionErrors}
              saving={false}
            />
          )}

          {course?.courseContent?.length > 0 ? (
            <div className="space-y-5">
              {course.courseContent.map((section) => (
                <SectionItem
                  key={section._id}
                  section={section}
                  courseId={courseId}
                  isExpanded={expandedSections.includes(section._id)}
                  onToggle={toggleSection}
                  onDeleteRequest={(sectionId) => {
                    setDeleteTarget({ type: "section", sectionId });
                    setShowDeleteModal(true);
                  }}
                />
              ))}
            </div>
          ) : (
            !creatingSection && (
              <div className="text-center py-16 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/30">
                <div className="text-slate-400 mb-4">
                  <div className="flex justify-center mb-4">
                    <Plus
                      size={64}
                      strokeWidth={1.5}
                      className="text-slate-600"
                    />
                  </div>
                  <p className="text-lg font-medium text-white mb-2">
                    No sections added yet
                  </p>
                  <p className="text-sm">
                    Start by creating your first section
                  </p>
                </div>
              </div>
            )
          )}

          {!creatingSection && (
            <button
              type="button"
              onClick={handleAddSection}
              className="w-full border-2 border-dashed border-slate-600 hover:border-blue-500/50 rounded-xl p-6 sm:p-8 text-slate-400 hover:text-blue-400 transition-all mt-6 text-sm sm:text-base flex items-center justify-center gap-3 hover:bg-blue-500/5 group shadow-lg"
            >
              <Plus
                className="group-hover:rotate-90 transition-transform"
                size={24}
              />
              <span className="font-semibold">Add New Section</span>
            </button>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-slate-700">
            <button
              onClick={onBack}
              className="border border-slate-600 hover:border-slate-500 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              ← Previous: Details
            </button>

            <button
              onClick={onNext}
              disabled={
                !course?.courseContent?.some(
                  (section) => section.lesson?.length > 0
                )
              }
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors font-medium text-white disabled:opacity-50"
            >
              Next: Preview →
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmationModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            if (!deleteTarget) return;
            if (deleteTarget.type === "section")
              handleDeleteSection(deleteTarget.sectionId);
          }}
          title={
            deleteTarget?.type === "lesson"
              ? "Delete Lesson?"
              : "Delete Section?"
          }
          message={
            deleteTarget?.type === "lesson"
              ? "This will delete the lesson permanently."
              : "This will delete the entire section and all lessons."
          }
          confirmLabel={
            deleteTarget?.type === "lesson" ? "Delete Lesson" : "Delete Section"
          }
          confirmColor="bg-red-600 hover:bg-red-700"
        />
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SectionItem (named export)                                                  */
/* -------------------------------------------------------------------------- */
export const SectionItem = ({
  section,
  courseId,
  isExpanded,
  onToggle,
  onDeleteRequest,
}) => {
  const [editingSection, setEditingSection] = useState(false);
  const [creatingLesson, setCreatingLesson] = useState(false);

  const { updateSection } = useSectionCrud(courseId);
  const { createLesson, deleteLesson } = useLessonCrud(courseId);

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
    if (!data.sectionName?.trim())
      return toast.error("Section name is required");

    try {
      await updateSection({
        sectionId: section._id,
        sectionName: data.sectionName.trim(),
      });
      toast.success("Section updated successfully");
      setEditingSection(false);
      reset();
    } catch (error) {
      toast.error("Section update failed");
      reset();
    }
  };

  const handleCancelEditSection = () => {
    setEditingSection(false);
    reset();
  };

  const handleAddLesson = () => setCreatingLesson(true);
  const handleCancelLesson = () => setCreatingLesson(false);

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl border border-slate-600/50 shadow-xl">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button type="button" className="text-slate-500 cursor-grab mt-1.5">
              <GripVertical size={18} />
            </button>

            <button
              type="button"
              onClick={() => onToggle(section._id)}
              className="text-slate-300 hover:text-white mt-1.5"
            >
              {isExpanded ? <ChevronDown /> : <ChevronRight />}
            </button>

            <div className="flex-1 min-w-0">
              {editingSection ? (
                <form onSubmit={handleSubmit(handleUpdateSection)}>
                  <input
                    {...register("sectionName", { required: true })}
                    className="w-full bg-slate-700/50 border border-blue-500/50 text-white font-semibold rounded-lg px-3 py-2"
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

          <div className="flex items-center gap-2">
            {editingSection ? (
              <>
                <button
                  type="button"
                  onClick={handleSubmit(handleUpdateSection)}
                  className="text-green-400 p-2 border border-green-400/30"
                >
                  <Save size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleCancelEditSection}
                  className="text-slate-400 p-2 border border-slate-400/30"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleEditSection}
                  className="text-blue-400 p-2 border border-blue-400/30"
                >
                  <Edit2 size={18} />
                </button>

                <button
                  type="button"
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

      {isExpanded && (
        <div className="border-t border-slate-600/50 bg-slate-900/30 p-4 space-y-4">
          {creatingLesson && (
            <LessonForm
              sectionId={section._id}
              courseId={courseId}
              onCancel={handleCancelLesson}
              isEditing={false}
            />
          )}

          {section.lesson?.map((lesson, index) => (
            <LessonItem
              key={lesson._id}
              lesson={lesson}
              lectureIndex={index}
              sectionId={section._id}
              courseId={courseId}
              onDeleteRequest={async (secId, lessonId) => {
                const confirmed = window.confirm("Delete this lesson?");
                if (!confirmed) return;
                try {
                  await deleteLesson({ sectionId: secId, lessonId });
                  toast.success("Lesson deleted");
                } catch (err) {
                  toast.error("Failed to delete lesson");
                }
              }}
            />
          ))}

          {!creatingLesson && (
            <button
              type="button"
              onClick={handleAddLesson}
              className="w-full border-2 border-dashed border-slate-600 p-5 rounded-xl text-slate-400 hover:text-blue-400"
            >
              <Plus size={20} /> Add Lecture
            </button>
          )}
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* LessonItem (named export)                                                   */
/* -------------------------------------------------------------------------- */
export const LessonItem = ({
  lesson,
  lectureIndex,
  sectionId,
  courseId,
  onDeleteRequest,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateLesson, deleteLesson } = useLessonCrud(courseId);

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this lesson?");
    if (!confirmed) return;
    try {
      await deleteLesson({ sectionId, lessonId: lesson._id });
      toast.success("Lesson deleted");
    } catch (err) {
      toast.error("Failed to delete lesson");
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 rounded-xl p-4 sm:p-5 space-y-4 border border-slate-600/30 hover:border-slate-500/50 transition-all shadow-lg">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-bold border border-blue-500/30">
            {lectureIndex + 1}
          </span>
          <h4 className="text-slate-300 font-medium text-sm">
            Lecture {lectureIndex + 1}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? null : (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="text-blue-400 hover:text-blue-300 p-1.5 rounded-lg hover:bg-blue-400/10 transition-all border border-blue-400/30"
              >
                <Edit2 size={16} />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-400/10 transition-all border border-red-400/30"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

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

/* -------------------------------------------------------------------------- */
/* LessonForm (named export)                                                   */
/* -------------------------------------------------------------------------- */
export const LessonForm = ({
  sectionId,
  courseId,
  onCancel,
  isEditing = false,
  editingLesson = null,
}) => {
  const [lessonVideoFile, setLessonVideoFile] = useState(null);
  const { createLesson, updateLesson } = useLessonCrud(courseId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing
      ? {
          title: editingLesson?.title || "",
          description: editingLesson?.description || "",
        }
      : { title: "", description: "" },
  });

  const handleSaveLesson = async (data) => {
    if (!data.title?.trim() || !data.description?.trim()) {
      toast.error("Title and description are required");
      return;
    }

    if (!isEditing && !lessonVideoFile) {
      toast.error("Please upload a video file");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("description", data.description.trim());
    if (lessonVideoFile) formData.append("videoFile", lessonVideoFile);

    try {
      if (isEditing) {
        await updateLesson({
          lessonId: editingLesson._id,
          sectionId: editingLesson.sectionId,
          formData,
        });
        toast.success("Lesson updated successfully!");
      } else {
        await createLesson({ courseId, sectionId, formData });
        toast.success("Lesson created successfully!");
      }

      onCancel();
    } catch (error) {
      toast.error(
        isEditing ? "Failed to update lesson" : "Failed to create lesson"
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-xl p-5 border border-blue-500/30">
      <h4 className="text-white font-semibold mb-4">
        {isEditing ? "Edit Lesson" : "Create New Lesson"}
      </h4>

      <form onSubmit={handleSubmit(handleSaveLesson)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Lecture Title *
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all"
            placeholder="Enter lecture title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all"
            placeholder="Enter lesson description"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Video File {isEditing && editingLesson?.videoUrl && "(Optional)"}
            {!isEditing && " *"}
          </label>
          <FileUploader
            type="video"
            currentFile={lessonVideoFile || editingLesson?.videoUrl}
            onFileChange={setLessonVideoFile}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium text-white disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={16} />
            {isEditing ? "Update Lesson" : "Create Lesson"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors font-medium text-white disabled:opacity-50 flex items-center gap-2"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
