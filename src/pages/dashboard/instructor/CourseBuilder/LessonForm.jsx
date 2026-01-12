// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import FileUploader from "../course/components/FileUploader";
// import { Save, X } from "lucide-react";
// import { useCreateLesson, useUpdateLesson } from "../../../../hooks/useCourses";
// import { successToast } from "../../../../utils/toastUtils";

// const LessonForm = ({
//   sectionId,
//   courseId,
//   onCancel,
//   isEditing = false,
//   editingLesson = null,
// }) => {
//   const [lessonVideoFile, setLessonVideoFile] = useState(null);

//   // Query Mutations
//   const createLessonMutation = useCreateLesson(courseId);
//   const updateLessonMutation = useUpdateLesson(courseId);

//   const isUploading =
//     createLessonMutation.isPending || updateLessonMutation.isPending;

//   // react-hook-form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: isEditing
//       ? {
//           title: editingLesson?.title || "",
//           description: editingLesson?.description || "",
//         }
//       : { title: "", description: "" },
//   });

//   const handleSaveLesson = async (data) => {
//     if (!data.title.trim() || !data.description.trim()) {
//       toast.error("Title and description are required");
//       return;
//     }

//     if (!isEditing && !lessonVideoFile) {
//       toast.error("Please upload a video file");
//       return;
//     }

//     const toastId = toast.loading(
//       isEditing ? "Updating lesson..." : "Creating lesson..."
//     );

//     try {
//       const formData = new FormData();
//       formData.append("title", data.title.trim());
//       formData.append("description", data.description.trim());

//       if (lessonVideoFile) {
//         formData.append("videoFile", lessonVideoFile);
//       }

//       if (isEditing) {
//         await updateLessonMutation.mutateAsync({
//           sectionId,
//           lessonId: editingLesson._id,
//           formData,
//         });

//         successToast("Lesson updated successfully!", { id: toastId });
//       } else {
//         await createLessonMutation.mutateAsync({
//           sectionId,
//           formData,
//         });

//         successToast("Lesson created successfully!", { id: toastId });
//       }

//       onCancel();
//     } catch (error) {
//       onCancel();
//       toast.error(
//         isEditing ? "Failed to update lesson" : "Failed to create lesson",
//         { id: toastId }
//       );
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-xl p-5 border border-blue-500/30">
//       <h4 className="text-white font-semibold mb-4">
//         {isEditing ? "Edit Lesson" : "Create New Lesson"}
//       </h4>

//       {/* Loader bar */}
//       {isUploading && (
//         <div className="w-full bg-slate-700 h-2 rounded-full mb-4 overflow-hidden">
//           <div className="bg-blue-500 h-2 w-full animate-pulse"></div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit(handleSaveLesson)} className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-semibold text-slate-300 mb-2">
//             Lecture Title *
//           </label>
//           <input
//             {...register("title", { required: "Title is required" })}
//             className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white"
//             placeholder="Enter lecture title"
//           />
//           {errors.title && (
//             <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-semibold text-slate-300 mb-2">
//             Description *
//           </label>
//           <textarea
//             {...register("description", {
//               required: "Description is required",
//             })}
//             rows={3}
//             className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white"
//             placeholder="Enter lesson description"
//           />
//           {errors.description && (
//             <p className="text-red-400 text-sm mt-1">
//               {errors.description.message}
//             </p>
//           )}
//         </div>

//         {/* Video Upload */}
//         <div>
//           <label className="block text-sm font-semibold text-slate-300 mb-2">
//             Video File {isEditing && editingLesson?.videoUrl && "(Optional)"}
//             {!isEditing && " *"}
//           </label>
//           <FileUploader
//             type="video"
//             currentFile={lessonVideoFile || editingLesson?.videoUrl}
//             onFileChange={setLessonVideoFile}
//             disabled={isUploading}
//           />
//         </div>

//         {/* ACTION BUTTONS */}
//         <div className="flex items-center gap-3">
//           <button
//             type="submit"
//             disabled={isUploading}
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center gap-2 disabled:opacity-50"
//           >
//             <Save size={16} />
//             {isEditing ? "Update Lesson" : "Create Lesson"}
//           </button>

