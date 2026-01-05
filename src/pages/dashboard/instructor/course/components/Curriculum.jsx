// import { useEffect, useState } from "react";
// import { useFieldArray } from "react-hook-form";
// import FileUploader from "./FileUploader";
// import { ChevronDown, ChevronRight, Plus } from "lucide-react";

// const Curriculum = ({
//   register,
//   control,
//   errors,
//   setValue,
//   getValues,
//   updateFormData,
//   formData,
// }) => {
//   const [expandedSections, setExpandedSections] = useState([]);

//   const {
//     fields: sections,
//     append: appendSection,
//     remove: removeSection,
//   } = useFieldArray({
//     control,
//     name: "sections",
//   });

//   useEffect(() => {
//     if (formData.sections && formData.sections.length > 0) {
//       formData.sections.forEach((section, index) => {
//         setValue(`sections.${index}`, section);
//       });
//     }
//   }, [formData.sections, setValue]);

//   const toggleSection = (index) => {
//     setExpandedSections((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   const addSection = () => {
//     const newSection = {
//       sectionTitle: "",
//       lectures: [],
//     };
//     appendSection(newSection);
//     setExpandedSections((prev) => [...prev, sections.length]);
//     updateFormDataAfterChange();
//   };

//   const addLecture = (sectionIndex) => {
//     const currentSections = getValues("sections") || [];
//     const section = currentSections[sectionIndex] || { lectures: [] };
//     const lectures = section.lectures || [];

//     const newLecture = {
//       title: "",
//       type: "video",
//       resource: null,
//       duration: "",
//     };
//     const updatedLectures = [...lectures, newLecture];

//     setValue(`sections.${sectionIndex}.lectures`, updatedLectures);
//     updateFormDataAfterChange();
//   };

//   const handleFileChange = (sectionIndex, lectureIndex, file) => {
//     setValue(
//       `sections.${sectionIndex}.lectures.${lectureIndex}.resource`,
//       file
//     );
//     updateFormDataAfterChange();
//   };

//   const updateFormDataAfterChange = () => {
//     const currentData = getValues("sections") || [];
//     updateFormData("step2", { sections: currentData });
//   };

//   const handleInputChange = () => {
//     updateFormDataAfterChange();
//   };

//   const totalLectures = sections.reduce((total, section, index) => {
//     const lectures = getValues(`sections.${index}.lectures`) || [];
//     return total + lectures.length;
//   }, 0);

// return (
//   <div className="px-2 sm:px-0">
//     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
//       <h2 className="text-xl sm:text-2xl font-bold text-white">Curriculum</h2>
//       <div className="text-slate-400 text-sm sm:text-base">
//         {sections.length} sections • {totalLectures} lectures
//       </div>
//     </div>

//     {/* Sections */}
//     <div className="space-y-4">
//       {sections.map((section, sectionIndex) => {
//         const lectures = getValues(`sections.${sectionIndex}.lectures`) || [];
//         const isExpanded = expandedSections.includes(sectionIndex);

