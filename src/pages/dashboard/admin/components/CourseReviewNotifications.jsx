import { useState } from "react";

const CourseReviewNotifications = () => {
  const [courseReviews, setCourseReviews] = useState([
    {
      id: 1,
      courseId: 123,
      courseTitle: "React Masterclass 2024",
      instructorName: "John Doe",
      submittedAt: "2024-01-15T10:00:00Z",
      status: "pending", // pending, approved, rejected
    },
    {
      id: 2,
      courseId: 124,
      courseTitle: "Node.js Backend Development",
      instructorName: "Sarah Wilson",
      submittedAt: "2024-01-14T14:30:00Z",
      status: "pending",
    },
    {
      id: 3,
      courseId: 125,
      courseTitle: "UI/UX Design Principles",
      instructorName: "Mike Johnson",
      submittedAt: "2024-01-13T09:15:00Z",
      status: "pending",
    },
  ]);

  const handleApprove = (id) => {
    // In a real app, we would make an API call to update the course status
    setCourseReviews(
      courseReviews.map((review) =>
        review.id === id ? { ...review, status: "approved" } : review
      )
    );
  };

  const handleReject = (id) => {
    // In a real app, we would make an API call to update the course status
    setCourseReviews(
      courseReviews.map((review) =>
        review.id === id ? { ...review, status: "rejected" } : review
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-2xl font-bold text-blue-400">
            {courseReviews.length}
          </div>
          <div className="text-slate-400 text-sm">Total Submissions</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-2xl font-bold text-yellow-400">
            {courseReviews.filter((a) => a.status === "pending").length}
          </div>
          <div className="text-slate-400 text-sm">Pending Review</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-2xl font-bold text-green-400">
            {courseReviews.filter((a) => a.status === "approved").length}
          </div>
          <div className="text-slate-400 text-sm">Approved</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-2xl font-bold text-red-400">
            {courseReviews.filter((a) => a.status === "rejected").length}
          </div>
          <div className="text-slate-400 text-sm">Rejected</div>
        </div>
      </div>

      {/* Course Reviews List */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Submitted At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {courseReviews.map((review) => (
                <tr
                  key={review.id}
                  className="hover:bg-slate-750 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">
                      {review.courseTitle}
                    </div>
                    <div className="text-slate-400 text-sm">
                      ID: {review.courseId}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {review.instructorName}
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {formatDate(review.submittedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        review.status
                      )} text-white`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {review.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(review.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(review.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {courseReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-white mb-2">
              No course review submissions
            </h3>
            <p className="text-slate-400">
              When instructors submit courses for review, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseReviewNotifications;
