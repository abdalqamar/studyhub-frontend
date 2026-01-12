import { useNavigate } from "react-router-dom";
import { Edit, Video, FileText } from "lucide-react";
import { useUpdateCourse } from "../../../../hooks/useCourses";
import { errorToast, successToast } from "../../../../utils/toastUtils";

const CoursePreview = ({ course, courseId, onBack, onEditStep }) => {
  const updateCourse = useUpdateCourse(courseId);

  const navigate = useNavigate();
  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No course data found</p>
      </div>
    );
  }

  const totalLectures =
    course?.courseContent?.reduce(
      (sum, sec) => sum + (sec.lesson?.length || 0),
      0
    ) || 0;

  const totalDuration =
    course?.courseContent?.reduce((sum, sec) => {
      const sectionDur = sec.lesson?.reduce(
        (acc, lesson) => acc + (parseInt(lesson.duration) || 0),
        0
      );
      return sum + sectionDur;
    }, 0) || 0;

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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Preview & Submit
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Header */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex flex-col sm:flex-row gap-6">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  className="w-full sm:w-48 h-32 object-cover rounded-lg"
                />
              )}

              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-white break-words">
                    {course.title}
                  </h3>

                  <button
                    onClick={() => onEditStep(1)}
                    className="text-blue-400 hover:text-blue-300 px-3 py-2 border border-blue-400/30 rounded-lg flex items-center gap-2"
                  >
                    <Edit size={16} /> Edit
                  </button>
                </div>

                <p className="text-slate-300">{course.description}</p>

                <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs mt-3">
                  <span>Category: {course.category?.name}</span>
                  <span>• Price: ${course.price}</span>
                  <span>• {course.courseContent?.length || 0} sections</span>
                  <span>• {totalLectures} lectures</span>
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Curriculum</h4>

              <button
                onClick={() => onEditStep(2)}
                className="text-blue-400 hover:text-blue-300 px-3 py-2 border border-blue-400/30 rounded-lg flex items-center gap-2"
              >
                <Edit size={16} /> Edit
              </button>
            </div>

            <div className="space-y-4">
              {course.courseContent?.map((section, si) => (
                <div
                  key={section._id}
                  className="border border-slate-700 p-4 rounded-lg"
                >
                  <h5 className="text-white mb-3 font-semibold">
                    {si + 1}. {section.sectionName}
                  </h5>

                  {section.lesson?.map((lesson, li) => (
                    <div
                      key={lesson._id}
                      className="flex items-center justify-between bg-slate-700 rounded p-3 text-sm"
                    >
                      <div className="flex items-center gap-2 text-white">
                        <Video size={16} className="text-blue-400" />
                        {li + 1}. {lesson.title}
                      </div>

                      {lesson.duration && (
                        <span className="text-slate-400 text-xs bg-slate-600 px-2 py-1 rounded">
                          {lesson.duration} min
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-3">
            <h4 className="text-lg font-bold text-white mb-4">Course Stats</h4>

            <div className="flex justify-between text-sm text-slate-300">
              <span>Sections:</span>
              <span>{course.courseContent?.length || 0}</span>
            </div>

            <div className="flex justify-between text-sm text-slate-300">
              <span>Total Lectures:</span>
              <span>{totalLectures}</span>
            </div>

            <div className="flex justify-between text-sm text-slate-300">
              <span>Total Duration:</span>
              <span>{totalDuration} mins</span>
            </div>
          </div>

          {/* Publish */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
            <h4 className="text-lg font-bold text-white">Publish Course</h4>

            <button
              onClick={handlePublish}
              disabled={updateCourse.isPending}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3
              rounded-lg flex items-center justify-center gap-2
              disabled:opacity-50"
            >
              {updateCourse.isPending ? (
                <>
                  <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <FileText size={16} />
                  Publish Course
                </>
              )}
            </button>

            <button
              disabled={updateCourse.isPending}
              onClick={onBack}
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 py-3 rounded-lg"
            >
              ← Back to Curriculum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
