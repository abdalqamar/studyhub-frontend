// import { useEffect } from "react";
// import FileUploader from "./FileUploader";
// import { fetchCategories } from "../../../../../features/category/categoryThunk";
// import { useDispatch, useSelector } from "react-redux";

// const CourseDetails = ({
//   register,
//   errors,
//   control,
//   setValue,
//   updateFormData,
//   formData,
// }) => {
//   const dispatch = useDispatch();

//   const { categories, isLoading } = useSelector((state) => state.categories);

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, []);

//   useEffect(() => {
//     // Set form values when component mounts
//     Object.keys(formData).forEach((key) => {
//       if (formData[key] !== undefined && formData[key] !== null) {
//         setValue(key, formData[key]);
//       }
//     });
//   }, [formData, setValue]);

//   const handleInputChange = (field, value) => {
//     setValue(field, value);
//     const currentData = {
//       ...formData,
//       [field]: value,
//     };
//     updateFormData("step1", currentData);
//   };

//   const handleThumbnailChange = (file) => {
//     setValue("courseThumbnail", file);
//     const currentData = {
//       ...formData,
//       courseThumbnail: file,
//     };
//     updateFormData("step1", currentData);
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-white mb-6">Course Details</h2>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Course Title *
//             </label>
//             <input
//               {...register("courseName", {
//                 required: "Course title is required",
//                 minLength: {
//                   value: 5,
//                   message: "Title must be at least 5 characters",
//                 },
//               })}
//               type="text"
//               onChange={(e) => handleInputChange("courseName", e.target.value)}
//               className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter course title"
//               defaultValue={formData.courseName}
//             />
//             {errors.courseName && (
//               <p className="text-red-400 text-sm mt-1">
//                 {errors.courseName.message}
//               </p>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Description *
//             </label>
//             <textarea
//               {...register("courseDescription", {
//                 required: "Description is required",
//                 minLength: {
//                   value: 20,
//                   message: "Description must be at least 20 characters",
//                 },
//               })}
//               rows={2}
//               onChange={(e) =>
//                 handleInputChange("courseDescription", e.target.value)
//               }
//               className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Describe what students will learn in this course"
//               defaultValue={formData.courseDescription}
//             />
//             {errors.courseDescription && (
//               <p className="text-red-400 text-sm mt-1">
//                 {errors.courseDescription.message}
//               </p>
//             )}
//           </div>

//           {/* Category */}
// <div className="grid grid-cols-2 gap-4">
//   <div>
//     <label className="block text-sm font-medium text-slate-300 mb-2">
//       Category *
//     </label>
//     <select
//       {...register("category", { required: "Category is required" })}
//       onChange={(e) => handleInputChange("category", e.target.value)}
//       className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//       defaultValue={formData.category}
//     >
//       <option value="">Select category</option>
//       {categories?.map((category) => (
//         <option key={category._id} value={category?.name}>
//           {category?.name}
//         </option>
//       ))}
//     </select>
//     {errors.category && (
//       <p className="text-red-400 text-sm mt-1">
//         {errors.category.message}
//       </p>
//     )}
//   </div>
//             {/* Price  */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Price (INR) *
//             </label>
//             <input
//               id="price"
//               type="number"
//               {...register("price", {
//                 required: "Price is required",
//                 min: { value: 0, message: "Price must be at least 0" },
//                 valueAsNumber: true,
//               })}
//               onChange={(e) =>
//                 handleInputChange("price", Number(e.target.value))
//               }
//               className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent
// [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//               placeholder="3999"
//               defaultValue={formData.price}
//             />

//             {errors.price && (
//               <p className="text-red-400 text-sm mt-1">
//                 {errors.price.message}
//               </p>
//             )}
//           </div>
//           </div>

//           {/* Tags */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Tags
//             </label>
//             <input
//               {...register("tags")}
//               type="text"
//               onChange={(e) => handleInputChange("tags", e.target.value)}
//               className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="React, JavaScript, Web Development (comma separated)"
//               defaultValue={formData.tags}
//             />
//             <p className="text-slate-400 text-sm mt-1">
//               Add relevant tags to help students find your course
//             </p>
//           </div>
//           {/* courseBenefits */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Course Benefits *
//             </label>
//             <textarea
//               {...register("benefits", {
//                 required: "benefits are required",
//               })}
//               rows={2}
//               onChange={(e) => handleInputChange("benefits", e.target.value)}
//               className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter benefits of the course"
//               defaultValue={formData.benefits}
//             />
//             {errors.benefits && (
//               <p className="text-red-400 text-sm mt-1">
//                 {errors.benefits.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Instructions */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Course Instructions *
//             </label>
//             <textarea
//               {...register("instructions", {
//                 required: "Instructions are required",
//               })}
//               rows={4}
//               onChange={(e) =>
//                 handleInputChange("instructions", e.target.value)
//               }
//               className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="What should students know before taking this course?"
//               defaultValue={formData.instructions}
//             />
//             {errors.instructions && (
//               <p className="text-red-400 text-sm mt-1">
//                 {errors.instructions.message}
//               </p>
//             )}
//           </div>

