import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Save,
  GripVertical,
  X,
} from "lucide-react";
import LessonForm from "./LessonForm";
import LessonItem from "./LessonItem";
import { useUpdateSection } from "../../../../hooks/useCourses";

// const SectionItem = ({
//   section,
//   courseId,
//   isExpanded,
//   onToggle,
//   onDeleteRequest,
//   onDeleteLessonRequest,
// }) => {
//   const dispatch = useDispatch();
//   const [editingSection, setEditingSection] = useState(false);
//   const [creatingLesson, setCreatingLesson] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { isSubmitting, errors },
//   } = useForm();

//   const handleEditSection = () => {
//     setEditingSection(true);
//     setValue("sectionName", section.sectionName);
//   };

//   const handleUpdateSection = async (data) => {
//     if (!data.sectionName.trim()) {
//       toast.error("Section name is required");
//       return;
//     }

//     // Show loading toast and store its ID
//     const toastId = toast.loading("Updating section...");

//     try {
//       await dispatch(
//         updateSection({
//           courseId,
//           sectionId: section._id,
//           sectionName: data.sectionName.trim(),
//         })
//       ).unwrap();

//       setEditingSection(false);
//       reset();
//       toast.success("Section updated successfully!", { id: toastId });
//     } catch (error) {
//       toast.error("Failed to update section", { id: toastId });
//     }
//   };

//   const handleCancelEditSection = () => {
//     setEditingSection(false);
//     reset();
//   };

//   const handleAddLesson = () => {
//     setCreatingLesson(true);
//   };

//   const handleCancelLesson = () => {
//     setCreatingLesson(false);
//   };

//   return (
//     <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl border border-slate-600/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:border-slate-500/50">
//       <div className="p-4 sm:p-5">
//         <div className="flex items-start justify-between gap-3">
//           {/* Left side */}
//           <div className="flex items-start gap-3 flex-1 min-w-0">
//             <button
//               type="button"
//               className="text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing mt-1.5 flex-shrink-0"
//             >
//               <GripVertical size={18} />
//             </button>
//             <button
//               type="button"
//               onClick={() => onToggle(section._id)}
//               className="text-slate-300 hover:text-white mt-1.5 flex-shrink-0 transition-transform hover:scale-110"
//             >
//               {isExpanded ? (
//                 <ChevronDown size={20} strokeWidth={2.5} />
//               ) : (
//                 <ChevronRight size={20} strokeWidth={2.5} />
//               )}
//             </button>
//             <div className="flex-1 min-w-0">
//               {editingSection ? (
//                 <form onSubmit={handleSubmit(handleUpdateSection)}>
//                   <input
//                     {...register("sectionName", {
//                       required: true,
//                     })}
//                     className="w-full bg-slate-700/50 border border-blue-500/50 text-white font-semibold placeholder-slate-400 focus:outline-none focus:border-blue-400 text-sm sm:text-base rounded-lg px-3 py-2"
//                     autoFocus
//                   />
//                 </form>
//               ) : (
//                 <h3 className="text-white font-semibold text-sm sm:text-base">
//                   {section.sectionName}
//                 </h3>
//               )}
//               <div className="flex items-center gap-3 mt-2">
//                 <div className="text-slate-400 text-xs sm:text-sm">
//                   <span className="font-medium text-blue-400">
//                     {section.lesson?.length || 0}
//                   </span>{" "}
//                   lecture{section.lesson?.length !== 1 ? "s" : ""}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right side - Actions */}
//           <div className="flex items-center gap-2 flex-shrink-0">
//             {editingSection ? (
//               <>
//                 <button
//                   type="button"
//                   onClick={handleSubmit(handleUpdateSection)}
//                   disabled={isSubmitting}
//                   className="text-green-400 hover:text-green-300 p-2 rounded-lg hover:bg-green-400/10 transition-all border border-green-400/30 disabled:opacity-50"
//                 >
//                   <Save size={18} />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleCancelEditSection}
//                   className="text-slate-400 hover:text-slate-300 p-2 rounded-lg hover:bg-slate-400/10 transition-all border border-slate-400/30"
//                 >
//                   <X size={18} />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   type="button"
//                   onClick={handleEditSection}
//                   disabled={isSubmitting}
//                   className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-400/10 transition-all border border-blue-400/30 disabled:opacity-50"
//                 >
//                   <Edit2 size={18} />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => onDeleteRequest(section._id)}
//                   disabled={isSubmitting}
//                   className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-400/10 transition-all border border-red-400/30 disabled:opacity-50"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Section Content */}
//       {isExpanded && (
//         <div className="border-t border-slate-600/50 bg-slate-900/30 p-4 sm:p-5 space-y-4">
//           {/* Create Lesson Form */}
//           {creatingLesson && (
//             <LessonForm
//               sectionId={section._id}
//               courseId={courseId}
//               onCancel={handleCancelLesson}
//               isEditing={false}
//             />
//           )}

