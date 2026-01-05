// import { FileText, Video } from "lucide-react";

// const Preview = ({ formData, onEditStep }) => {
//   const { step1, step2 } = formData;

//   const totalLectures =
//     step2.sections?.reduce((total, section) => {
//       return total + (section.lectures?.length || 0);
//     }, 0) || 0;

//   const totalVideoLectures =
//     step2.sections?.reduce((total, section) => {
//       return (
//         total +
//         (section.lectures?.filter((l) => l.type === "video").length || 0)
//       );
//     }, 0) || 0;

//   const totalPdfLectures =
//     step2.sections?.reduce((total, section) => {
//       return (
//         total + (section.lectures?.filter((l) => l.type === "pdf").length || 0)
//       );
//     }, 0) || 0;

//   return (
//     <div className="px-2 sm:px-0">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
//         <h2 className="text-xl sm:text-2xl font-bold text-white">
//           Preview & Submit
//         </h2>
//         <button
//           type="button"
//           onClick={() => onEditStep(2)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
//         >
//           Edit Curriculum
//         </button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Course Overview */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Course Header - Fixed for mobile */}
//           <div className="bg-slate-700 rounded-lg p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
//               {step1.courseThumbnail && (
//                 <div className="flex-shrink-0 w-full sm:w-48 h-32 mx-auto sm:mx-0">
//                   <img
//                     src={URL.createObjectURL(step1.courseThumbnail)}
//                     alt="Course thumbnail"
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>
//               )}

//               <div className="flex-1 min-w-0">
//                 <div className="flex justify-between  mb-3">
//                   <h3 className="text-lg sm:text-xl font-bold text-white break-words">
//                     {step1.courseName || "Untitled Course"}
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => onEditStep(1)}
//                     className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-800/30 transition-colors border border-blue-400/30 hover:border-blue-400/50"
//                   >
//                     Edit Course Details
//                   </button>
//                 </div>
//                 <p className="text-slate-300 mb-4 text-sm sm:text-base break-words">
//                   {step1.CourseDescription || "No description provided"}
//                 </p>
//                 <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400">
//                   <span>Category: {step1.category || "Uncategorized"}</span>
//                   <span className="hidden sm:inline">•</span>
//                   <span>Price: Rs. {step1.price || "0"}</span>
//                   <span className="hidden sm:inline">•</span>
//                   <span>{step2.sections?.length || 0} sections</span>
//                   <span className="hidden sm:inline">•</span>
//                   <span>{totalLectures} lectures</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Instructions */}
//           <div className="bg-slate-700 rounded-lg p-4 sm:p-6">
//             <div className="flex justify-between  mb-3">
//               <h4 className="font-bold text-white text-lg">
//                 Instructions & Benefits
//               </h4>
//             </div>
//             <p className="text-slate-300 text-sm sm:text-base break-words">
//               {step1.instructions || "No instructions provided"}
//             </p>
//           </div>
//           <div className="bg-slate-700 rounded-lg p-4 sm:p-6">
//             <div className="flex justify-between  mb-3">
//               <h4 className="font-bold text-white text-lg">Benefits</h4>
//             </div>
//             <p className="text-slate-300 text-sm sm:text-base break-words">
//               {step1.benefits || "No instructions provided"}
//             </p>
//           </div>

