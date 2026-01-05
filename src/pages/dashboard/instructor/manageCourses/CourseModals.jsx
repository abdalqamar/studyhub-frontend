import { AlertTriangle, X } from "lucide-react";

const CourseModals = ({
  showDeleteModal,
  showFeedbackModal,
  showRejectModal,
  selectedCourse,
  rejectFeedback,
  setRejectFeedback,
  onClose,
  onConfirmDelete,
  onConfirmReject,
}) => {
  return (
    <>
      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl p-6 w-full max-w-md transform transition-all scale-100 hover:scale-[1.01]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="text-yellow-500 w-7 h-7" />
                Confirm Deletion
              </h3>
              <button
                onClick={() => onClose("delete")}
                className="text-slate-400 hover:text-white text-lg transition"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Message */}
            <p className="text-slate-300 mb-6 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <span className="text-white font-medium">
                "{selectedCourse?.courseName || selectedCourse?.title}"
              </span>
              ? This action{" "}
              <span className="text-red-400 font-medium">cannot</span> be
              undone.
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => onClose("delete")}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirmDelete}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg shadow-md transition-all"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal (Instructor View) */}
      {showFeedbackModal && selectedCourse?.feedback && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl p-6 w-full max-w-md">
            <h3 className=" mb-4 text-xl font-semibold text-white">
              Rejection Feedback
            </h3>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-4">
              <p className="text-orange-400 font-semibold mb-1">
                Course: {selectedCourse?.courseName || selectedCourse?.title}
              </p>

              <p className="text-slate-400 text-xs mb-3">
                Rejected by Admin on{" "}
                {selectedCourse?.updatedAt
                  ? new Date(selectedCourse.updatedAt).toLocaleDateString()
                  : "N/A"}
              </p>

              <p className="text-slate-300 text-sm leading-relaxed border-t border-slate-600 pt-3">
                {selectedCourse?.feedback || "No feedback provided."}
              </p>
            </div>

            <button
              onClick={() => onClose("feedback")}
              className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Reject Modal  */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-2">
              Reject Course
            </h3>
            <p className="text-slate-300 mb-4">
              Provide feedback for rejecting "
              {selectedCourse?.courseName || selectedCourse?.title}"
            </p>
            <textarea
              value={rejectFeedback}
              onChange={(e) => setRejectFeedback(e.target.value)}
              placeholder="Enter rejection feedback..."
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-6"
              rows="5"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => onClose("reject")}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirmReject}
                disabled={!rejectFeedback.trim()}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject Course
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseModals;