//           {/* Lessons List */}
//           {section.lesson?.map((lesson, lectureIndex) => (
//             <LessonItem
//               key={lesson._id}
//               lesson={lesson}
//               lectureIndex={lectureIndex}
//               sectionId={section._id}
//               courseId={courseId}
//               onDeleteRequest={onDeleteLessonRequest}
//             />
//           ))}

//           {/* Add Lecture Button */}
//           {!creatingLesson && (
//             <button
//               type="button"
//               onClick={handleAddLesson}
//               disabled={isSubmitting}
//               className="w-full border-2 border-dashed border-slate-600 hover:border-blue-500/50 rounded-xl p-5 text-slate-400 hover:text-blue-400 transition-all text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-blue-500/5 group disabled:opacity-50"
//             >
//               <Plus
//                 className="group-hover:rotate-90 transition-transform"
//                 size={20}
//               />
//               Add Lecture to this Section
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SectionItem;

const SectionItem = ({
  section,
  courseId,
  isExpanded,
  onToggle,
  onDeleteRequest,
  onDeleteLessonRequest,
}) => {
  const [editingSection, setEditingSection] = useState(false);
  const [creatingLesson, setCreatingLesson] = useState(false);
  const updateSectionMutation = useUpdateSection(courseId);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handleEditSection = () => {
    setEditingSection(true);
    setValue("sectionName", section.sectionName);
  };

  const handleUpdateSection = async (data) => {
    const name = data.sectionName.trim();
    if (!name) return toast.error("Section name is required");

    try {
      await updateSectionMutation.mutateAsync({
        sectionId: section._id,
        sectionName: name,
      });

      toast.success("Section updated successfully");
      section.sectionName = name; // optimistic UI
      setEditingSection(false);
      reset();
    } catch (error) {
      toast.error("Failed to update section");
      setEditingSection(false);
      reset();
    }
  };

  const handleCancelEdit = () => {
    setEditingSection(false);
    reset();
  };

  const handleAddLesson = () => setCreatingLesson(true);
  const handleCancelLesson = () => setCreatingLesson(false);

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl border border-slate-600/50 shadow-xl">
      {/* SECTION HEADER */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Left side: name + expand */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button className="text-slate-500 cursor-grab mt-1.5">
              <GripVertical size={18} />
            </button>

            <button
              type="button"
              onClick={() => onToggle(section._id)}
              className="text-slate-300 hover:text-white mt-1.5"
            >
              {isExpanded ? <ChevronDown /> : <ChevronRight />}
            </button>

            <div className="flex-1">
              {editingSection ? (
                <form onSubmit={handleSubmit(handleUpdateSection)}>
                  <input
                    {...register("sectionName", { required: true })}
                    className="w-full bg-slate-700/50 border border-blue-500/50 text-white rounded-lg px-3 py-2"
                    autoFocus
                  />
                </form>
              ) : (
                <h3 className="text-white font-semibold">
                  {section.sectionName}
                </h3>
              )}

              <div className="text-slate-400 text-xs mt-2">
                {section.lesson?.length || 0} lectures
              </div>
            </div>
          </div>

          {/* Right side: actions */}
          <div className="flex items-center gap-2">
            {editingSection ? (
              <>
                <button
                  onClick={handleSubmit(handleUpdateSection)}
                  disabled={updateSectionMutation.isPending}
                  className="text-green-400 p-2 border border-green-400/30"
                >
                  <Save size={18} />
                </button>

                <button
                  onClick={handleCancelEdit}
                  className="text-slate-400 p-2 border border-slate-400/30"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEditSection}
                  className="text-blue-400 p-2 border border-blue-400/30"
                >
                  <Edit2 size={18} />
                </button>

                <button
                  onClick={() => onDeleteRequest(section._id)}
                  className="text-red-400 p-2 border border-red-400/30"
                >
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* EXPANDED AREA */}
      {isExpanded && (
        <div className="border-t border-slate-600/50 bg-slate-900/30 p-4 space-y-4">
          {/* LESSON CREATE FORM */}
          {creatingLesson ? (
            <LessonForm
              sectionId={section._id}
              courseId={courseId}
              onCancel={handleCancelLesson}
              isEditing={false}
            />
          ) : (
            <button
              onClick={handleAddLesson}
              className="w-full border-2 border-dashed border-slate-600 p-5 rounded-xl text-slate-400 hover:text-blue-400"
            >
              <Plus size={20} /> Add Lecture
            </button>
          )}

          {/* LESSON LIST */}
          {section.lesson?.map((lesson, index) => (
            <LessonItem
              key={lesson._id}
              lesson={lesson}
              lectureIndex={index}
              sectionId={section._id}
              courseId={courseId}
              onDeleteRequest={onDeleteLessonRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionItem;
