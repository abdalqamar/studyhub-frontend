import { useState } from "react";

const Announcements = () => {
  const [activeTab, setActiveTab] = useState("manage");
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Platform Maintenance Scheduled",
      message:
        "We will be performing scheduled maintenance on January 20th from 2:00 AM to 4:00 AM UTC. The platform will be temporarily unavailable during this time.",
      audience: "all",
      status: "published",
      scheduledFor: "2024-01-20T02:00:00Z",
      createdAt: "2024-01-15T10:00:00Z",
      createdBy: "Admin User",
    },
    {
      id: 2,
      title: "New Feature: Live Classes",
      message:
        "We are excited to announce the launch of our new Live Classes feature! Instructors can now schedule live sessions with their students.",
      audience: "instructors",
      status: "published",
      scheduledFor: null,
      createdAt: "2024-01-14T14:30:00Z",
      createdBy: "Admin User",
    },
    {
      id: 3,
      title: "Holiday Season Discount",
      message:
        "Enjoy 20% off on all courses this holiday season! Use code HOLIDAY20 at checkout. Offer valid until January 31st.",
      audience: "students",
      status: "scheduled",
      scheduledFor: "2024-01-25T00:00:00Z",
      createdAt: "2024-01-13T09:15:00Z",
      createdBy: "Admin User",
    },
    {
      id: 4,
      title: "Instructor Payout Update",
      message:
        "Starting next month, instructor payouts will be processed weekly instead of monthly. Please update your payment preferences accordingly.",
      audience: "instructors",
      status: "draft",
      scheduledFor: null,
      createdAt: "2024-01-12T16:45:00Z",
      createdBy: "Admin User",
    },
  ]);

  const [courseReviewNotifications, setCourseReviewNotifications] = useState([
    {
      id: 101,
      type: "course_submission",
      title: "New Course Submitted for Review",
      message: "React Masterclass 2024 has been submitted for approval",
      courseTitle: "React Masterclass 2024",
      instructor: "John Doe",
      instructorEmail: "john.doe@example.com",
      submittedAt: "2024-01-15T14:30:00Z",
      status: "pending",
      priority: "high",
    },
    {
      id: 102,
      type: "course_submission",
      title: "New Course Submitted for Review",
      message: "Advanced Node.js Patterns waiting for review",
      courseTitle: "Advanced Node.js Patterns",
      instructor: "Sarah Wilson",
      instructorEmail: "sarah.wilson@example.com",
      submittedAt: "2024-01-15T11:20:00Z",
      status: "pending",
      priority: "high",
    },
    {
      id: 103,
      type: "course_submission",
      title: "Course Update Submitted",
      message: "UI/UX Design Principles course has been updated",
      courseTitle: "UI/UX Design Principles",
      instructor: "Mike Johnson",
      instructorEmail: "mike.johnson@example.com",
      submittedAt: "2024-01-14T16:45:00Z",
      status: "pending",
      priority: "medium",
    },
    {
      id: 104,
      type: "course_submission",
      title: "New Course Submitted for Review",
      message: "Python for Data Science course ready for review",
      courseTitle: "Python for Data Science",
      instructor: "Emily Davis",
      instructorEmail: "emily.davis@example.com",
      submittedAt: "2024-01-14T09:15:00Z",
      status: "reviewed",
      priority: "medium",
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    audience: "all",
    scheduledFor: "",
  });

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    const announcement = {
      id: announcements.length + 1,
      ...newAnnouncement,
      status: newAnnouncement.scheduledFor ? "scheduled" : "published",
      createdAt: new Date().toISOString(),
      createdBy: "Admin User",
    };
    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({
      title: "",
      message: "",
      audience: "all",
      scheduledFor: "",
    });
  };

  const handleDeleteAnnouncement = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAnnouncements(
      announcements.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const handleCourseReviewAction = (notificationId, action) => {
    setCourseReviewNotifications(
      courseReviewNotifications.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              status:
                action === "approve"
                  ? "approved"
                  : action === "reject"
                  ? "rejected"
                  : "reviewed",
            }
          : notification
      )
    );
  };

  const getAudienceColor = (audience) => {
    switch (audience) {
      case "all":
        return "bg-purple-500";
      case "students":
        return "bg-blue-500";
      case "instructors":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "scheduled":
        return "bg-yellow-500";
      case "draft":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getReviewStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "reviewed":
        return "bg-blue-500";
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-400 bg-red-500/10";
      case "medium":
        return "border-yellow-400 bg-yellow-500/10";
      case "low":
        return "border-green-400 bg-green-500/10";
      default:
        return "border-gray-400 bg-gray-500/10";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Immediate";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pendingReviewsCount = courseReviewNotifications.filter(
    (n) => n.status === "pending"
  ).length;

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-700 rounded-lg p-1 mb-6 w-fit">
        <button
          onClick={() => setActiveTab("manage")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "manage"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:text-white"
          }`}
        >
          Manage Announcements
        </button>
        <button
          onClick={() => setActiveTab("course-reviews")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
            activeTab === "course-reviews"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:text-white"
          }`}
        >
          Course Reviews
          {pendingReviewsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {pendingReviewsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "create"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:text-white"
          }`}
        >
          Create New
        </button>
      </div>

      {activeTab === "create" ? (
        /* Create Announcement Form */
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">
            Create New Announcement
          </h3>

          <form onSubmit={handleCreateAnnouncement} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Announcement Title
              </label>
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    title: e.target.value,
                  })
                }
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                placeholder="Enter announcement title..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>
              <textarea
                value={newAnnouncement.message}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    message: e.target.value,
                  })
                }
                rows="6"
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                placeholder="Enter announcement message..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Audience
                </label>
                <select
                  value={newAnnouncement.audience}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      audience: e.target.value,
                    })
                  }
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option value="all">All Users</option>
                  <option value="students">Students Only</option>
                  <option value="instructors">Instructors Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Schedule For
                </label>
                <input
                  type="datetime-local"
                  value={newAnnouncement.scheduledFor}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      scheduledFor: e.target.value,
                    })
                  }
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                <div className="text-slate-400 text-xs mt-1">
                  Leave empty to publish immediately
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Publish Announcement
              </button>
              <button
                type="button"
                onClick={() =>
                  setNewAnnouncement({
                    title: "",
                    message: "",
                    audience: "all",
                    scheduledFor: "",
                  })
                }
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      ) : activeTab === "course-reviews" ? (
        /* Course Reviews Tab */
        <div>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-blue-400">
                {courseReviewNotifications.length}
              </div>
              <div className="text-slate-400 text-sm">Total Submissions</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-yellow-400">
                {
                  courseReviewNotifications.filter(
                    (n) => n.status === "pending"
                  ).length
                }
              </div>
              <div className="text-slate-400 text-sm">Pending Review</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-green-400">
                {
                  courseReviewNotifications.filter(
                    (n) => n.status === "approved"
                  ).length
                }
              </div>
              <div className="text-slate-400 text-sm">Approved</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-red-400">
                {
                  courseReviewNotifications.filter(
                    (n) => n.status === "rejected"
                  ).length
                }
              </div>
              <div className="text-slate-400 text-sm">Rejected</div>
            </div>
          </div>

          {/* Course Review Notifications */}
          <div className="space-y-4">
            {courseReviewNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-slate-800 rounded-xl p-6 border-2 transition-colors ${getPriorityColor(
                  notification.priority
                )} ${notification.status === "pending" ? "animate-pulse" : ""}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl text-blue-400">📚</div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {notification.title}
                      </h3>
                      <p className="text-slate-400 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                        <span>
                          Course:{" "}
                          <strong className="text-slate-300">
                            {notification.courseTitle}
                          </strong>
                        </span>
                        <span>•</span>
                        <span>
                          Instructor:{" "}
                          <strong className="text-slate-300">
                            {notification.instructor}
                          </strong>
                        </span>
                        <span>•</span>
                        <span>{notification.instructorEmail}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getReviewStatusColor(
                        notification.status
                      )} text-white`}
                    >
                      {notification.status}
                    </span>
                    <span className="text-slate-500 text-sm">
                      {formatDate(notification.submittedAt)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                {notification.status === "pending" && (
                  <div className="flex space-x-3 border-t border-slate-700 pt-4">
                    <button
                      onClick={() =>
                        handleCourseReviewAction(notification.id, "approve")
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Approve Course
                    </button>
                    <button
                      onClick={() =>
                        handleCourseReviewAction(notification.id, "reject")
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Reject Course
                    </button>
                    <button
                      onClick={() =>
                        handleCourseReviewAction(notification.id, "review")
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Mark as Reviewed
                    </button>
                    <button className="border border-slate-600 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Course Details
                    </button>
                  </div>
                )}

                {notification.status !== "pending" && (
                  <div className="flex space-x-3 border-t border-slate-700 pt-4">
                    <button className="border border-slate-600 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Course
                    </button>
                    <button className="border border-slate-600 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Contact Instructor
                    </button>
                    {notification.status === "rejected" && (
                      <button className="border border-slate-600 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        View Feedback
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {courseReviewNotifications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-white mb-2">
                No course review submissions
              </h3>
              <p className="text-slate-400">
                When instructors submit courses for review, they will appear
                here.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Manage Announcements Tab */
        <div>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-blue-400">
                {announcements.length}
              </div>
              <div className="text-slate-400 text-sm">Total Announcements</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-green-400">
                {announcements.filter((a) => a.status === "published").length}
              </div>
              <div className="text-slate-400 text-sm">Published</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-yellow-400">
                {announcements.filter((a) => a.status === "scheduled").length}
              </div>
              <div className="text-slate-400 text-sm">Scheduled</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-gray-400">
                {announcements.filter((a) => a.status === "draft").length}
              </div>
              <div className="text-slate-400 text-sm">Drafts</div>
            </div>
          </div>

          {/* Announcements List */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Announcement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Audience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {announcements.map((announcement) => (
                    <tr
                      key={announcement.id}
                      className="hover:bg-slate-750 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-white">
                            {announcement.title}
                          </div>
                          <div className="text-slate-400 text-sm mt-1 line-clamp-2">
                            {announcement.message}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAudienceColor(
                            announcement.audience
                          )} text-white`}
                        >
                          {announcement.audience}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            announcement.status
                          )} text-white`}
                        >
                          {announcement.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {formatDate(announcement.scheduledFor)}
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {formatDate(announcement.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                            Edit
                          </button>
                          {announcement.status === "draft" && (
                            <button
                              onClick={() =>
                                handleStatusChange(announcement.id, "published")
                              }
                              className="text-green-400 hover:text-green-300 text-sm font-medium"
                            >
                              Publish
                            </button>
                          )}
                          {announcement.status === "published" && (
                            <button
                              onClick={() =>
                                handleStatusChange(announcement.id, "draft")
                              }
                              className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                            >
                              Unpublish
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleDeleteAnnouncement(announcement.id)
                            }
                            className="text-red-400 hover:text-red-300 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {announcements.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📢</div>
                <h3 className="text-lg font-medium text-white mb-2">
                  No announcements found
                </h3>
                <p className="text-slate-400">
                  Create your first announcement to notify users
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