//           {/* Thumbnail Upload */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Course Thumbnail *
//             </label>
//             <FileUploader
//               type="image"
//               onFileChange={handleThumbnailChange}
//               currentFile={formData.courseThumbnail}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IndianRupee } from "lucide-react";

import FileUploader from "./FileUploader";
import { fetchCategories } from "../../../../../features/category/categoryThunk";
import {
  createCourse,
  updateCourse,
} from "../../../../../features/courses/courseThunk";

const CourseDetails = ({ isEdit = false, onNext }) => {
  const { course, loading } = useSelector((state) => state.course);
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    watch,
    getValues,
  } = useForm({
    defaultValues: isEdit
      ? course
      : {
          courseName: "",
          courseDescription: "",
          price: 0,
          category: "",
          tags: [],
          benefits: [],
          requirements: [],
        },
  });

  const handleThumbnailChange = (file) => {
    setThumbnailFile(file);
    toast.error("thumbnail is required");
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        await dispatch(fetchCategories());
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    loadCategories();
  }, [dispatch]);

  // Set form values when course data is available in edit mode
  useEffect(() => {
    if (isEdit && course) {
      setValue("courseName", course.courseName || "");
      setValue("courseDescription", course.courseDescription || "");
      setValue("price", course.price || 0);
      setValue("category", course.category || "");
      setValue("tags", course.tags || []);
      setValue("benefits", course.whatYouWillLearn || []);
      setValue("requirements", course.requirements || []);
    }
  }, [isEdit, course, setValue]);

  const onSubmit = async (data) => {
    console.log("Form data:", data);

    // Validate thumbnail
    if (!thumbnailFile && !course?.thumbnail) {
      toast.error("Please upload a course thumbnail");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("courseName", data.courseName || "");
      formData.append("courseDescription", data.courseDescription || "");
      formData.append("price", data.price || 0);
      formData.append("category", data.category || "");

      // Handle arrays - convert to comma-separated strings
      if (data.tags && Array.isArray(data.tags)) {
        formData.append("tag", data.tags.join(","));
      } else {
        formData.append("tag", "");
      }

      if (data.benefits && Array.isArray(data.benefits)) {
        formData.append("whatYouWillLearn", data.benefits.join(","));
      } else {
        formData.append("whatYouWillLearn", "");
      }

      if (data.requirements && Array.isArray(data.requirements)) {
        formData.append("instructions", data.requirements.join(","));
      } else {
        formData.append("instructions", "");
      }

      // Handle thumbnail
      if (thumbnailFile) {
        formData.append("courseThumbnail", thumbnailFile);
      } else if (isEdit && course?.thumbnail) {
        formData.append("existingThumbnail", course.thumbnail);
      }

      // Add status for new courses
      if (!isEdit) {
        formData.append("status", "pending");
      }

      let result;
      if (isEdit) {
        console.log("Updating course:", course._id);
        result = await dispatch(
          updateCourse({
            formData,
            courseId: course._id,
          })
        ).unwrap();
      } else {
        result = await dispatch(createCourse(formData)).unwrap();
      }

      if (result) {
        dispatch(setCourse(result));
        toast.success(
          isEdit
            ? "Course updated successfully!"
            : "Course created successfully!"
        );
        onNext();
      }
    } catch (error) {
      console.error("Failed to save course details:", error);
      toast.error(error.message || "Failed to save course details");
    }
  };

  return (
    <div className="course-details-form">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Course Title */}
        <div className="form-group">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Course Title *
          </label>
          <input
            {...register("courseName", {
              required: "Course title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            })}
            type="text"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter course title"
          />
          {errors.courseName && (
            <span className="text-red-400 text-sm mt-1 block">
              {errors.courseName.message}
            </span>
          )}
        </div>

        {/* Short Description */}
        <div className="form-group">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Short Description *
          </label>
          <textarea
            {...register("courseDescription", {
              required: "Short description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
              maxLength: {
                value: 200,
                message: "Description must be less than 250 characters",
              },
            })}
            placeholder="Brief description of your course (max 250 characters)"
            rows="3"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.courseDescription && (
            <span className="text-red-400 text-sm mt-1 block">
              {errors.courseDescription.message}
            </span>
          )}
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-slate-300">
              Course Price <sup className="text-pink-200">*</sup>
            </label>
            <div className="relative">
              <input
                id="price"
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be at least 0" },
                  valueAsNumber: true,
                })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="3999"
              />
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
            </div>
            {errors.price && (
              <span className="text-red-400 text-sm mt-1 block">
                {errors.price.message}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Category *
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              disabled={categoriesLoading}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              <option value="">
                {categoriesLoading
                  ? "Loading categories..."
                  : "Select category"}
              </option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Thumbnail Upload with FileUploader */}
        <div className="form-group">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Course Thumbnail *
          </label>
          <FileUploader
            type="image"
            onFileChange={handleThumbnailChange}
            currentFile={course?.thumbnail || thumbnailFile}
            accept="image/*"
          />
        </div>

        {/* Benefits - Dynamic List */}
        <div className="form-group">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            What students will learn *
          </label>
          <BenefitsInput
            register={register}
            setValue={setValue}
            watch={watch}
            minItems={3}
            maxItems={10}
            error={errors.benefits}
          />
          <small className="text-slate-400 text-xs mt-1 block">
            Add at least 3 key learning outcomes
          </small>
          {errors.benefits && (
            <span className="text-red-400 text-sm mt-1 block">
              {errors.benefits.message}
            </span>
          )}
        </div>

        {/* Requirements */}
        <div className="form-group">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Requirements
          </label>
          <RequirementsInput
            register={register}
            setValue={setValue}
            watch={watch}
            maxItems={5}
          />
          <small className="text-slate-400 text-xs mt-1 block">
            What students should know before taking this course
          </small>
        </div>

        {/* Tags */}
        <div className="form-group">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tags
          </label>
          <TagsInput
            register={register}
            setValue={setValue}
            watch={watch}
            maxItems={5}
          />
          <small className="text-slate-400 text-xs mt-1 block">
            Add relevant tags to help students find your course
          </small>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-700">
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                {isEdit ? "Updating..." : "Creating..."}
              </span>
            ) : (
              "Next →"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const BenefitsInput = ({
  register,
  setValue,
  watch,
  minItems = 3,
  maxItems = 10,
}) => {
  const benefits = watch("whatYouWillLearn") || [];

  const addBenefit = () => {
    if (whatYouWillLearn.length < maxItems) {
      setValue("whatYouWillLearn", [...whatYouWillLearn, ""]);
    }
  };

  const updateBenefit = (index, value) => {
    const updated = [...whatYouWillLearn];
    updated[index] = value;
    setValue("benefits", updated);
  };

  const removeBenefit = (index) => {
    const updated = benefits.filter((_, i) => i !== index);
    setValue("benefits", updated);
  };

  return (
    <div className="space-y-3">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex gap-2 items-start">
          <input
            {...register(`whatYouWillLearn.${index}`, {
              required: index < minItems ? "This benefit is required" : false,
              minLength: { value: 5, message: "Benefit must be meaningful" },
            })}
            value={benefit}
            onChange={(e) => updateBenefit(index, e.target.value)}
            placeholder={`Learning outcome ${index + 1}`}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {benefits.length > minItems && (
            <button
              type="button"
              onClick={() => removeBenefit(index)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors text-sm"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {whatYouWillLearn.length < maxItems && (
        <button
          type="button"
          onClick={addBenefit}
          className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
        >
          + Add Learning Outcome
        </button>
      )}

      {whatYouWillLearn.length >= maxItems && (
        <small className="text-yellow-400 text-xs block">
          Maximum {maxItems} benefits allowed
        </small>
      )}
    </div>
  );
};

const RequirementsInput = ({ register, setValue, watch, maxItems = 5 }) => {
  const requirements = watch("requirements") || [];

  const addRequirement = () => {
    if (requirements.length < maxItems) {
      setValue("requirements", [...requirements, ""]);
    }
  };

  const updateRequirement = (index, value) => {
    const updated = [...requirements];
    updated[index] = value;
    setValue("requirements", updated);
  };

  const removeRequirement = (index) => {
    const updated = requirements.filter((_, i) => i !== index);
    setValue("requirements", updated);
  };

  return (
    <div className="space-y-3">
      {requirements.map((requirement, index) => (
        <div key={index} className="flex gap-2 items-start">
          <input
            value={requirement}
            onChange={(e) => updateRequirement(index, e.target.value)}
            placeholder={`Requirement ${index + 1}`}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => removeRequirement(index)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      {requirements.length < maxItems && (
        <button
          type="button"
          onClick={addRequirement}
          className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
        >
          + Add Requirement
        </button>
      )}
    </div>
  );
};

const TagsInput = ({ register, setValue, watch, maxItems = 5 }) => {
  const tags = watch("tags") || [];

  const addTag = () => {
    if (tags.length < maxItems) {
      setValue("tags", [...tags, ""]);
    }
  };

  const updateTag = (index, value) => {
    const updated = [...tags];
    updated[index] = value;
    setValue("tags", updated);
  };

  const removeTag = (index) => {
    const updated = tags.filter((_, i) => i !== index);
    setValue("tags", updated);
  };

  return (
    <div className="space-y-3">
      {tags.map((tag, index) => (
        <div key={index} className="flex gap-2 items-start">
          <input
            value={tag}
            onChange={(e) => updateTag(index, e.target.value)}
            placeholder={`Tag ${index + 1}`}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      {tags.length < maxItems && (
        <button
          type="button"
          onClick={addTag}
          className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
        >
          + Add Tag
        </button>
      )}
    </div>
  );
};

export default CourseDetails;

// const BenefitsInput = ({
//   register,
//   setValue,
//   watch,
//   minItems = 3,
//   maxItems = 10,
// }) => {
//   const benefits = watch("benefits") || [];

//   const addBenefit = () => {
//     if (benefits.length < maxItems) {
//       setValue("benefits", [...benefits, ""]);
//     }
//   };

//   const updateBenefit = (index, value) => {
//     const updated = [...benefits];
//     updated[index] = value;
//     setValue("benefits", updated);
//   };

//   const removeBenefit = (index) => {
//     const updated = benefits.filter((_, i) => i !== index);
//     setValue("benefits", updated);
//   };

//   return (
//     <div className="space-y-3">
//       {benefits.map((benefit, index) => (
//         <div key={index} className="flex gap-2 items-start">
//           <input
//             {...register(`benefits.${index}`, {
//               required: index < minItems ? "This benefit is required" : false,
//               minLength: { value: 5, message: "Benefit must be meaningful" },
//             })}
//             value={benefit}
//             onChange={(e) => updateBenefit(index, e.target.value)}
//             placeholder={`Learning outcome ${index + 1}`}
//             className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           {benefits.length > minItems && (
//             <button
//               type="button"
//               onClick={() => removeBenefit(index)}
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors text-sm"
//             >
//               Remove
//             </button>
//           )}
//         </div>
//       ))}

//       {benefits.length < maxItems && (
//         <button
//           type="button"
//           onClick={addBenefit}
//           className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
//         >
//           + Add Learning Outcome
//         </button>
//       )}

//       {benefits.length >= maxItems && (
//         <small className="text-yellow-400 text-xs block">
//           Maximum {maxItems} benefits allowed
//         </small>
//       )}
//     </div>
//   );
// };

// const RequirementsInput = ({ register, setValue, watch, maxItems = 5 }) => {
//   const requirements = watch("requirements") || [];

//   const addRequirement = () => {
//     if (requirements.length < maxItems) {
//       setValue("requirements", [...requirements, ""]);
//     }
//   };

//   const updateRequirement = (index, value) => {
//     const updated = [...requirements];
//     updated[index] = value;
//     setValue("requirements", updated);
//   };

//   const removeRequirement = (index) => {
//     const updated = requirements.filter((_, i) => i !== index);
//     setValue("requirements", updated);
//   };

//   return (
//     <div className="space-y-3">
//       {requirements.map((requirement, index) => (
//         <div key={index} className="flex gap-2 items-start">
//           <input
//             value={requirement}
//             onChange={(e) => updateRequirement(index, e.target.value)}
//             placeholder={`Requirement ${index + 1}`}
//             className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           <button
//             type="button"
//             onClick={() => removeRequirement(index)}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors text-sm"
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       {requirements.length < maxItems && (
//         <button
//           type="button"
//           onClick={addRequirement}
//           className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
//         >
//           + Add Requirement
//         </button>
//       )}
//     </div>
//   );
// };

// const TagsInput = ({ register, setValue, watch, maxItems = 5 }) => {
//   const tags = watch("tags") || [];

//   const addTag = () => {
//     if (tags.length < maxItems) {
//       setValue("tags", [...tags, ""]);
//     }
//   };

//   const updateTag = (index, value) => {
//     const updated = [...tags];
//     updated[index] = value;
//     setValue("tags", updated);
//   };

//   const removeTag = (index) => {
//     const updated = tags.filter((_, i) => i !== index);
//     setValue("tags", updated);
//   };

//   return (
//     <div className="space-y-3">
//       {tags.map((tag, index) => (
//         <div key={index} className="flex gap-2 items-start">
//           <input
//             value={tag}
//             onChange={(e) => updateTag(index, e.target.value)}
//             placeholder={`Tag ${index + 1}`}
//             className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           <button
//             type="button"
//             onClick={() => removeTag(index)}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors text-sm"
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       {tags.length < maxItems && (
//         <button
//           type="button"
//           onClick={addTag}
//           className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
//         >
//           + Add Tag
//         </button>
//       )}
//     </div>
//   );
// };
