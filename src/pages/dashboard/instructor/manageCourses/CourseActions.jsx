import {
  Pencil,
  MessageSquare,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";

const CourseActions = ({ course, userType, onAction }) => {
  if (userType === "admin") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onAction("preview", course)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg text-sm font-medium transition-all duration-200"
        >
          <Eye size={16} />
          View
        </button>

        {course.status === "pending" && (
          <>
            <button
              onClick={() => onAction("approve", course)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <CheckCircle size={16} />
              Approve
            </button>
            <button
              onClick={() => onAction("reject", course)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-orange-400 hover:text-orange-300 hover:bg-orange-400/10 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <XCircle size={16} />
              Reject
            </button>
          </>
        )}

        <button
          onClick={() => onAction("delete", course)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg text-sm font-medium transition-all duration-200"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    );
  }

  // Instructor Actions
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onAction("edit", course)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
      >
        <Pencil size={16} />
        Edit
      </button>

      <button
        onClick={() => onAction("delete", course)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
      >
        <Trash2 size={16} />
        Delete
      </button>

      {course.status === "rejected" ? (
        <button
          onClick={() => onAction("feedback", course)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
        >
          <MessageSquare size={16} />
          Feedback
        </button>
      ) : (
        <button
          onClick={() => onAction("preview", course)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
        >
          <Eye size={16} />
          Preview
        </button>
      )}
    </div>
  );
};

export default CourseActions;
