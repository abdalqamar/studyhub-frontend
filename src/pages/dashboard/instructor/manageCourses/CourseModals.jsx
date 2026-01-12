import { X } from "lucide-react";
import Modal from "../../../../components/Modal";

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
        <Modal
          modalData={{
            type: "delete",
            title: "Delete Course?",
            message: `Are you sure you want to permanently delete "${
              selectedCourse?.courseName || selectedCourse?.title
            }"?`,
            details:
              "⚠️ This action cannot be undone. All course content, sections, and lessons will be permanently removed.",
            confirmText: "Delete Course",
            cancelText: "Cancel",
            onConfirm: onConfirmDelete,
            onClose: () => onClose("delete"),
          }}
        />
      )}

      {/* Feedback Modal for Instructor View */}
      {showFeedbackModal && selectedCourse?.feedback && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                Rejection Feedback
              </h3>
              <button
                onClick={() => onClose("feedback")}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Feedback Content */}
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

            {/* Close Button */}
            <button
              onClick={() => onClose("feedback")}
              className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Reject Modal for Admin View */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  Reject Course
                </h3>
                <p className="text-slate-400 text-sm">
                  "{selectedCourse?.courseName || selectedCourse?.title}"
                </p>
              </div>
              <button
                onClick={() => onClose("reject")}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Feedback Textarea */}
            <div className="mb-6">
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Rejection Feedback *
              </label>
              <textarea
                value={rejectFeedback}
                onChange={(e) => setRejectFeedback(e.target.value)}
                placeholder="Provide detailed feedback for the instructor..."
                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                rows="5"
              />
              {!rejectFeedback.trim() && (
                <p className="text-xs text-slate-500 mt-1">
                  Please provide feedback to help the instructor improve
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => onClose("reject")}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onConfirmReject}
                disabled={!rejectFeedback.trim()}
                className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
