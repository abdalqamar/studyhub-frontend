import { Plus } from "lucide-react";
import SectionForm from "./section/components/SectionForm";
import SectionList from "./section/components/SectionList";
import CurriculumHeader from "./components/CurriculumHeader";
import CurriculumNavigation from "./components/CurriculumNavigation";
import Modal from "@/shared/components/Modal";
import { useCourseCurriculum } from "./hooks/useCourseCurriculum";

const CourseCurriculum = ({ course, courseId, onNext, onBack }) => {
  const {
    expandedSections,
    toggleSection,
    creatingSection,
    handleAddSection,
    handleCancelSection,
    confirmDeleteSection,
    confirmDeleteLesson,
    modalData,
    totalLectures,
  } = useCourseCurriculum({ course, courseId });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <CurriculumHeader
          sectionsCount={course?.courseContent?.length || 0}
          totalLectures={totalLectures}
        />

        {creatingSection && (
          <SectionForm courseId={courseId} onCancel={handleCancelSection} />
        )}

        <SectionList
          sections={course?.courseContent}
          courseId={courseId}
          expandedSections={expandedSections}
          onToggle={toggleSection}
          onDeleteSection={confirmDeleteSection}
          onDeleteLesson={confirmDeleteLesson}
          creatingSection={creatingSection}
        />

        {!creatingSection && (
          <button
            type="button"
            onClick={handleAddSection}
            className="w-full border border-dashed border-border-strong hover:border-gold/50 rounded-xl p-5 text-text-2 hover:text-gold transition-colors mt-4 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Plus size={18} /> Add new section
          </button>
        )}

        <CurriculumNavigation
          onBack={onBack}
          onNext={onNext}
          nextDisabled={
            !course?.courseContent?.some((sec) => sec?.lesson?.length > 0)
          }
        />
      </div>

      {modalData && <Modal modalData={modalData} />}
    </div>
  );
};

export default CourseCurriculum;