//           <button
//             type="button"
//             onClick={onCancel}
//             disabled={isUploading}
//             className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-white flex items-center gap-2 disabled:opacity-50"
//           >
//             <X size={16} />
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LessonForm;

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import FileUploader from "../course/components/FileUploader";
// import { Save, X } from "lucide-react";
// import { useCreateLesson, useUpdateLesson } from "../../../../hooks/useCourses";
// import { successToast, errorToast } from "../../../../utils/toastUtils";
// import CircularProgressWithLabel from "../../../../components/CircularProgressWithLabel";

// const LessonForm = ({
//   sectionId,
//   courseId,
//   onCancel,
//   isEditing = false,
//   editingLesson = null,
// }) => {
//   const [lessonVideoFile, setLessonVideoFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   // Query Mutations
//   const createLessonMutation = useCreateLesson(courseId);
//   const updateLessonMutation = useUpdateLesson(courseId);

//   const isUploading =
//     createLessonMutation.isPending || updateLessonMutation.isPending;

//   // react-hook-form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: isEditing
//       ? {
//           title: editingLesson?.title || "",
//           description: editingLesson?.description || "",
//         }
//       : { title: "", description: "" },
//   });

//   const handleSaveLesson = async (data) => {
//     if (!data.title.trim() || !data.description.trim()) {
//       errorToast("Title and description are required");
//       return;
//     }

//     if (!isEditing && !lessonVideoFile) {
//       errorToast("Please upload a video file");
//       return;
//     }

//     // Simulate upload progress
//     setUploadProgress(0);
//     const progressInterval = setInterval(() => {
//       setUploadProgress((prev) => {
//         if (prev >= 90) {
//           clearInterval(progressInterval);
//           return 90;
//         }
//         return prev + 10;
//       });
//     }, 300);

//     try {
//       const formData = new FormData();
//       formData.append("title", data.title.trim());
//       formData.append("description", data.description.trim());

//       if (lessonVideoFile) {
//         formData.append("videoFile", lessonVideoFile);
//       }

//       if (isEditing) {
//         await updateLessonMutation.mutateAsync({
//           sectionId,
//           lessonId: editingLesson._id,
//           formData,
//         });

//         successToast("Lesson updated successfully!");
//       } else {
//         await createLessonMutation.mutateAsync({
//           sectionId,
//           formData,
//         });

//         successToast("Lesson created successfully!");
//       }

//       clearInterval(progressInterval);
//       setUploadProgress(100);

//       setTimeout(() => {
//         setUploadProgress(0);
//         onCancel();
//       }, 500);
//     } catch (error) {
//       clearInterval(progressInterval);
//       setUploadProgress(0);
//       onCancel();
//       errorToast(
//         isEditing ? "Failed to update lesson" : "Failed to create lesson"
//       );
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-xl p-5 border border-blue-500/30">
//       <h4 className="text-white font-semibold mb-4">
//         {isEditing ? "Edit Lesson" : "Create New Lesson"}
//       </h4>

//       <form onSubmit={handleSubmit(handleSaveLesson)} className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-semibold text-slate-300 mb-2">
//             Lecture Title *
//           </label>
//           <input
//             {...register("title", { required: "Title is required" })}
//             className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white"
//             placeholder="Enter lecture title"
//             disabled={isUploading}
//           />
//           {errors.title && (
//             <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-semibold text-slate-300 mb-2">
//             Description *
//           </label>
//           <textarea
//             {...register("description", {
//               required: "Description is required",
//             })}
//             rows={3}
//             className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white"
//             placeholder="Enter lesson description"
//             disabled={isUploading}
//           />
//           {errors.description && (
//             <p className="text-red-400 text-sm mt-1">
//               {errors.description.message}
//             </p>
//           )}
//         </div>

//         {/* Video Upload */}
//         <div>
//           <label className="block text-sm font-semibold text-slate-300 mb-2">
//             Video File {isEditing && editingLesson?.videoUrl && "(Optional)"}
//             {!isEditing && " *"}
//           </label>
//           <FileUploader
//             type="video"
//             currentFile={lessonVideoFile || editingLesson?.videoUrl}
//             onFileChange={setLessonVideoFile}
//             disabled={isUploading}
//           />

