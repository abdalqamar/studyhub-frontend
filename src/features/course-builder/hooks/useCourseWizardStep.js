import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

export const useCourseWizardStep = () => {
  const { courseId: urlId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isEditMode = Boolean(urlId);
  const step = Number(searchParams.get("step")) || 1;

  const setStep = (n) =>
    setSearchParams({ step: String(n) }, { replace: true });

  useEffect(() => {
    if (!isEditMode && !searchParams.get("step")) {
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode]);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      return;
    }
    navigate("/instructor/manage-courses");
  };

  const goToStep2After = (createdId) => {
    navigate(`/instructor/edit-course/${createdId}?step=2`, { replace: true });
  };

  return { urlId, isEditMode, step, setStep, handleBack, goToStep2After };
};
