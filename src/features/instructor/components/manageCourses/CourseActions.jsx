import {
  Pencil,
  MessageSquare,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";

const iconBtn =
  "w-8 h-8 flex items-center justify-center rounded-lg border bg-transparent transition-all duration-150";

const CourseActions = ({ course, userType, onAction }) => {
  if (userType === "admin") {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onAction("preview", course)}
          title="Preview"
          className={`${iconBtn} border-border-strong text-text-2 hover:bg-surface-raised hover:text-text-1`}
        >
          <Eye size={14} />
        </button>

        {course.status === "pending" && (
          <>
            <button
              onClick={() => onAction("approve", course)}
              title="Approve"
              className={`${iconBtn} border-teal-soft text-teal hover:bg-teal-soft`}
            >
              <CheckCircle size={14} />
            </button>
            <button
              onClick={() => onAction("reject", course)}
              title="Reject"
              className={`${iconBtn} border-danger-soft text-danger hover:bg-danger-soft`}
            >
              <XCircle size={14} />
            </button>
          </>
        )}

        <button
          onClick={() => onAction("delete", course)}
          title="Delete"
          className={`${iconBtn} border-danger-soft text-danger hover:bg-danger-soft`}
        >
          <Trash2 size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onAction("edit", course)}
        title="Edit"
        className={`${iconBtn} border-gold-dim text-gold hover:bg-gold-soft`}
      >
        <Pencil size={14} />
      </button>

      <button
        onClick={() => onAction("delete", course)}
        title="Delete"
        className={`${iconBtn} border-danger-soft text-danger hover:bg-danger-soft`}
      >
        <Trash2 size={14} />
      </button>

      {course.status === "rejected" ? (
        <button
          onClick={() => onAction("feedback", course)}
          title="View feedback"
          className={`${iconBtn} border-border-strong text-text-2 hover:bg-surface-raised hover:text-text-1`}
        >
          <MessageSquare size={14} />
        </button>
      ) : (
        <button
          onClick={() => onAction("preview", course)}
          title="Preview"
          className={`${iconBtn} border-border-strong text-text-2 hover:bg-surface-raised hover:text-text-1`}
        >
          <Eye size={14} />
        </button>
      )}
    </div>
  );
};

export default CourseActions;