//         return (
//           <div
//             key={section._id}
//             className="bg-slate-700 rounded-lg border border-slate-600 overflow-hidden"
//           >
//             <div className="p-3 sm:p-4">
//               <div className="flex items-start justify-between gap-3">
//                 {/* Left side - Toggle and Title */}
//                 <div className="flex items-start gap-3 flex-1 min-w-0">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection(sectionIndex)}
//                     className="text-slate-300 hover:text-white mt-1 flex-shrink-0 transition-transform"
//                   >
//                     {isExpanded ? (
//                       <ChevronDown size={18} strokeWidth={2} />
//                     ) : (
//                       <ChevronRight size={18} strokeWidth={2} />
//                     )}
//                   </button>
//                   <div className="flex-1 min-w-0">
//                     <input
//                       {...register(`sections.${sectionIndex}.sectionTitle`, {
//                         required: "Section title is required",
//                       })}
//                       onChange={handleInputChange}
//                       placeholder="Section title"
//                       className="w-full bg-transparent text-white font-medium placeholder-slate-400 focus:outline-none text-sm sm:text-base"
//                       defaultValue={section.sectionTitle}
//                     />
//                     {/* Mobile-only lecture count */}
//                     <div className="sm:hidden text-slate-400 text-xs mt-1">
//                       {lectures.length} lecture
//                       {lectures.length !== 1 ? "s" : ""}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right side - Actions */}
//                 <div className="flex items-center gap-3 flex-shrink-0">
//                   <div className="hidden sm:block text-slate-400 text-sm whitespace-nowrap">
//                     {lectures.length} lecture
//                     {lectures.length !== 1 ? "s" : ""}
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       removeSection(sectionIndex);
//                       updateFormDataAfterChange();
//                     }}
//                     className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-400/10 transition-colors border border-red-400/30 hover:border-red-400/50"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Section Content */}
//             {isExpanded && (
//               <div className="border-t border-slate-600 p-3 sm:p-4 space-y-4">
//                 {/* Lectures */}
//                 {lectures.map((lecture, lectureIndex) => (
//                   <div
//                     key={lectureIndex}
//                     className="bg-slate-800 rounded-lg p-3 sm:p-4 space-y-4"
//                   >
//                     <div className="grid grid-cols-1 gap-4">
//                       {/* Lecture Title */}
//                       <div>
//                         <label className="block text-sm font-medium text-slate-300 mb-2">
//                           Lecture Title *
//                         </label>
//                         <input
//                           {...register(
//                             `sections.${sectionIndex}.lectures.${lectureIndex}.title`,
//                             {
//                               required: "Lecture title is required",
//                             }
//                           )}
//                           onChange={handleInputChange}
//                           className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                           placeholder="Enter lecture title"
//                           defaultValue={lecture.title}
//                         />
//                       </div>

//                       {/* Type and Duration */}
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-slate-300 mb-2">
//                             Type *
//                           </label>
//                           <select
//                             {...register(
//                               `sections.${sectionIndex}.lectures.${lectureIndex}.type`
//                             )}
//                             onChange={handleInputChange}
//                             className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                             defaultValue={lecture.type}
//                           >
//                             <option value="video">Video</option>
//                             <option value="pdf">PDF</option>
//                             <option value="text">Text</option>
//                             <option value="quiz">Quiz</option>
//                           </select>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-slate-300 mb-2">
//                             Duration
//                           </label>
//                           <input
//                             {...register(
//                               `sections.${sectionIndex}.lectures.${lectureIndex}.duration`
//                             )}
//                             onChange={handleInputChange}
//                             className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
//                             placeholder="e.g., 10:30"
//                             defaultValue={lecture.duration}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* File Upload */}
//                     <div>
//                       <label className="block text-sm font-medium text-slate-300 mb-2">
//                         Lecture Resource *
//                       </label>
//                       <FileUploader
//                         type={
//                           getValues(
//                             `sections.${sectionIndex}.lectures.${lectureIndex}.type`
//                           ) || "video"
//                         }
//                         onFileChange={(file) =>
//                           handleFileChange(sectionIndex, lectureIndex, file)
//                         }
//                         currentFile={getValues(
//                           `sections.${sectionIndex}.lectures.${lectureIndex}.resource`
//                         )}
//                       />
//                     </div>
//                   </div>
//                 ))}

//                 {/* Add Lecture Button */}
//                 <button
//                   type="button"
//                   onClick={() => addLecture(sectionIndex)}
//                   className="w-full border-2 border-dashed border-slate-600 hover:border-slate-500 rounded-lg p-4 text-slate-400 hover:text-slate-300 transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
//                 >
//                   <Plus />
//                   Add Lecture to this Section
//                 </button>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>

//     {/* Add Section Button */}
//     <button
//       type="button"
//       onClick={addSection}
//       className="w-full border-2 border-dashed border-slate-600 hover:border-slate-500 rounded-lg p-4 sm:p-6 text-slate-400 hover:text-slate-300 transition-colors mt-6 text-sm sm:text-base flex items-center justify-center gap-2"
//     >
//       <Plus />
//       Add New Section
//     </button>

