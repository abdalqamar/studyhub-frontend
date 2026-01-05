import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ConfirmationModal from "../../shared/ConfirmationModal";
import { Plus } from "lucide-react";
import SectionForm from "./SectionForm";
import SectionItem from "./SectionItem";
import {
  useCreateSection,
  useDeleteSection,
  useDeleteLesson,
} from "../../../../hooks/useCourses";
import { errorToast, successToast } from "../../../../utils/toastUtils";

const CourseCurriculum = ({ course, courseId, onNext, onBack }) => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [creatingSection, setCreatingSection] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const createSectionMutation = useCreateSection(courseId);
  const deleteSectionMutation = useDeleteSection(courseId);
  const deleteLessonMutation = useDeleteLesson(courseId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  /* ---------------- CREATE SECTION ---------------- */
  const handleAddSection = () => {
    setCreatingSection(true);
    reset({ sectionName: "" });
  };

  const handleCancelSection = () => {
    setCreatingSection(false);
    reset();
  };

  const handleSaveSection = (data) => {
    if (!data.sectionName.trim())
      return toast.error("Section name is required");

    createSectionMutation.mutate(
      { sectionName: data.sectionName.trim() },
      {
        onSuccess: () => {
          successToast("section created by abdal");
          setCreatingSection(false);
          reset();
        },
        onError: () => errorToast("Failed to create section"),
      }
    );
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      await deleteSectionMutation.mutateAsync({ sectionId });
      successToast("Section deleted");
      setShowDeleteModal(false);
    } catch (err) {
      errorToast("Failed to delete section");
    }
  };

  const handleDeleteLesson = async ({ sectionId, lessonId }) => {
    try {
      setShowDeleteModal(false);
      await deleteLessonMutation.mutateAsync({ sectionId, lessonId });
    } catch (err) {
      setShowDeleteModal(false);
    }
  };

  const totalLectures =
    course?.courseContent?.reduce(
      (sum, section) => sum + (section?.lesson?.length || 0),
      0
    ) || 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="px-2 sm:px-0">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Course Curriculum
              </h2>
              <p className="text-slate-400 text-sm">
                Design your course structure
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">
                    {course?.courseContent?.length || 0}
                  </div>
                  <div className="text-xs text-slate-500">Sections</div>
                </div>
                <div className="w-px h-8 bg-slate-700"></div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">
                    {totalLectures}
                  </div>
                  <div className="text-xs text-slate-500">Lectures</div>
                </div>
              </div>
            </div>
          </div>

          {/* CREATE SECTION FORM */}
          {creatingSection && (
            <SectionForm
              register={register}
              handleSubmit={handleSubmit}
              onSave={handleSaveSection}
              onCancel={handleCancelSection}
              errors={errors}
              saving={createSectionMutation.isPending}
            />
          )}

          {/* SECTION LIST */}
          {course?.courseContent?.length > 0 ? (
            <div className="space-y-5">
              {course.courseContent.map((section) => (
                <SectionItem
                  key={section._id}
                  section={section}
                  courseId={courseId}
                  isExpanded={expandedSections.includes(section._id)}
                  onToggle={toggleSection}
                  onDeleteRequest={(sectionId) => {
                    setDeleteTarget({
                      type: "section",
                      sectionId,
                    });
                    setShowDeleteModal(true);
                  }}
                  onDeleteLessonRequest={(sectionId, lessonId) => {
                    setDeleteTarget({
                      type: "lesson",
                      sectionId,
                      lessonId,
                    });
                    setShowDeleteModal(true);
                  }}
                />
              ))}
            </div>
          ) : (
            !creatingSection && (
              <div className="text-center py-16 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/30">
                <div className="text-slate-400 mb-4">
                  <div className="flex justify-center mb-4">
                    <Plus
                      size={64}
                      strokeWidth={1.5}
                      className="text-slate-600"
                    />
                  </div>
                  <p className="text-lg font-medium text-white mb-2">
                    No sections added yet
                  </p>
                  <p className="text-sm">
                    Start by creating your first section
                  </p>
                </div>
              </div>
            )
          )}

          {/* ADD SECTION BUTTON */}
          {!creatingSection && (
            <button
              type="button"
              onClick={handleAddSection}
              className="w-full border-2 border-dashed border-slate-600 hover:border-blue-500/50 rounded-xl p-6 sm:p-8 text-slate-400 hover:text-blue-400 transition-all mt-6 flex items-center justify-center gap-3 hover:bg-blue-500/5 group shadow-lg"
            >
              <Plus
                className="group-hover:rotate-90 transition-transform"
                size={24}
              />
              <span className="font-semibold">Add New Section</span>
            </button>
          )}

          {/* NAVIGATION */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-slate-700">
            <button
              onClick={onBack}
              className="border border-slate-600 hover:border-slate-500 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium"
            >
              ← Previous: Details
            </button>

            <button
              onClick={onNext}
              disabled={
                !course?.courseContent?.some((sec) => sec.lesson?.length > 0)
              }
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white disabled:opacity-50"
            >
              Next: Preview →
            </button>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <ConfirmationModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            if (deleteTarget.type === "section") {
              handleDeleteSection(deleteTarget.sectionId);
            } else {
              handleDeleteLesson(deleteTarget);
            }
          }}
          title={
            deleteTarget?.type === "lesson"
              ? "Delete Lesson?"
              : "Delete Section?"
          }
          message={
            deleteTarget?.type === "lesson"
              ? "This will permanently delete this lesson."
              : "This will delete the entire section and all its lessons."
          }
          confirmLabel={
            deleteTarget?.type === "lesson" ? "Delete Lesson" : "Delete Section"
          }
          confirmColor="bg-red-600 hover:bg-red-700"
        />
      )}
    </div>
  );
};

