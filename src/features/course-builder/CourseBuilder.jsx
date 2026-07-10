import { useCreateCourse } from "./course-details/hooks/useCreateCourse";
import { useCourseById } from "../courses/hooks";
import { useCourseWizardStep } from "./hooks/useCourseWizardStep";
import CourseDetails from "./course-details/CourseDetails";
import CourseCurriculum from "./curriculum/CourseCurriculum";
import CoursePreviewAndSubmit from "./preview-submit/CoursePreviewAndSubmit";
import RenderProgress from "./shared/components/RenderProgress";
import LoadingSpinner from "@/shared/layout/LoadingSpinner";

const STEPS = [
  { id: 1, title: "Course details" },
  { id: 2, title: "Curriculum" },
  { id: 3, title: "Preview & submit" },
];

const CourseBuilder = () => {
  const {
    urlId,
    isEditMode,
    step,
    setStep,
    goToStep2After,
    handleBack,
  } = useCourseWizardStep();

  const { data: course, isLoading, refetch } = useCourseById(urlId);
  const createCourse = useCreateCourse();

  return (
    <>
      {isEditMode && isLoading && !course && <LoadingSpinner />}

      <div className="min-h-screen bg-bg text-text-1 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="font-mono text-xs tracking-wider text-text-3 uppercase mb-2">
              {isEditMode ? "editing course" : "new course"}
            </p>
            <h1 className="font-display text-3xl font-medium">
              {isEditMode ? "Edit course" : "Create new course"}
              {course?.title && (
                <span className="text-gold">: {course.title}</span>
              )}
            </h1>
          </div>

          <RenderProgress steps={STEPS} currentStep={step} />

          <div className="bg-surface rounded-xl border border-border">
            {step === 1 && (
              <CourseDetails
                course={course}
                isEditMode={isEditMode}
                createCourse={createCourse}
                onCreated={goToStep2After}
                onNext={() => setStep(2)}
                onBack={handleBack}
              />
            )}

            {step === 2 && (
              <CourseCurriculum
                course={course}
                courseId={urlId}
                onNext={() => setStep(3)}
                onBack={handleBack}
              />
            )}

            {step === 3 && (
              <CoursePreviewAndSubmit
                course={course}
                courseId={urlId}
                onBack={() => setStep(2)}
                refetch={refetch}
                onEditStep={setStep}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseBuilder;