//     {errors.sections && (
//       <p className="text-red-400 text-sm mt-4">{errors.sections.message}</p>
//     )}
//   </div>
// );
// };

// export default Curriculum;
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { ChevronDown, ChevronRight, Plus } from "lucide-react";
// import { toast } from "react-hot-toast";
// import {
//   setStep,
//   setCourse,
// } from "../../../../../features/courses/courseSlice";

// import {
//   createSection,
//   updateSection,
// } from "../../../../../features/courses/courseThunk";
// import NestedView from "./NestedView";

// const Curriculum = ({ onBack, onNext }) => {
//   const { course } = useSelector((state) => state.course);
//   const dispatch = useDispatch();
//   const [editingSection, setEditingSection] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // Handle section creation/update
//   const handleSectionSubmit = async (data) => {
//     console.log(data);
//     if (!data.sectionName.trim()) return;
//     console.log(data);

//     try {
//       const response = editingSection
//         ? dispatch(
//             updateSection({
//               sectionId: editingSection._id,
//               sectionName: data.sectionName,
//               courseId: course._id,
//             })
//           )
//         : await dispatch(
//             createSection({
//               sectionName: data.sectionName,
//               courseId: course._id,
//             })
//           ).unwrap();
//       console.log("response from Curriculm", response);
//       if (response) {
//         reset();
//         setEditingSection(null);
//       }
//     } catch (error) {
//       console.error("Failed to save section:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle section deletion
//   const handleDeleteSection = async (sectionId) => {
//     if (!window.confirm("Are you sure you want to delete this section?"))
//       return;

//     try {
//       const response = await deleteSection({ sectionId, courseId: course._id });
//       if (response) {
//         dispatch(setCourse(response));
//       }
//     } catch (error) {
//       console.error("Failed to delete section:", error);
//     }
//   };

//   // Handle section edit
//   const handleEditSection = (section) => {
//     setEditingSection(section);
//     reset({ sectionName: section.sectionName });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Section Creation/Edit Form */}
//       <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
//         <h3 className="text-lg font-semibold text-white mb-4">
//           {editingSection ? "Edit Section" : "Add New Section"}
//         </h3>
//         <form
//           onSubmit={handleSubmit(handleSectionSubmit)}
//           className="space-y-4"
//         >
//           <div>
//             <input
//               {...register("sectionName", {
//                 required: "Section name is required",
//                 minLength: {
//                   value: 3,
//                   message: "Section name must be at least 3 characters",
//                 },
//               })}
//               placeholder="Enter section name (e.g., 'Introduction to React')"
//               disabled={isLoading}
//               className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             {errors.sectionName && (
//               <span className="text-red-400 text-sm mt-1 block">
//                 {errors.sectionName.message}
//               </span>
//             )}
//           </div>

//           <div className="flex gap-3">
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading
//                 ? "Saving..."
//                 : editingSection
//                 ? "Update Section"
//                 : "Add Section"}
//             </button>
//             {editingSection && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditingSection(null);
//                   reset();
//                 }}
//                 className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-lg transition-colors"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Sections List with NestedView */}
//       <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
//         <h3 className="text-lg font-semibold text-white mb-4">
//           Course Sections
//         </h3>

//         {course?.courseContent?.length === 0 ? (
//           <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-700 rounded-lg">
//             <p className="mb-2">No sections added yet</p>
//             <p className="text-sm">Start by adding your first section above</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {course?.courseContent?.map((section) => (
//               <div
//                 key={section._id}
//                 className="border border-slate-700 rounded-lg p-4 bg-slate-750"
//               >
//                 {/* Section Header */}
//                 <div className="flex justify-between items-center mb-3">
//                   <div className="flex items-center gap-3">
//                     <h4 className="font-semibold text-white text-lg">
//                       {section.sectionName}
//                     </h4>
//                     <span className="bg-slate-600 text-slate-300 text-xs px-2 py-1 rounded">
//                       {section.lesson?.length || 0} lectures
//                     </span>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEditSection(section)}
//                       className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-1 rounded hover:bg-blue-800/30 transition-colors border border-blue-400/30 hover:border-blue-400/50"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteSection(section._id)}
//                       className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1 rounded hover:bg-red-800/30 transition-colors border border-red-400/30 hover:border-red-400/50"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>

