const CourseActions = ({ course, userType, onAction }) => {
  if (userType === "admin") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onAction("preview", course)}
          className="px-3 py-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg text-sm font-medium transition-all duration-200"
        >
          View
        </button>

        {course.status === "pending" && (
          <>
            <button
              onClick={() => onAction("approve", course)}
              className="px-3 py-1.5 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Approve
            </button>
            <button
              onClick={() => onAction("reject", course)}
              className="px-3 py-1.5 text-orange-400 hover:text-orange-300 hover:bg-orange-400/10 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Reject
            </button>
          </>
        )}

        <button
          onClick={() => onAction("delete", course)}
          className="px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg text-sm font-medium transition-all duration-200"
        >
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
        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
      >
        Edit
      </button>

      <button
        onClick={() => onAction("delete", course)}
        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
      >
        Delete
      </button>

      {course.status === "rejected" ? (
        <button
          onClick={() => onAction("feedback", course)}
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
        >
          Feedback
        </button>
      ) : (
        <button
          onClick={() => onAction("preview", course)}
          className="px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
        >
          Preview
        </button>
      )}
    </div>
  );
};

export default CourseActions;