export default CourseCurriculum;

// const CourseCurriculum = ({ onNext, onBack }) => {
//   const { course, loading } = useSelector((state) => state.course);
//   const dispatch = useDispatch();

//   const [expandedSections, setExpandedSections] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [creatingSection, setCreatingSection] = useState(false);

//   const {
//     register: registerSection,
//     handleSubmit: handleSubmitSection,
//     reset: resetSection,
//     formState: { errors: sectionErrors },
//   } = useForm();

//   const toggleSection = (sectionId) => {
//     setExpandedSections((prev) =>
//       prev.includes(sectionId)
//         ? prev.filter((id) => id !== sectionId)
//         : [...prev, sectionId]
//     );
//   };

//   // Section Handlers
//   const handleAddSection = () => {
//     setCreatingSection(true);
//     resetSection({ sectionName: "" });
//   };

//   const handleCancelSection = () => {
//     setCreatingSection(false);
//     resetSection();
//   };

//   const handleSaveSection = async (data) => {
//     if (!data.sectionName.trim()) {
//       toast.error("Section name is required");
//       return;
//     }

//     if (!course?._id) {
//       toast.error("Course not found");
//       return;
//     }

//     try {
//       await dispatch(
//         createSection({
//           courseId: course._id,
//           sectionName: data.sectionName.trim(),
//         })
//       ).unwrap();

//       toast.success("Section created successfully!");
//       setCreatingSection(false);
//       resetSection();
//     } catch (error) {
//       console.error("Save section error:", error);
//       toast.error(error.message || "Failed to create section");
//     }
//   };

//   const handleDeleteSection = async (sectionId) => {
//     toast.loading("Deleting Section...");
//     try {
//       await dispatch(
//         deleteSection({
//           courseId: course._id,
//           sectionId,
//         })
//       ).unwrap();
//       toast.success("Section deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete section");
//     } finally {
//       setShowDeleteModal(false);
//       toast.dismiss();
//     }
//   };

//   const handleDeleteLesson = async (sectionId, lessonId) => {
//     const toastId = toast.loading("Deleting lesson...");
//     try {
//       await dispatch(
//         deleteLesson({
//           sectionId,
//           lessonId,
//         })
//       ).unwrap();
//       toast.success("Lesson deleted successfully!", { id: toastId });
//     } catch (error) {
//       toast.error("Failed to delete lesson", { id: toastId });
//     } finally {
//       setShowDeleteModal(false);
//     }
//   };