//                 {/* NestedView for Lectures - YAHAN USE KARENGE */}
//                 <NestedView section={section} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Navigation */}
//       <div className="flex justify-between pt-6 border-t border-slate-700">
//         <button
//           onClick={onBack}
//           className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-3 px-6 rounded-lg transition-colors"
//         >
//           ← Back to Details
//         </button>
//         <button
//           onClick={onNext}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
//         >
//           Next: Preview & Submit →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Curriculum;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLesson,
  createSection,
  updateSection,
  deleteSection,
  createLesson,
  updateLesson,
} from "../../../../../features/courses/courseThunk";
import toast from "react-hot-toast";

const Curriculum = () => {
  const dispatch = useDispatch();
  const { course, loading } = useSelector((state) => state.course);

  const [newSectionName, setNewSectionName] = useState("");
  const [editingSection, setEditingSection] = useState(null);
  const [editSectionName, setEditSectionName] = useState("");
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);

  // Section CRUD Operations
  const handleCreateSection = async () => {
    if (!newSectionName.trim()) {
      toast.error("Please enter a section name");
      return;
    }

    try {
      await dispatch(
        createSection({
          courseId: course._id,
          sectionName: newSectionName.trim(),
        })
      ).unwrap();

      setNewSectionName("");
      toast.success("Section created successfully!");
    } catch (error) {
      toast.error(error || "Failed to create section");
    }
  };

  const handleUpdateSection = async (sectionId) => {
    if (!editSectionName.trim()) {
      toast.error("Please enter a section name");
      return;
    }

    try {
      await dispatch(
        updateSection({
          courseId: course._id,
          sectionId,
          sectionName: editSectionName.trim(),
        })
      ).unwrap();

      setEditingSection(null);
      setEditSectionName("");
      toast.success("Section updated successfully!");
    } catch (error) {
      toast.error(error || "Failed to update section");
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this section? All lessons will be deleted."
      )
    ) {
      try {
        await dispatch(
          deleteSection({
            courseId: course._id,
            sectionId,
          })
        ).unwrap();

        toast.success("Section deleted successfully!");
      } catch (error) {
        toast.error(error || "Failed to delete section");
      }
    }
  };

  // Lesson CRUD Operations
  const handleCreateLesson = async (lessonData) => {
    try {
      await dispatch(
        createLesson({
          sectionId: selectedSection._id,
          lessonData,
        })
      ).unwrap();

      setShowLessonForm(false);
      setSelectedSection(null);
      toast.success("Lesson created successfully!");
    } catch (error) {
      toast.error(error || "Failed to create lesson");
    }
  };

  const handleUpdateLesson = async (lessonData) => {
    try {
      await dispatch(
        updateLesson({
          sectionId: selectedSection._id,
          lessonId: editingLesson._id,
          lessonData,
        })
      ).unwrap();

      setShowLessonForm(false);
      setSelectedSection(null);
      setEditingLesson(null);
      toast.success("Lesson updated successfully!");
    } catch (error) {
      toast.error(error || "Failed to update lesson");
    }
  };

  const handleDeleteLesson = async (sectionId, lessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        await dispatch(
          deleteLesson({
            sectionId,
            lessonId,
          })
        ).unwrap();

        toast.success("Lesson deleted successfully!");
      } catch (error) {
        toast.error(error || "Failed to delete lesson");
      }
    }
  };

  // UI Handlers
  const handleAddLesson = (section) => {
    setSelectedSection(section);
    setEditingLesson(null);
    setShowLessonForm(true);
  };

  const handleEditLesson = (section, lesson) => {
    setSelectedSection(section);
    setEditingLesson(lesson);
    setShowLessonForm(true);
  };

  const handleStartEditSection = (section) => {
    setEditingSection(section._id);
    setEditSectionName(section.sectionName);
  };

  const cancelEditSection = () => {
    setEditingSection(null);
    setEditSectionName("");
  };

  if (!course) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Course Curriculum
          </h1>
          <p className="text-slate-400">
            Organize your course content into sections and add lessons to each
            section.
          </p>
        </div>

        {/* Add New Section */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Add New Section
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Enter section name"
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleCreateSection}
              disabled={loading || !newSectionName.trim()}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Add Section
            </button>
          </div>
        </div>

        {/* Sections List */}
        <div className="space-y-6">
          {course.courseContent?.map((section, index) => (
            <div
              key={section._id}
              className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700"
            >
              {/* Section Header */}
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white font-bold">
                      {index + 1}
                    </div>

                    {editingSection === section._id ? (
                      <div className="flex items-center space-x-3 flex-1">
                        <input
                          type="text"
                          value={editSectionName}
                          onChange={(e) => setEditSectionName(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            handleUpdateSection(section._id)
                          }
                          className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          autoFocus
                        />
                        <button
                          onClick={() => handleUpdateSection(section._id)}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditSection}
                          className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-500 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {section.sectionName}
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">
                          {section.lesson?.length || 0} lessons
                        </p>
                      </div>
                    )}
                  </div>

                  {editingSection !== section._id && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStartEditSection(section)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSection(section._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Lessons in Section */}
              <div className="p-6">
                {/* Add Lesson Button */}
                <button
                  onClick={() => handleAddLesson(section)}
                  className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors mb-4"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="font-medium">Add Lesson</span>
                </button>

                {/* Lessons List */}
                <div className="space-y-3">
                  {section.lesson?.map((lesson, lessonIndex) => (
                    <div
                      key={lesson._id}
                      className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors group"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center justify-center w-8 h-8 bg-slate-600 rounded text-white text-sm font-semibold">
                          {lessonIndex + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium truncate">
                            {lesson.title}
                          </h4>
                          {lesson.duration && (
                            <p className="text-slate-300 text-sm mt-1">
                              {lesson.duration}
                            </p>
                          )}
                          {lesson.description && (
                            <p className="text-slate-400 text-sm mt-1 truncate">
                              {lesson.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditLesson(section, lesson)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-500 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteLesson(section._id, lesson._id)
                          }
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  {!section.lesson?.length && (
                    <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-600 rounded-lg">
                      <svg
                        className="w-12 h-12 mx-auto mb-3 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <p>No lessons in this section yet.</p>
                      <p className="text-sm mt-1">
                        Add your first lesson to get started.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {!course.courseContent?.length && (
            <div className="text-center py-16 bg-slate-800 rounded-lg border-2 border-dashed border-slate-600">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                No Sections Yet
              </h3>
              <p className="text-slate-400 mb-4">
                Start by creating your first section for the course.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lesson Form Modal */}
      {showLessonForm && (
        <LessonFormModal
          section={selectedSection}
          lesson={editingLesson}
          onSubmit={editingLesson ? handleUpdateLesson : handleCreateLesson}
          onClose={() => {
            setShowLessonForm(false);
            setSelectedSection(null);
            setEditingLesson(null);
          }}
        />
      )}
    </div>
  );
};

// Lesson Form Modal Component
const LessonFormModal = ({ section, lesson, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: lesson?.title || "",
    description: lesson?.description || "",
    duration: lesson?.duration || "",
    video: null,
  });
  const [videoPreview, setVideoPreview] = useState(lesson?.videoUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, video: file }));
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a lesson title");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Failed to save lesson:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {lesson ? "Edit Lesson" : "Add New Lesson"}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors text-lg"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Lesson Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter lesson title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter lesson description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter duration in minutes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Video File {!lesson && "*"}
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
              />
            </div>

            {videoPreview && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Video Preview
                </label>
                <video
                  controls
                  className="w-full rounded bg-black max-h-48"
                  src={videoPreview}
                />
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-600 text-slate-300 rounded hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50 transition-colors"
              >
                {isSubmitting
                  ? "Saving..."
                  : lesson
                  ? "Update Lesson"
                  : "Create Lesson"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
