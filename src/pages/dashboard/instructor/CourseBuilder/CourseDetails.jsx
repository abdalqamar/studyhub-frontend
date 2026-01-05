import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import BenefitsInput from "./BenefitsInput";
import TagsInput from "./TagsInput";
import FileUploader from "../course/components/FileUploader";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createCourse,
//   updateCourse,
// } from "../../../../features/courses/courseThunk";
// import { fetchCategories } from "../../../../features/category/categoryThunk";
// import { ChevronDown, ChevronRight, IndianRupee } from "lucide-react";
// import { useCategories } from "../../../../hooks/useCategories";

// const CourseDetails = ({ onNext, onBack, isEdit }) => {
//   const { course, loading } = useSelector((state) => state.course);
//   const { data: categories = [], isLoading } = useCategories();
//   const { courseId } = useParams();
//   const dispatch = useDispatch();
//   const [thumbnail, setThumbnail] = useState(null);
//   const [thumbnailError, setThumbnailError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: {
//       courseName: "",
//       courseDescription: "",
//       price: 0,
//       category: "",
//       tags: [],
//       whatYouWillLearn: [""],
//       requirements: "",
//       instructions: "",
//     },
//   });

//   // Fetch categories on mount
//   useEffect(() => {
//     if (!categories || categories.length === 0) {
//       dispatch(fetchCategories());
//     }
//   }, [dispatch]);

//   // Reset form based on mode
//   useEffect(() => {
//     if (isEdit && course) {
//       reset({
//         courseName: course.title || "",
//         courseDescription: course.description || "",
//         price: course.price || 0,
//         category: course.category?._id || course.category || "",
//         tags: course.tags || [],
//         whatYouWillLearn:
//           course.whatYouWillLearn?.length > 0 ? course.whatYouWillLearn : [""],
//         requirements: course.requirements || "",
//         instructions: course.instructions || "",
//       });
//       setThumbnail(course.thumbnail || null);
//     } else if (!isEdit) {
//       // Reset for create mode
//       reset({
//         title: "",
//         description: "",
//         price: 0,
//         category: "",
//         tags: [],
//         whatYouWillLearn: [""],
//         requirements: "",
//         instructions: "",
//       });
//       setThumbnail(null);
//       setThumbnailError("");
//     }
//   }, [course, isEdit, reset]);

//   const handleThumbnailChange = (file) => {
//     setThumbnail(file);
//     setThumbnailError("");
//   };

//   const validateForm = () => {
//     if (!isEdit && !thumbnail) {
//       setThumbnailError("Thumbnail is required");
//       return false;
//     }

//     // Edit mode: Only validate if thumbnail was removed
//     if (isEdit && !thumbnail && !course?.thumbnail) {
//       setThumbnailError("Please upload a thumbnail");
//       return false;
//     }

//     return true;
//   };

//   const onSubmit = async (data) => {
//     if (!validateForm()) {
//       toast.error("Please upload a thumbnail");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("description", data.description);
//       formData.append("price", data.price);
//       formData.append("category", data.category);
//       formData.append("requirements", data.requirements || "");
//       formData.append("instructions", data.instructions || "");

//       // Append arrays
//       data.tags.forEach((tag) => formData.append("tags", tag));
//       data.whatYouWillLearn
//         .filter((item) => item.trim())
//         .forEach((item) => formData.append("whatYouWillLearn", item));

//       if (thumbnail instanceof File) {
//         formData.append("courseThumbnail", thumbnail);
//       }

//       if (isEdit && courseId) {
//         await dispatch(updateCourse({ courseId, formData })).unwrap();
//         toast.success("Course updated successfully!");
//       } else {
//         await dispatch(createCourse(formData)).unwrap();
//         toast.success("Course created successfully!");
//       }

//       onNext();
//     } catch (error) {
//       console.error("Course submission error:", error);
//       toast.error(error?.message || "Failed to save course. Please try again.");
//     }
//   };

//   return (
//     <div className="p-8">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Course Name */}
//         <div>
//           <label
//             htmlFor="title"
//             className="block mb-2 font-medium text-slate-300"
//           >
//             Course Name *
//           </label>
//           <input
//             id="title"
//             type="text"
//             {...register("title", {
//               required: "Course name is required",
//               minLength: {
//                 value: 3,
//                 message: "Course name must be at least 3 characters",
//               },
//               maxLength: {
//                 value: 100,
//                 message: "Course name must be less than 100 characters",
//               },
//             })}
//             className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//             placeholder="Enter your course name"
//           />
//           {errors.title && (
//             <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Course Description */}
//         <div>
//           <label
//             htmlFor="description"
//             className="block mb-2 font-medium text-slate-300"
//           >
//             Course Description *
//           </label>
//           <textarea
//             id="description"
//             rows="4"
//             {...register("description", {
//               required: "Description is required",
//               minLength: {
//                 value: 10,
//                 message: "Description must be at least 10 characters",
//               },
//               maxLength: {
//                 value: 100,
//                 message: "Description must be less than 100 characters",
//               },
//             })}
//             className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
//             placeholder="Describe what students will learn in this course"
//           />
//           {errors.description && (
//             <p className="text-red-400 text-sm mt-1">
//               {errors.description.message}
//             </p>
//           )}
//         </div>

//         {/* Price & Category */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label
//               htmlFor="price"
//               className="block text-sm font-semibold text-slate-300 mb-2"
//             >
//               Price (₹) *
//             </label>

//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 flex items-center justify-center w-10 text-slate-400 border-r border-slate-600/80">
//                 <IndianRupee size={18} />
//               </span>

