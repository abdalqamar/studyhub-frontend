import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BenefitsInput from "./BenefitsInput";
import TagsInput from "./TagsInput";
import FileUploader from "../course/components/FileUploader";
import { ChevronRight, Loader } from "lucide-react";
import { useUpdateCourse } from "../../../../hooks/useCourses";
import { useCategories } from "../../../../hooks/useCategories";
import { errorToast, successToast } from "../../../../utils/toastUtils";

const CourseDetails = ({
  course,
  isEditMode,
  createCourse,
  onCreated,
  onNext,

  onBack,
}) => {
  const { data: categories = [] } = useCategories();
  const updateCourse = useUpdateCourse(course?._id);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      tags: [],
      whatYouWillLearn: [""],
      requirements: "",
      instructions: "",
    },
  });

  useEffect(() => {
    if (isEditMode && course) {
      reset({
        title: course?.title || "",
        description: course?.description || "",
        price: course?.price || 0,
        category: course?.category?._id || course?.category || "",
        tags: course?.tags || [],
        whatYouWillLearn:
          course?.whatYouWillLearn?.length > 0 ? course.whatYouWillLearn : [""],
        requirements: course?.requirements || "",
        instructions: course?.instructions || "",
      });

      setThumbnail(course.thumbnail);
    }
  }, [course, isEditMode]);

  useEffect(() => {
    if (!isEditMode) {
      reset({
        title: "",
        description: "",
        price: 0,
        category: "",
        tags: [],
        whatYouWillLearn: [""],
        requirements: "",
        instructions: "",
      });

      setThumbnail(null);
      setThumbnailError("");
    }
  }, [isEditMode]);

  const validateForm = () => {
    if (!isEditMode && !thumbnail) {
      setThumbnailError("Thumbnail is required");
      return false;
    }

    if (isEditMode && !thumbnail && !course?.thumbnail) {
      setThumbnailError("Thumbnail is required");
      return false;
    }

    return true;
  };

  const onSubmit = async (data) => {
    if (isEditMode && !isDirty && !(thumbnail instanceof File)) {
      onNext();

      return;
    }

    if (!validateForm()) {
      errorToast("Please upload a thumbnail");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("requirements", data.requirements);
    formData.append("instructions", data.instructions);

    data.tags.forEach((tag) => formData.append("tags", tag));
    data.whatYouWillLearn
      .filter((item) => item.trim())
      .forEach((item) => formData.append("whatYouWillLearn", item));

    if (thumbnail instanceof File) {
      formData.append("courseThumbnail", thumbnail);
    }

    try {
      //create mode
      if (!isEditMode) {
        const response = await createCourse.mutateAsync(formData);

        const createdId = response?._id;

        if (!createdId) {
          errorToast("Something went wrong, no course ID returned");
          return;
        }

        onCreated(createdId);
        onNext();
        return;
      }

      await updateCourse.mutateAsync(formData);

      successToast("Course updated successfully!");
      onNext();
    } catch (error) {
      errorToast("Failed to save course");
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium text-slate-300">
            Course Name *
          </label>
          <input
            type="text"
            {...register("title", {
              required: "Course name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters required",
              },
            })}
            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-slate-300">
            Description *
          </label>
          <textarea
            rows="4"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-2">Price (₹)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg"
            />
            {errors.price && (
              <p className="text-red-400 text-sm mt-1">Price required</p>
            )}
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Category *</label>
            <select
              {...register("category", { required: true })}
              className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg"
            >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">Category required</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <TagsInput register={register} setValue={setValue} watch={watch} />

        {/* What You Will Learn */}
        <BenefitsInput register={register} setValue={setValue} watch={watch} />

        {/* Requirements */}
        <div>
          <label className="block mb-2 font-medium text-slate-300">
            Requirements
          </label>
          <textarea
            rows="3"
            {...register("requirements")}
            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg"
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block mb-2 font-medium text-slate-300">
            Instructions
          </label>
          <textarea
            rows="3"
            {...register("instructions")}
            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg"
          />
        </div>

        {/* Thumbnail */}
        <FileUploader
          type="image"
          currentFile={thumbnail}
          onFileChange={(file) => {
            setThumbnail(file);
            setThumbnailError("");
          }}
          required={!isEditMode}
        />

        {thumbnailError && (
          <p className="text-red-400 text-sm mt-1">{thumbnailError}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-between pt-6 border-t border-slate-700">
          <button
            disabled={updateCourse.isPending}
            type="button"
            onClick={onBack}
            className="border disabled:cursor-not-allowed border-slate-600 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updateCourse.isPending || createCourse.isPending}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative flex items-center justify-center gap-2 text-white">
              {updateCourse.isPending || createCourse.isPending ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
              {isEditMode ? (isDirty ? "Update" : "Next") : "Next"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseDetails;
