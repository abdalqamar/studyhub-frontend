import Modal from "@/shared/components/Modal";
import { X } from "lucide-react";

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
      {showDeleteModal && (
        <Modal
          modalData={{
            type: "delete",
            title: "Delete Course?",
            message: `Are you sure you want to permanently delete "${
              selectedCourse?.courseName || selectedCourse?.title
            }"?`,
            details:
              "This action cannot be undone. All course content, sections, and lessons will be permanently removed.",
            confirmText: "Delete Course",
            cancelText: "Cancel",
            onConfirm: onConfirmDelete,
            onClose: () => onClose("delete"),
          }}
        />
      )}

      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-border rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-display text-lg font-semibold text-text-1 mb-4">
              Rejection feedback
            </h3>

            <div className="bg-danger-soft border border-danger-soft rounded-xl p-4 mb-4">
              <p className="text-danger font-medium text-sm mb-1">
                {selectedCourse?.title}
              </p>
              <p className="font-mono text-[11px] text-text-3 mb-3">
                Rejected on{" "}
                {selectedCourse?.updatedAt
                  ? new Date(selectedCourse.updatedAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-text-2 text-sm leading-relaxed border-t border-border pt-3">
                {selectedCourse?.feedback || "No feedback provided."}
              </p>
            </div>

            <button
              onClick={() => onClose("feedback")}
              className="w-full py-2.5 rounded-xl bg-surface-2 hover:bg-surface-raised text-text-1 font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-border rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-text-1 mb-1">
                  Reject course
                </h3>
                <p className="text-text-3 text-sm">
                  {selectedCourse?.courseName || selectedCourse?.title}
                </p>
              </div>
              <button
                onClick={() => onClose("reject")}
                className="text-text-2 hover:text-text-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-text-2 text-sm font-medium mb-2">
                Rejection feedback *
              </label>
              <textarea
                value={rejectFeedback}
                onChange={(e) => setRejectFeedback(e.target.value)}
                placeholder="Provide detailed feedback for the instructor..."
                rows="5"
                className="w-full bg-surface-2 border border-border-strong rounded-xl p-3 text-text-1 placeholder-text-3 outline-none focus:ring-2 focus:ring-danger transition-all"
              />
              {!rejectFeedback.trim() && (
                <p className="text-xs text-text-3 mt-1">
                  Please provide feedback to help the instructor improve
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onClose("reject")}
                className="flex-1 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-raised text-text-1 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirmReject}
                disabled={!rejectFeedback.trim()}
                className="flex-1 py-2.5 rounded-xl bg-danger hover:opacity-90 text-white font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Reject course
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseModals;