//               <input
//                 id="price"
//                 type="number"
//                 step="0.01"
//                 {...register("price", {
//                   required: "Price is required",
//                   min: {
//                     value: 0,
//                     message: "Price cannot be negative",
//                   },
//                   max: {
//                     value: 999999,
//                     message: "Price is too high",
//                   },
//                   validate: (value) => {
//                     const num = parseFloat(value);
//                     return !isNaN(num) || "Please enter a valid number";
//                   },
//                 })}
//                 onFocus={() => {
//                   const currentValue = watch("price");
//                   if (parseFloat(currentValue) === 0) {
//                     setValue("price", "", { shouldValidate: true });
//                   }
//                 }}
//                 onBlur={(e) => {
//                   if (e.target.value === "") {
//                     setValue("price", 0, { shouldValidate: true });
//                   }
//                 }}
//                 className="w-full bg-slate-800/80 border border-slate-600 rounded-lg
//                  outline-none transition-colors
//                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
//                  pl-12 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500/80
//                  text-lg font-semibold"
//                 placeholder="399.00"
//               />
//             </div>

//             {errors.price && (
//               <p className="text-red-400 text-sm mt-1">
//                 {errors.price.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="category"
//               className="block mb-2 text-sm font-semibold text-slate-300" // Smaller font for label
//             >
//               Category *
//             </label>
//             <div className="relative">
//               <select
//                 id="category"
//                 className="w-full p-3.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white appearance-none
//                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500/80 outline-none transition-all
//                  disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                 {...register("category", { required: "Category is required" })}
//                 disabled={!categories || categories.length === 0}
//               >
//                 <option value="" className="bg-slate-800 text-slate-400">
//                   Select Category
//                 </option>
//                 {categories?.map((cat) => (
//                   <option
//                     key={cat._id}
//                     value={cat._id}
//                     className="bg-slate-800 text-white"
//                   >
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>

//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
//                 <ChevronDown />
//               </div>
//             </div>
//             {errors.category && (
//               <p className="text-red-400 text-sm mt-1">
//                 {errors.category.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Tags */}
//         <TagsInput
//           register={register}
//           setValue={setValue}
//           watch={watch}
//           maxItems={5}
//         />

//         {/* What you will learn */}
//         <BenefitsInput
//           register={register}
//           setValue={setValue}
//           watch={watch}
//           minItems={1}
//           maxItems={5}
//         />

//         {/* Requirements */}
//         <div>
//           <label
//             htmlFor="requirements"
//             className="block mb-2 font-medium text-slate-300"
//           >
//             Requirements
//             <span className="text-slate-500 text-sm ml-2">(optional)</span>
//           </label>
//           <textarea
//             id="requirements"
//             rows="3"
//             {...register("requirements", {
//               maxLength: {
//                 value: 500,
//                 message: "Requirements must be less than 500 characters",
//               },
//             })}
//             className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
//             placeholder="e.g., Basic understanding of programming"
//           />
//           {errors.requirements && (
//             <p className="text-red-400 text-sm mt-1">
//               {errors.requirements.message}
//             </p>
//           )}
//         </div>

//         {/* Instructions */}
//         <div>
//           <label
//             htmlFor="instructions"
//             className="block mb-2 font-medium text-slate-300"
//           >
//             Instructions
//             <span className="text-slate-500 text-sm ml-2">(optional)</span>
//           </label>
//           <textarea
//             id="instructions"
//             rows="3"
//             {...register("instructions", {
//               maxLength: {
//                 value: 500,
//                 message: "Instructions must be less than 500 characters",
//               },
//             })}
//             className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
//             placeholder="e.g., Complete assignments weekly"
//           />
//           {errors.instructions && (
//             <p className="text-red-400 text-sm mt-1">
//               {errors.instructions.message}
//             </p>
//           )}
//         </div>

//         {/* Thumbnail Upload */}
//         <FileUploader
//           type="image"
//           currentFile={thumbnail}
//           onFileChange={handleThumbnailChange}
//           required={!isEdit}
//           label="Course Thumbnail"
//         />
//         {thumbnailError && (
//           <p className="text-red-400 text-sm mt-1">{thumbnailError}</p>
//         )}

//         {/* Buttons */}
//         <div className="flex justify-between pt-6 border-t border-slate-700">
//           <button
//             type="button"
//             onClick={onBack}
//             disabled={isSubmitting}
//             className="border border-slate-600 hover:border-slate-500 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             disabled={isSubmitting || loading.updateCourse}
//             className=" px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {isSubmitting || loading.updateCourse ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 {isEdit ? "Updating..." : "Creating..."}
//               </>
//             ) : (
//               <span className="flex items-center gap-1.5">
//                 Next
//                 <ChevronRight size={18} className="mt-0.5" />
//               </span>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CourseDetails;

import { IndianRupee, ChevronRight, Loader } from "lucide-react";
import { useUpdateCourse } from "../../../../hooks/useCourses";
import { useCategories } from "../../../../hooks/useCategories";

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
      toast.error("Please upload a thumbnail");
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
          toast.error("Something went wrong, no course ID returned");
          return;
        }

        onCreated(createdId);
        onNext();
        return;
      }

      await updateCourse.mutateAsync(formData);

      toast.success("Course updated successfully!");
      onNext();
    } catch (error) {
      toast.error("Failed to save course");
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
            type="button"
            onClick={onBack}
            className="border border-slate-600 px-4 py-2 rounded-lg"
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
