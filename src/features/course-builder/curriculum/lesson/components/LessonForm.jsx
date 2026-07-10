import LessonFormFields from "./LessonFormFields";
import LessonVideoUpload from "./LessonVideoUpload";
import LessonFormActions from "./LessonFormActions";
import { useLessonForm } from "../hooks/useLessonForm";

const LessonForm = ({ sectionId, courseId, onCancel, isEditing = false, editingLesson = null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    lessonVideoFile,
    setLessonVideoFile,
    uploadProgress,
    isUploading,
    handleSaveLesson,
  } = useLessonForm({ sectionId, courseId, isEditing, editingLesson, onCancel });

  return (
    <div className="bg-surface-2 rounded-xl p-4 sm:p-5 border border-teal/30">
      <h4 className="font-display text-sm mb-4">{isEditing ? "Edit lesson" : "New lesson"}</h4>
      <form onSubmit={handleSubmit(handleSaveLesson)} className="space-y-4">
        <LessonFormFields register={register} errors={errors} disabled={isUploading} />
        <LessonVideoUpload
          videoFile={lessonVideoFile}
          onChange={setLessonVideoFile}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />
        <LessonFormActions onCancel={onCancel} isUploading={isUploading} isEditing={isEditing} />
      </form>
    </div>
  );
};

export default LessonForm;
