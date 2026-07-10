import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import { useUpdateCourse } from "../../course-details/hooks/useUpdateCourse";

export const useCoursePreviewSubmit = ({ course, courseId }) => {
  const updateCourse = useUpdateCourse(courseId);
  const navigate = useNavigate();

  const totalLectures =
    course?.courseContent?.reduce((sum, sec) => sum + (sec.lesson?.length || 0), 0) || 0;

  const totalDuration =
    course?.courseContent?.reduce((sum, sec) => {
      const sectionDur = sec.lesson?.reduce((acc, lesson) => acc + (Number(lesson.duration) || 0), 0);
      return sum + sectionDur;
    }, 0) || 0;

  const totalMinutes = Math.round(totalDuration);

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append("status", "pending");
    try {
      await updateCourse.mutateAsync(formData);
      successToast("Course submitted for approval");
      navigate("/instructor/manage-courses");
    } catch (err) {
      errorToast(err?.response?.data?.message || "Failed to publish course");
    }
  };

  return { totalLectures, totalMinutes, handlePublish, isPending: updateCourse.isPending };
};
