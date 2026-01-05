import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../../features/courses/courseSlice";
import SubSectionForm from "./SubSectionForm";
import { Video, Edit, Eye, Trash2, Plus } from "lucide-react";

const NestedView = ({ section }) => {
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);

  // Handle lecture deletion
  const handleDeleteLecture = async (lectureId) => {
    if (!window.confirm("Are you sure you want to delete this lecture?"))
      return;

    try {
      const response = await deleteSubSection({
        subSectionId: lectureId,
        sectionId: section._id,
        courseId: course._id,
      });

      if (response) {
        // Update Redux state with the modified section
        const updatedCourseContent = course.courseContent.map((sec) =>
          sec._id === section._id ? response : sec
        );
        dispatch(
          setCourse({
            ...course,
            courseContent: updatedCourseContent,
          })
        );
      }
    } catch (error) {
      console.error("Failed to delete lecture:", error);
    }
  };

  // Open modal for different actions
  const openModal = (modalType, lecture = null) => {
    setSelectedLecture(lecture);
    setActiveModal(modalType);
  };

  // Close modal
  const closeModal = () => {
    setActiveModal(null);
    setSelectedLecture(null);
  };

  // Handle successful form submission
  const handleFormSuccess = (updatedSection) => {
    const updatedCourseContent = course.courseContent.map((sec) =>
      sec._id === section._id ? updatedSection : sec
    );
    dispatch(
      setCourse({
        ...course,
        courseContent: updatedCourseContent,
      })
    );
    closeModal();
  };

  return (
    <div className="nested-view">
      {/* Lectures List Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
        >
          <span
            className={`transform transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
          <span className="text-sm font-medium">
            Lectures ({section.subSections?.length || 0})
          </span>
        </button>

        <button
          onClick={() => openModal("add")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Lecture
        </button>
      </div>

      {/* Lectures List */}
      {expanded && (
        <div className="space-y-2">
          {section.subSections?.length === 0 ? (
            <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-700 rounded-lg">
              <Video className="w-8 h-8 mx-auto mb-2 text-slate-500" />
              <p className="text-sm">No lectures added yet</p>
              <button
                onClick={() => openModal("add")}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-1"
              >
                Add your first lecture
              </button>
            </div>
          ) : (
            section.subSections?.map((lecture, index) => (
              <div
                key={lecture._id}
                className="flex items-center justify-between bg-slate-700 rounded-lg p-3 border border-slate-600"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Video className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-white text-sm font-medium truncate">
                      {lecture.title || "Untitled Lecture"}
                    </h5>
                    <p className="text-slate-400 text-xs truncate">
                      {lecture.description || "No description"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {lecture.duration && (
                    <span className="text-slate-400 text-xs bg-slate-600 px-2 py-1 rounded">
                      {lecture.duration} min
                    </span>
                  )}

                  <div className="flex gap-1">
                    <button
                      onClick={() => openModal("view", lecture)}
                      className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal("edit", lecture)}
                      className="p-1 text-slate-400 hover:text-yellow-400 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLecture(lecture._id)}
                      className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* SubSection Form Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">
                {activeModal === "add" && "Add New Lecture"}
                {activeModal === "edit" && "Edit Lecture"}
                {activeModal === "view" && "Lecture Details"}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <SubSectionForm
                sectionId={section._id}
                lecture={selectedLecture}
                mode={activeModal}
                onSuccess={handleFormSuccess}
                onCancel={closeModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NestedView;