//   const totalLectures =
//     course?.courseContent?.reduce((total, section) => {
//       return total + (section.lesson?.length || 0);
//     }, 0) || 0;

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="px-2 sm:px-0">
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 Course Curriculum
//               </h2>
//               <p className="text-slate-400 text-sm">
//                 Design your course structure
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2.5 shadow-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="text-center">
//                     <div className="text-lg font-bold text-blue-400">
//                       {course?.courseContent?.length || 0}
//                     </div>
//                     <div className="text-xs text-slate-500">Sections</div>
//                   </div>
//                   <div className="w-px h-8 bg-slate-700"></div>
//                   <div className="text-center">
//                     <div className="text-lg font-bold text-purple-400">
//                       {totalLectures}
//                     </div>
//                     <div className="text-xs text-slate-500">Lectures</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Create Section Form */}
//           {creatingSection && (
//             <SectionForm
//               register={registerSection}
//               handleSubmit={handleSubmitSection}
//               onSave={handleSaveSection}
//               onCancel={handleCancelSection}
//               errors={sectionErrors}
//               loading={loading}
//               isEditing={false}
//             />
//           )}

//           {/* Sections List */}
//           {course?.courseContent?.length > 0 ? (
//             <div className="space-y-5">
//               {course.courseContent.map((section) => (
//                 <SectionItem
//                   key={section._id}
//                   section={section}
//                   courseId={course._id}
//                   isExpanded={expandedSections.includes(section._id)}
//                   onToggle={toggleSection}
//                   onDeleteRequest={(sectionId) => {
//                     setDeleteTarget({
//                       type: "section",
//                       sectionId,
//                     });
//                     setShowDeleteModal(true);
//                   }}
//                   onDeleteLessonRequest={(sectionId, lessonId) => {
//                     setDeleteTarget({
//                       type: "lesson",
//                       sectionId,
//                       lessonId,
//                     });
//                     setShowDeleteModal(true);
//                   }}
//                   loading={loading}
//                 />
//               ))}
//             </div>
//           ) : (
//             !creatingSection && (
//               <div className="text-center py-16 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/30">
//                 <div className="text-slate-400 mb-4">
//                   <div className="flex justify-center mb-4">
//                     <Plus
//                       size={64}
//                       strokeWidth={1.5}
//                       className="text-slate-600"
//                     />
//                   </div>
//                   <p className="text-lg font-medium text-white mb-2">
//                     No sections added yet
//                   </p>
//                   <p className="text-sm">
//                     Start by creating your first section
//                   </p>
//                 </div>
//               </div>
//             )
//           )}

//           {/* Add Section Button */}
//           {!creatingSection && (
//             <button
//               type="button"
//               onClick={handleAddSection}
//               disabled={loading.createSection}
//               className="w-full border-2 border-dashed border-slate-600 hover:border-blue-500/50 rounded-xl p-6 sm:p-8 text-slate-400 hover:text-blue-400 transition-all mt-6 text-sm sm:text-base flex items-center justify-center gap-3 hover:bg-blue-500/5 group shadow-lg disabled:opacity-50"
//             >
//               <Plus
//                 className="group-hover:rotate-90 transition-transform"
//                 size={24}
//               />
//               <span className="font-semibold">Add New Section</span>
//             </button>
//           )}

//           {/* Navigation */}
//           <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-slate-700">
//             <button
//               onClick={onBack}
//               className="border border-slate-600 hover:border-slate-500 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//             >
//               ← Previous: Details
//             </button>

//             <button
//               onClick={onNext}
//               disabled={
//                 !course?.courseContent?.some(
//                   (section) => section.lesson?.length > 0
//                 )
//               }
//               className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next: Preview & Submit →
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <ConfirmationModal
//           show={showDeleteModal}
//           onClose={() => setShowDeleteModal(false)}
//           onConfirm={() => {
//             if (!deleteTarget) return;
//             if (deleteTarget.type === "lesson") {
//               handleDeleteLesson(deleteTarget.sectionId, deleteTarget.lessonId);
//             } else if (deleteTarget.type === "section") {
//               handleDeleteSection(deleteTarget.sectionId);
//             }
//           }}
//           title={
//             deleteTarget?.type === "lesson"
//               ? "Confirm Lesson Deletion"
//               : "Confirm Section Deletion"
//           }
//           message={
//             deleteTarget?.type === "lesson"
//               ? "Are you sure you want to delete this lesson? This action cannot be undone."
//               : "Are you sure you want to delete this section and all its lessons? This action cannot be undone."
//           }
//           confirmLabel={
//             deleteTarget?.type === "lesson" ? "Delete Lesson" : "Delete Section"
//           }
//           confirmColor="bg-red-600 hover:bg-red-700"
//         />
//       )}
//     </div>
//   );
// };

// export default CourseCurriculum;
