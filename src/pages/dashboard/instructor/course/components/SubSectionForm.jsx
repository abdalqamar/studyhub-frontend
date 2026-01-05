import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createLesson } from "../../../../../features/courses/courseThunk";
import FileUploader from "./FileUploader";

const SubSectionForm = ({ sectionId, lecture, mode, onSuccess, onCancel }) => {
  const { course } = useSelector((state) => state.course);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  // Set form values when editing or viewing
  useEffect(() => {
    if (lecture) {
      reset({
        title: lecture.title,
        description: lecture.description,
        duration: lecture.duration,
      });
      if (lecture.videoUrl) setVideoPreview(lecture.videoUrl);
    }
  }, [lecture, reset]);

  const isViewMode = mode === "view";

  const onSubmit = async (data) => {
    if (isViewMode) {
      onCancel();
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("sectionId", sectionId);
      formData.append("courseId", course._id);

      // Append form data
      Object.keys(data).forEach((key) => {
        if (key === "video" && data[key][0]) {
          formData.append("video", data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const response = lecture
        ? await updateSubSection({
            ...data,
            subSectionId: lecture._id,
            sectionId,
            courseId: course._id,
          })
        : await dispatch(createLesson(formData));

      if (response) {
        onSuccess(response);
      }
    } catch (error) {
      console.error("Failed to save lecture:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {isViewMode
                ? "View Lecture"
                : lecture
                ? "Edit Lecture"
                : "Add New Lecture"}
            </h2>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-white transition-colors text-lg"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Lecture Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Lecture Title *
              </label>
              <input
                {...register("title", {
                  required: "Lecture title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                type="text"
                placeholder="Enter lecture title"
                disabled={isViewMode}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.title ? "border-red-500" : "border-slate-600"
                } ${isViewMode ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Lecture Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                {...register("description", {
                  maxLength: { value: 500, message: "Description too long" },
                })}
                placeholder="Enter lecture description"
                rows="3"
                disabled={isViewMode}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.description ? "border-red-500" : "border-slate-600"
                } ${isViewMode ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Video Upload (only for add/edit) */}
            {!isViewMode && (
              <FileUploader
                type="video"
                onFileChange={handleVideoChange}
                currentFile={course?.videoUrl || videoPreview}
                accept="image/*"
              />
            )}

            {/* Video Preview */}
            {(videoPreview || lecture?.videoUrl) && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Video Preview
                </label>
                <div className="video-preview bg-black rounded-lg overflow-hidden">
                  <video
                    controls
                    className="w-full h-48 object-contain bg-black"
                  >
                    <source
                      src={videoPreview || lecture.videoUrl}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration (minutes)
              </label>
              <input
                {...register("duration", {
                  min: {
                    value: 1,
                    message: "Duration must be at least 1 minute",
                  },
                })}
                type="number"
                placeholder="Enter duration in minutes"
                disabled={isViewMode}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.duration ? "border-red-500" : "border-slate-600"
                } ${isViewMode ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
              {isViewMode ? (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Close
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </span>
                    ) : lecture ? (
                      "Update Lecture"
                    ) : (
                      "Create Lecture"
                    )}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubSectionForm;