//           {/* Curriculum Preview */}
//           <div className="bg-slate-700 rounded-lg p-4 sm:p-6">
//             <div className="flex justify-between  mb-3 ">
//               <h4 className="font-bold text-white text-lg">Curriculum</h4>
//               <button
//                 type="button"
//                 onClick={() => onEditStep(2)}
//                 className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-800/30 transition-colors border border-blue-400/30 hover:border-blue-400/50"
//               >
//                 Edit Curriculum
//               </button>
//             </div>
//             <div className="space-y-3">
//               {step2.sections?.map((section, sectionIndex) => (
//                 <div
//                   key={sectionIndex}
//                   className="border border-slate-600 rounded-lg p-3 sm:p-4"
//                 >
//                   <h5 className="font-semibold text-white mb-3 text-sm sm:text-base break-words">
//                     {section.sectionTitle || "Untitled Section"}
//                   </h5>
//                   <div className="space-y-2">
//                     {section.lectures?.map((lecture, lectureIndex) => (
//                       <div
//                         key={lectureIndex}
//                         className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-slate-300 bg-slate-800 rounded p-3 gap-2 sm:gap-4"
//                       >
//                         <div className="flex items-center gap-3 flex-1 min-w-0">
//                           <span className="flex-shrink-0">
//                             {lecture.type === "video" ? (
//                               <Video />
//                             ) : lecture.type === "pdf" ? (
//                               <FileText />
//                             ) : (
//                               "📝"
//                             )}
//                           </span>
//                           <span className="break-words flex-1 min-w-0">
//                             {lecture.title || "Untitled Lecture"}
//                           </span>
//                           {lecture.resource && (
//                             <span className="text-green-400 text-xs flex-shrink-0 whitespace-nowrap">
//                               ✓ Uploaded
//                             </span>
//                           )}
//                         </div>
//                         <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
//                           {lecture.duration && (
//                             <span className="text-slate-400 whitespace-nowrap">
//                               {lecture.duration}
//                             </span>
//                           )}
//                           <span className="text-slate-400 text-xs uppercase whitespace-nowrap">
//                             {lecture.type}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}

//               {(!step2.sections || step2.sections.length === 0) && (
//                 <div className="text-center py-8 text-slate-400">
//                   <p>No sections added yet</p>
//                   <button
//                     type="button"
//                     onClick={() => onEditStep(2)}
//                     className="text-blue-400 hover:text-blue-300 mt-2"
//                   >
//                     Add sections and lectures
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Summary */}
//         <div className="space-y-6">
//           {/* Status Card */}
//           <div className="bg-slate-700 rounded-lg p-4 sm:p-6">
//             <h4 className="font-bold text-white mb-4 text-lg">
//               Submission Status
//             </h4>
//             <div className="space-y-3">
//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-400">Status:</span>
//                 <span className="text-yellow-400 font-medium">
//                   Pending Review
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-400">Created:</span>
//                 <span className="text-slate-300">
//                   {new Date().toLocaleDateString()}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Quick Stats */}
//           <div className="bg-slate-700 rounded-lg p-4 sm:p-6">
//             <h4 className="font-bold text-white mb-4 text-lg">Course Stats</h4>
//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-slate-400">Sections:</span>
//                 <span className="text-slate-300">
//                   {step2.sections?.length || 0}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-400">Total Lectures:</span>
//                 <span className="text-slate-300">{totalLectures}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-400">Video Lectures:</span>
//                 <span className="text-slate-300">{totalVideoLectures}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-400">PDF Resources:</span>
//                 <span className="text-slate-300">{totalPdfLectures}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-400">Price:</span>
//                 <span className="text-slate-300">Rs. {step1.price || "0"}</span>
//               </div>
//             </div>
//           </div>

