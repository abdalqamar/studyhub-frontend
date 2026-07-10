import { useState } from "react";
import { useDeleteSection } from "../section/hooks/useDeleteSection";
import { useDeleteLesson } from "../lesson/hooks/useDeleteLesson";

export const useCourseCurriculum = ({ course, courseId }) => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [creatingSection, setCreatingSection] = useState(false);
  const [modalData, setModalData] = useState(null);

  const deleteSectionMutation = useDeleteSection(courseId);
  const deleteLessonMutation = useDeleteLesson(courseId);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleAddSection = () => setCreatingSection(true);
  const handleCancelSection = () => setCreatingSection(false);

  const confirmDeleteLesson = (sectionId, lessonId) => {
    setModalData({
      type: "delete",
      title: "Delete lesson?",
      message: "This will permanently delete this lesson.",
      details: "This action cannot be undone. All lesson content will be lost.",
      confirmText: "Delete lesson",
      cancelText: "Cancel",
      onConfirm: () => deleteLessonMutation.mutate({ sectionId, lessonId }),
      onClose: () => setModalData(null),
    });
  };

  const confirmDeleteSection = (sectionId) => {
    const section = course?.courseContent?.find((s) => s._id === sectionId);
    const lessonCount = section?.lesson?.length || 0;
    setModalData({
      type: "delete",
      title: "Delete section?",
      message: "This will delete the entire section and all its lessons.",
      details:
        lessonCount > 0
          ? `This section contains ${lessonCount} lesson${lessonCount > 1 ? "s" : ""}. All will be permanently removed.`
          : "This action cannot be undone.",
      confirmText: "Delete section",
      cancelText: "Cancel",
      onConfirm: () => deleteSectionMutation.mutate({ sectionId }),
      onClose: () => setModalData(null),
    });
  };

  const totalLectures =
    course?.courseContent?.reduce(
      (sum, section) => sum + (section?.lesson?.length || 0),
      0
    ) || 0;

  return {
    expandedSections,
    toggleSection,
    creatingSection,
    handleAddSection,
    handleCancelSection,
    confirmDeleteSection,
    confirmDeleteLesson,
    modalData,
    totalLectures,
  };
};
