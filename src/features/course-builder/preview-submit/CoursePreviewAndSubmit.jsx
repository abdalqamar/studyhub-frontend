import CourseHeaderPreview from "./components/CourseHeaderPreview";
import CurriculumPreview from "./components/CurriculumPreview";
import CourseStatsPanel from "./components/CourseStatsPanel";
import PublishPanel from "./components/PublishPanel";
import { useCoursePreviewSubmit } from "./hooks/useCoursePreviewSubmit";

const CoursePreviewAndSubmit = ({ course, courseId, onBack, onEditStep }) => {
  const { totalLectures, totalMinutes, handlePublish, isPending } = useCoursePreviewSubmit({ course, courseId });

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-text-2">No course data found</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <p className="font-mono text-xs tracking-wider text-text-3 uppercase mb-1">step 3</p>
      <h2 className="font-display text-2xl font-medium mb-6">Preview & submit</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <CourseHeaderPreview course={course} totalLectures={totalLectures} onEditStep={onEditStep} />
          <CurriculumPreview sections={course.courseContent} onEditStep={onEditStep} />
        </div>
        <div className="space-y-5">
          <CourseStatsPanel
            sectionsCount={course.courseContent?.length || 0}
            totalLectures={totalLectures}
            totalMinutes={totalMinutes}
          />
          <PublishPanel onPublish={handlePublish} onBack={onBack} isPending={isPending} />
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewAndSubmit;
