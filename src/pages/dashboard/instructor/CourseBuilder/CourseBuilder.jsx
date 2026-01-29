import CoursePreviewAndSubmit from "./CoursePreviewAndSubmit";
import CourseCurriculum from "./CourseCurriculum";
import CourseDetails from "./CourseDetails";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RenderProgress from "../course/components/RenderProgress";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { useCourseById, useCreateCourse } from "../../../../hooks/useCourses";

const CourseBuilder = () => {
  const { courseId: urlId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [draftId, setDraftId] = useState(null);
  const isEditMode = Boolean(urlId);
  const effectiveId = isEditMode ? urlId : draftId;

  const { data: course, isLoading, refetch } = useCourseById(effectiveId);

  useEffect(() => {
    if (!isEditMode) {
      setStep(1);
      setDraftId(null);
    }
  }, [isEditMode]);

  const createCourse = useCreateCourse();

  const handleBack = () => {
    if (step === 2) {
      setStep(1);

      if (!isEditMode) {
        refetch();
      }
      return;
    }

    if (step === 1) {
      navigate("/instructor/manage-courses");
      return;
    }

    setStep(step - 1);
  };

  const steps = [
    { step: 1, id: 1, title: "Course Details" },
    { step: 2, id: 2, title: "Curriculum" },
    { step: 3, id: 3, title: "Preview & Submit" },
  ];

  return (
    <>
      {/* Loading spinner */}
      {isEditMode && isLoading && !course && <LoadingSpinner />}

      <div className="min-h-screen bg-slate-900 text-slate-100 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isEditMode ? "Edit Course" : "Create New Course"}
              {course?.title && `: ${course.title}`}
            </h1>

            <p className="text-slate-400">
              {isEditMode
                ? "Update your course information and content"
                : "Build your course step by step"}
            </p>
          </div>

          {/* Progress Bar */}
          <RenderProgress steps={steps} currentStep={step} />

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700">
            {/* Step 1 */}
            {step === 1 && (
              <CourseDetails
                course={course}
                isEditMode={!!effectiveId}
                createCourse={createCourse}
                onCreated={(createdId) => {
                  setDraftId(createdId);
                  navigate(`/instructor/edit-course/${createdId}`, {
                    replace: true,
                  });
                }}
                onNext={() => setStep(2)}
                onBack={handleBack}
              />
            )}

            {/* Step 2 */}
            {step === 2 && (
              <CourseCurriculum
                course={course}
                courseId={effectiveId}
                onNext={() => setStep(3)}
                setStep={setStep}
                step={step}
                onBack={handleBack}
              />
            )}

            {/* Step 3 */}
            {step === 3 && (
              <CoursePreviewAndSubmit
                course={course}
                courseId={effectiveId}
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
