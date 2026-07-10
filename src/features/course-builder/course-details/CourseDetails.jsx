import { useCourseDetailsForm } from "./hooks/useCourseDetailsForm";
import CourseDetailsFields from "./components/CourseDetailsFields";
import CourseThumbnailField from "./components/CourseThumbnailField";
import CourseFormActions from "./components/CourseFormActions";

const CourseDetails = ({
  course,
  isEditMode,
  createCourse,
  onCreated,
  onNext,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    thumbnail,
    thumbnailError,
    setThumbnail,
    setThumbnailError,
    isPending,
    onSubmit,
  } = useCourseDetailsForm({
    course,
    isEditMode,
    createCourse,
    onCreated,
    onNext,
  });

  return (
    <div className="p-6 sm:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <CourseDetailsFields
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
        <CourseThumbnailField
          thumbnail={thumbnail}
          thumbnailError={thumbnailError}
          isEditMode={isEditMode}
          onChange={(file) => {
            setThumbnail(file);
            setThumbnailError("");
          }}
        />
        <CourseFormActions
          onBack={onBack}
          isPending={isPending}
          isEditMode={isEditMode}
          isDirty={isDirty}
        />
      </form>
    </div>
  );
};

export default CourseDetails;