//           {/* Tags */}
//           {step1.tags && (
//             <div className="bg-slate-700 rounded-lg p-4 sm:p-6">
//               <div className="flex justify-between  mb-3">
//                 <h4 className="font-bold text-white text-lg">Tags</h4>
//                 <button
//                   type="button"
//                   onClick={() => onEditStep(1)}
//                   className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-800/30 transition-colors border border-blue-400/30 hover:border-blue-400/50"
//                 >
//                   Edit Tags
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {step1.tags.split(",").map((tag, index) => (
//                   <span
//                     key={index}
//                     className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-sm break-words"
//                   >
//                     {tag.trim()}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Preview;

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { resetCourseState } from "../../../../../features/courses/courseSlice";
// // import { editCourseDetails } from "../services/courseApi";

// const PreviewAndSubmit = () => {
//   const { course } = useSelector((state) => state.course);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [publishStatus, setPublishStatus] = useState(course.status || "draft");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm({
//     defaultValues: {
//       makePublic: publishStatus === "published",
//     },
//   });

//   const makePublic = watch("makePublic");

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       formData.append("status", data.makePublic ? "published" : "draft");
//       formData.append("courseId", course._id);

//       const result = await editCourseDetails(formData, course._id);

//       if (result) {
//         // Clear Redux state
//         dispatch(resetCourseState());
//         // Navigate to courses list
//         navigate("/dashboard/my-courses");
//       }
//     } catch (error) {
//       console.error("Failed to update course status:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Calculate total course duration
//   const totalDuration =
//     course.courseContent?.reduce((total, section) => {
//       const sectionDuration = section.subSections?.reduce(
//         (sectionTotal, lecture) => {
//           return sectionTotal + (parseInt(lecture.duration) || 0);
//         },
//         0
//       );
//       return total + sectionDuration;
//     }, 0) || 0;

//   // Count total lectures
//   const totalLectures =
//     course.courseContent?.reduce((total, section) => {
//       return total + (section.subSections?.length || 0);
//     }, 0) || 0;

//   return (
//     <div className="preview-submit-container">
//       <div className="preview-header">
//         <h2>Course Preview & Submission</h2>
//         <p>Review your course before publishing</p>
//       </div>

//       <div className="preview-content">
//         {/* Course Overview */}
//         <div className="course-overview">
//           <div className="course-thumbnail">
//             <img
//               src={course.thumbnail || "/default-thumbnail.jpg"}
//               alt={course.courseTitle}
//             />
//           </div>
//           <div className="course-info">
//             <h1>{course.courseTitle}</h1>
//             <p className="course-description">{course.shortDescription}</p>

//             <div className="course-stats">
//               <div className="stat">
//                 <span className="stat-value">{totalLectures}</span>
//                 <span className="stat-label">Lectures</span>
//               </div>
//               <div className="stat">
//                 <span className="stat-value">{totalDuration}</span>
//                 <span className="stat-label">Minutes</span>
//               </div>
//               <div className="stat">
//                 <span className="stat-value">
//                   {course.courseContent?.length || 0}
//                 </span>
//                 <span className="stat-label">Sections</span>
//               </div>
//             </div>

//             <div className="course-meta">
//               <span className="price">${course.price || "0"}</span>
//               <span className="category">{course.category}</span>
//             </div>
//           </div>
//         </div>

//         {/* Course Curriculum Preview */}
//         <div className="curriculum-preview">
//           <h3>Course Curriculum</h3>
//           {course.courseContent?.map((section, sectionIndex) => (
//             <div key={section._id} className="section-preview">
//               <h4>
//                 {sectionIndex + 1}. {section.sectionName}
//               </h4>
//               <div className="lectures-preview">
//                 {section.subSections?.map((lecture, lectureIndex) => (
//                   <div key={lecture._id} className="lecture-preview">
//                     <span className="lecture-number">
//                       {sectionIndex + 1}.{lectureIndex + 1}
//                     </span>
//                     <span className="lecture-title">{lecture.title}</span>
//                     <span className="lecture-duration">
//                       {lecture.duration || "0"} min
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* What You'll Learn */}
//         {course.benefits?.length > 0 && (
//           <div className="benefits-preview">
//             <h3>What You'll Learn</h3>
//             <ul>
//               {course.benefits.map((benefit, index) => (
//                 <li key={index}>{benefit}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Requirements */}
//         {course.requirements?.length > 0 && (
//           <div className="requirements-preview">
//             <h3>Requirements</h3>
//             <ul>
//               {course.requirements.map((requirement, index) => (
//                 <li key={index}>{requirement}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Publish Form */}
//       <form onSubmit={handleSubmit(onSubmit)} className="publish-form">
//         <div className="form-group checkbox-group">
//           <label className="checkbox-label">
//             <input {...register("makePublic")} type="checkbox" />
//             <span className="checkmark"></span>
//             Make this course public
//           </label>
//           <p className="checkbox-help">
//             {makePublic
//               ? "Your course will be visible to students after admin approval."
//               : "Your course will be saved as draft and not visible to students."}
//           </p>
//         </div>

//         <div className="form-actions">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`btn-primary ${
//               makePublic ? "publish-btn" : "draft-btn"
//             }`}
//           >
//             {isSubmitting
//               ? "Saving..."
//               : makePublic
//               ? "Submit for Approval"
//               : "Save as Draft"}
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="btn-secondary"
//           >
//             Back to Curriculum
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PreviewAndSubmit;

import { FileText, Video, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep } from "../../../../../features/courses/courseSlice";
import { useState } from "react";
// import { editCourseDetails } from "../services/courseApi";

const PreviewAndSubmit = ({ onBack }) => {
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate course statistics
  const totalLectures =
    course?.courseContent?.reduce((total, section) => {
      return total + (section.lesson?.length || 0);
    }, 0) || 0;

  const totalDuration =
    course?.courseContent?.reduce((total, section) => {
      const sectionDuration = section.lesson?.reduce(
        (sectionTotal, lecture) => {
          return sectionTotal + (parseInt(lesson.duration) || 0);
        },
        0
      );
      return total + sectionDuration;
    }, 0) || 0;

  const handleEditStep = (stepNumber) => {
    dispatch(setStep(stepNumber));
  };

  const handlePublish = async (status = "published") => {
    setIsSubmitting(true);
    try {
      // const formData = new FormData();
      // formData.append('status', status);
      // formData.append('courseId', course._id);

      // const result = await editCourseDetails(formData, course._id);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear Redux state and navigate on success
      dispatch(resetCourseState());
      navigate("/instructor/manage-courses");
    } catch (error) {
      console.error("Failed to publish course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      // const formData = new FormData();
      // formData.append('status', 'draft');
      // formData.append('courseId', course._id);

      // await editCourseDetails(formData, course._id);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      dispatch(resetCourseState());
      navigate("/dashboard/my-courses");
    } catch (error) {
      console.error("Failed to save draft:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No course data found</p>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Preview & Submit
        </h2>
        <button
          type="button"
          onClick={() => handleEditStep(2)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit Curriculum
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Course Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Header */}
          <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
              {course.thumbnail && (
                <div className="flex-shrink-0 w-full sm:w-48 h-32 mx-auto sm:mx-0">
                  <img
                    src={course.thumbnail}
                    alt="Course thumbnail"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white break-words">
                    {course.courseName || "Untitled Course"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleEditStep(1)}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-800/30 transition-colors border border-blue-400/30 hover:border-blue-400/50 flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Details
                  </button>
                </div>
                <p className="text-slate-300 mb-4 text-sm sm:text-base break-words">
                  {course.courseDescription || "No description provided"}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <span>
                    Category: {course.category.name || "Uncategorized"}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>Price: ${course.price || "0"}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{course.courseContent?.length || 0} sections</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{totalLectures} lectures</span>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          {course.requirements && course.requirements.length > 0 && (
            <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-white text-lg">Requirements</h4>
                <button
                  type="button"
                  onClick={() => handleEditStep(1)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-800/30 transition-colors border border-blue-400/30 hover:border-blue-400/50 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
              <ul className="space-y-2">
                {course.requirements.map((requirement, index) => (
                  <li
                    key={index}
                    className="text-slate-300 text-sm sm:text-base flex items-start gap-2"
                  >
                    <span className="text-green-400 mt-1">•</span>
                    <span className="break-words">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {course.benefits && course.benefits.length > 0 && (
            <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-white text-lg">
                  What You'll Learn
                </h4>
                <button
                  type="button"
                  onClick={() => handleEditStep(1)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-800/30 transition-colors border border-blue-400/30 hover:border-blue-400/50 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
              <ul className="space-y-2">
                {course.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="text-slate-300 text-sm sm:text-base flex items-start gap-2"
                  >
                    <span className="text-blue-400 mt-1">✓</span>
                    <span className="break-words">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Curriculum Preview */}
          <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-white text-lg">Curriculum</h4>
              <button
                type="button"
                onClick={() => handleEditStep(2)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-800/30 transition-colors border border-blue-400/30 hover:border-blue-400/50 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Curriculum
              </button>
            </div>
            <div className="space-y-4">
              {course.courseContent?.map((section, sectionIndex) => (
                <div
                  key={section._id || sectionIndex}
                  className="border border-slate-700 rounded-lg p-4 bg-slate-750"
                >
                  <h5 className="font-semibold text-white mb-3 text-sm sm:text-base break-words flex items-center gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      {sectionIndex + 1}
                    </span>
                    {section.sectionName || "Untitled Section"}
                  </h5>
                  <div className="space-y-2">
                    {section.lesson?.map((lecture, lectureIndex) => (
                      <div
                        key={lesson._id || lectureIndex}
                        className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-slate-300 bg-slate-700 rounded-lg p-3 gap-2 sm:gap-4"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="flex-shrink-0 text-blue-400">
                            <Video className="w-4 h-4" />
                          </span>
                          <span className="break-words flex-1 min-w-0">
                            {lesson.title || "Untitled lesson"}
                          </span>
                          {lesson.videoUrl && (
                            <span className="text-green-400 text-xs flex-shrink-0 whitespace-nowrap">
                              ✓ Uploaded
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                          {lesson.duration && (
                            <span className="text-slate-400 whitespace-nowrap bg-slate-600 px-2 py-1 rounded">
                              {lesson.duration} min
                            </span>
                          )}
                          <span className="text-slate-400 text-xs uppercase whitespace-nowrap bg-slate-600 px-2 py-1 rounded">
                            Video
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {(!course.courseContent || course.courseContent.length === 0) && (
                <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-700 rounded-lg">
                  <Video className="w-12 h-12 mx-auto mb-3 text-slate-500" />
                  <p>No sections added yet</p>
                  <button
                    type="button"
                    onClick={() => handleEditStep(2)}
                    className="text-blue-400 hover:text-blue-300 mt-2 font-medium"
                  >
                    Add sections and lectures
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Summary & Actions */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
            <h4 className="font-bold text-white mb-4 text-lg">
              Submission Status
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Status:</span>
                <span className="text-yellow-400 font-medium">
                  Ready to Publish
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Created:</span>
                <span className="text-slate-300">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Last Updated:</span>
                <span className="text-slate-300">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
            <h4 className="font-bold text-white mb-4 text-lg">Course Stats</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Sections:</span>
                <span className="text-slate-300">
                  {course.courseContent?.length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Lectures:</span>
                <span className="text-slate-300">{totalLectures}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Duration:</span>
                <span className="text-slate-300">{totalDuration} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Price:</span>
                <span className="text-slate-300">${course.price || "0"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="text-slate-300 capitalize">
                  {course.category.name || "Uncategorized"}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-white text-lg">Tags</h4>
                <button
                  type="button"
                  onClick={() => handleEditStep(1)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-800/30 transition-colors border border-blue-400/30 hover:border-blue-400/50 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-sm break-words border border-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700 space-y-3">
            <h4 className="font-bold text-white mb-4 text-lg">
              Publish Course
            </h4>

            <button
              onClick={() => handlePublish("published")}
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Publish Course
                </>
              )}
            </button>

            <button
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>Save as Draft</>
              )}
            </button>

            <button
              onClick={onBack}
              disabled={isSubmitting}
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Back to Curriculum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewAndSubmit;
