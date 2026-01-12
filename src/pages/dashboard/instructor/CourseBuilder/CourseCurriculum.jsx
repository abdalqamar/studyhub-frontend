import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import SectionForm from "./SectionForm";
import SectionItem from "./SectionItem";
import {
  useCreateSection,
  useDeleteSection,
  useDeleteLesson,
} from "../../../../hooks/useCourses";
import { errorToast, successToast } from "../../../../utils/toastUtils";
import Modal from "../../../../components/Modal";

const CourseCurriculum = ({ course, courseId, onNext, onBack }) => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [creatingSection, setCreatingSection] = useState(false);
  const [modalData, setModalData] = useState(null);

  const createSectionMutation = useCreateSection(courseId);
  const deleteSectionMutation = useDeleteSection(courseId);
  const deleteLessonMutation = useDeleteLesson(courseId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    reset({ sectionName: "" });
  };

  const handleCancelSection = () => {
    setCreatingSection(false);
    reset();
  };

  const handleSaveSection = (data) => {
    if (!data.sectionName.trim()) return errorToast("Section name is required");

    createSectionMutation.mutate(
      { sectionName: data.sectionName.trim() },
      {
        onSuccess: () => {
          successToast("Section created successfully!");
          setCreatingSection(false);
          reset();
        },
        onError: () => errorToast("Failed to create section"),
      }
    );
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      await deleteSectionMutation.mutateAsync({ sectionId });
      successToast("Section deleted successfully!");
    } catch (err) {
      errorToast("Failed to delete section");
    }
  };

  const handleDeleteLesson = async ({ sectionId, lessonId }) => {
    try {
      await deleteLessonMutation.mutateAsync({ sectionId, lessonId });
      successToast("Lesson deleted successfully!");
    } catch (err) {
      errorToast("Failed to delete lesson");
    }
  };

  // Confirm Delete Lesson
  const confirmDeleteLesson = (sectionId, lessonId) => {
    setModalData({
      type: "delete",
      title: "Delete Lesson?",
      message: "This will permanently delete this lesson.",
      details: "This action cannot be undone. All lesson content will be lost.",
      confirmText: "Delete Lesson",
      cancelText: "Cancel",
      onConfirm: () => handleDeleteLesson({ sectionId, lessonId }),
      onClose: () => setModalData(null),
    });
  };

  // Confirm Delete Section
  const confirmDeleteSection = (sectionId) => {
    const section = course?.courseContent?.find((s) => s._id === sectionId);
    const lessonCount = section?.lesson?.length || 0;

    setModalData({
      type: "delete",
      title: "Delete Section?",
      message: "This will delete the entire section and all its lessons.",
      details:
        lessonCount > 0
          ? `Warning: This section contains ${lessonCount} lesson${
              lessonCount > 1 ? "s" : ""
            }. All will be permanently removed.`
          : "This action cannot be undone.",
      confirmText: "Delete Section",
      cancelText: "Cancel",
      onConfirm: () => handleDeleteSection(sectionId),
      onClose: () => setModalData(null),
    });
  };

  const totalLectures =
    course?.courseContent?.reduce(
      (sum, section) => sum + (section?.lesson?.length || 0),
      0
    ) || 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="px-2 sm:px-0">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Course Curriculum
              </h2>
              <p className="text-slate-400 text-sm">
                Design your course structure
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 shadow-lg">
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

          {/* CREATE SECTION FORM */}
          {creatingSection && (
            <SectionForm
              register={register}
              handleSubmit={handleSubmit}
              onSave={handleSaveSection}
              onCancel={handleCancelSection}
              errors={errors}
              saving={createSectionMutation.isPending}
            />
          )}

          {/* SECTION LIST */}
          {course?.courseContent?.length > 0 ? (
            <div className="space-y-5">
              {course.courseContent.map((section) => (
                <SectionItem
                  key={section._id}
                  section={section}
                  courseId={courseId}
                  isExpanded={expandedSections.includes(section._id)}
                  onToggle={toggleSection}
                  onDeleteRequest={(sectionId) =>
                    confirmDeleteSection(sectionId)
                  }
                  onDeleteLessonRequest={(sectionId, lessonId) =>
                    confirmDeleteLesson(sectionId, lessonId)
                  }
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

          {/* ADD SECTION BUTTON */}
          {!creatingSection && (
            <button
              type="button"
              onClick={handleAddSection}
              className="w-full border-2 border-dashed border-slate-600 hover:border-blue-500/50 rounded-xl p-6 sm:p-8 text-slate-400 hover:text-blue-400 transition-all mt-6 flex items-center justify-center gap-3 hover:bg-blue-500/5 group shadow-lg"
            >
              <Plus
                className="group-hover:rotate-90 transition-transform"
                size={24}
              />
              <span className="font-semibold">Add New Section</span>
            </button>
          )}

          {/* NAVIGATION */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-slate-700">
            <button
              onClick={onBack}
              className="border border-slate-600 hover:border-slate-500 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium"
            >
              ← Previous: Details
            </button>

            <button
              onClick={onNext}
              disabled={
                !course?.courseContent?.some((sec) => sec.lesson?.length > 0)
              }
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white disabled:opacity-50"
            >
              Next: Preview →
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modalData && <Modal modalData={modalData} />}
    </div>
  );
};

export default CourseCurriculum;