//           {/* Upload Progress Indicator */}
//           {isUploading && (
//             <div className="flex flex-col items-center justify-center py-6 mt-4 bg-slate-800/50 rounded-lg border border-slate-700">
//               <CircularProgressWithLabel
//                 value={uploadProgress}
//                 size={100}
//                 strokeWidth={8}
//                 color="#3b82f6"
//                 backgroundColor="#334155"
//               />
//               <p className="text-slate-300 text-sm mt-4 font-medium">
//                 {uploadProgress < 100 ? "Uploading video..." : "Processing..."}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* ACTION BUTTONS */}
//         <div className="flex items-center gap-3">
//           <button
//             type="submit"
//             disabled={isUploading}
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//           >
//             <Save size={16} />
//             {isEditing ? "Update Lesson" : "Create Lesson"}
//           </button>

//           <button
//             type="button"
//             onClick={onCancel}
//             disabled={isUploading}
//             className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//           >
//             <X size={16} />
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LessonForm;

import { useState } from "react";
import { useForm } from "react-hook-form";
import FileUploader from "../course/components/FileUploader";
import { Save, X } from "lucide-react";
import { useCreateLesson, useUpdateLesson } from "../../../../hooks/useCourses";
import { successToast, errorToast } from "../../../../utils/toastUtils";
import CircularProgressWithLabel from "../../../../components/CircularProgressWithLabel";
const LessonForm = ({
  sectionId,
  courseId,
  onCancel,
  isEditing = false,
  editingLesson = null,
}) => {
  const [lessonVideoFile, setLessonVideoFile] = useState(
    isEditing ? editingLesson?.videoUrl : null
  );
  const [uploadProgress, setUploadProgress] = useState(0);

  // Query Mutations
  const createLessonMutation = useCreateLesson(courseId);
  const updateLessonMutation = useUpdateLesson(courseId);

  const isUploading =
    createLessonMutation.isPending || updateLessonMutation.isPending;

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing
      ? {
          title: editingLesson?.title || "",
          description: editingLesson?.description || "",
        }
      : { title: "", description: "" },
  });

  const handleSaveLesson = async (data) => {
    if (!data.title.trim() || !data.description.trim()) {
      errorToast("Title and description are required");
      return;
    }

    if (!lessonVideoFile) {
      errorToast("Please upload Lesson video file");
      return;
    }

    // Simulate upload progress
    setUploadProgress(0);
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const formData = new FormData();
      formData.append("title", data.title.trim());
      formData.append("description", data.description.trim());

      // Only append video file if it's a new File object
      if (lessonVideoFile instanceof File) {
        formData.append("videoFile", lessonVideoFile);
      }

      if (isEditing) {
        await updateLessonMutation.mutateAsync({
          sectionId,
          lessonId: editingLesson._id,
          formData,
        });

        successToast("Lesson updated successfully!");
      } else {
        await createLessonMutation.mutateAsync({
          sectionId,
          formData,
        });

        successToast("Lesson created successfully!");
      }

      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        setUploadProgress(0);
        onCancel();
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      onCancel();
      errorToast(
        isEditing ? "Failed to update lesson" : "Failed to create lesson"
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-xl p-5 border border-blue-500/30">
      <h4 className="text-white font-semibold mb-4">
        {isEditing ? "Edit Lesson" : "Create New Lesson"}
      </h4>

      <form onSubmit={handleSubmit(handleSaveLesson)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Lecture Title *
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white"
            placeholder="Enter lecture title"
            disabled={isUploading}
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={3}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white"
            placeholder="Enter lesson description"
            disabled={isUploading}
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Video File *
          </label>

          <FileUploader
            type="video"
            currentFile={lessonVideoFile}
            onFileChange={setLessonVideoFile}
            disabled={isUploading}
          />

          {/* Upload Progress Indicator */}
          {isUploading && (
            <div className="flex flex-col items-center justify-center py-6 mt-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <CircularProgressWithLabel
                value={uploadProgress}
                size={100}
                strokeWidth={8}
                color="#3b82f6"
                backgroundColor="#334155"
              />
              <p className="text-slate-300 text-sm mt-4 font-medium">
                {uploadProgress < 100 ? "Uploading video..." : "Processing..."}
              </p>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isUploading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Save size={16} />
            {isEditing ? "Update Lesson" : "Create Lesson"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isUploading}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;
