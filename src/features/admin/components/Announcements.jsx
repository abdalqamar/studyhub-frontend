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
        return "bg-accent-blue";
      case "students":
        return "bg-gold";
      case "instructors":
        return "bg-teal";
      default:
        return "bg-surface-2";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-teal";
      case "scheduled":
        return "bg-gold";
      case "draft":
        return "bg-surface-2";
      default:
        return "bg-surface-2";
    }
  };

  const getReviewStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-gold";
      case "reviewed":
        return "bg-accent-blue";
      case "approved":
        return "bg-teal";
      case "rejected":
        return "bg-danger";
      default:
        return "bg-surface-2";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-danger bg-danger-soft";
      case "medium":
        return "border-gold bg-gold-soft";
      case "low":
        return "border-teal bg-teal-soft";
      default:
        return "border-border-strong bg-surface-2";
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
      <div className="flex gap-1 bg-surface-2 rounded-lg p-1 mb-6 w-fit">
        <button
          onClick={() => setActiveTab("manage")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "manage"
              ? "bg-gold text-bg"
              : "text-text-2 hover:text-text-1"
          }`}
        >
          Manage Announcements
        </button>
        <button
          onClick={() => setActiveTab("course-reviews")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
            activeTab === "course-reviews"
              ? "bg-gold text-bg"
              : "text-text-2 hover:text-text-1"
          }`}
        >
          Course Reviews
          {pendingReviewsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-danger text-bg text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {pendingReviewsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "create"
              ? "bg-gold text-bg"
              : "text-text-2 hover:text-text-1"
          }`}
        >
          Create New
        </button>
      </div>

      {activeTab === "create" ? (
        /* Create Announcement Form */
        <div className="bg-surface rounded-[14px] p-6 border border-border">
          <h3 className="font-display font-bold text-xl text-text-1 mb-6">
            Create New Announcement
          </h3>

          <form onSubmit={handleCreateAnnouncement} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-2 mb-2">
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
                className="bg-surface-2 border border-border-strong rounded-lg px-4 py-2 text-text-1 placeholder-text-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent w-full"
                placeholder="Enter announcement title..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-2 mb-2">
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
                className="bg-surface-2 border border-border-strong rounded-lg px-4 py-2 text-text-1 placeholder-text-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent w-full"
                placeholder="Enter announcement message..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-2 mb-2">
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
                  className="bg-surface-2 border border-border-strong rounded-lg px-4 py-2 text-text-1 focus:outline-none focus:ring-2 focus:ring-gold w-full"
                >
                  <option value="all">All Users</option>
                  <option value="students">Students Only</option>
                  <option value="instructors">Instructors Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-2 mb-2">
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
                  className="bg-surface-2 border border-border-strong rounded-lg px-4 py-2 text-text-1 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent w-full"
                />
                <div className="text-text-3 text-xs mt-1">
                  Leave empty to publish immediately
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-teal hover:opacity-90 text-bg px-6 py-2 rounded-lg font-semibold text-sm transition-opacity"
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
                className="bg-surface-2 hover:bg-border text-text-1 px-6 py-2 rounded-lg font-medium text-sm transition-colors"
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
            <div className="bg-surface rounded-[14px] p-4 border border-border">
              <div className="font-mono text-2xl font-bold text-gold">
                {courseReviewNotifications.length}
              </div>
              <div className="text-text-3 text-[12.5px] mt-0.5">
                Total Submissions
              </div>
            </div>
            <div className="bg-surface rounded-[14px] p-4 border border-border">
              <div className="font-mono text-2xl font-bold text-gold">
                {
                  courseReviewNotifications.filter(
                    (n) => n.status === "pending"
                  ).length
                }
              </div>
              <div className="text-text-3 text-[12.5px] mt-0.5">
                Pending Review
              </div>
            </div>
            <div className="bg-surface rounded-[14px] p-4 border border-border">
              <div className="font-mono text-2xl font-bold text-teal">
                {
                  courseReviewNotifications.filter(
                    (n) => n.status === "approved"
                  ).length
                }
              </div>
              <div className="text-text-3 text-[12.5px] mt-0.5">Approved</div>
            </div>
            <div className="bg-surface rounded-[14px] p-4 border border-border">
              <div className="font-mono text-2xl font-bold text-danger">
                {
                  courseReviewNotifications.filter(
                    (n) => n.status === "rejected"
                  ).length
                }
              </div>
              <div className="text-text-3 text-[12.5px] mt-0.5">Rejected</div>
            </div>
          </div>

          {/* Course Review Notifications */}
          <div className="space-y-4">
            {courseReviewNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-surface rounded-[14px] p-6 border transition-colors ${getPriorityColor(
                  notification.priority
                )}`}
              >
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl text-gold">📚</div>
                    <div>
                      <h3 className="font-semibold text-text-1 text-[15.5px]">
                        {notification.title}
                      </h3>
                      <p className="text-text-2 text-[13.5px] mt-1">
                        {notification.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-[12.5px] text-text-3">
                        <span>
                          Course:{" "}
                          <strong className="text-text-2">
                            {notification.courseTitle}
                          </strong>
                        </span>
                        <span>·</span>
                        <span>
                          Instructor:{" "}
                          <strong className="text-text-2">
                            {notification.instructor}
                          </strong>
                        </span>
                        <span>·</span>
                        <span>{notification.instructorEmail}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-medium ${getReviewStatusColor(
                        notification.status
                      )} text-bg`}
                    >
                      {notification.status}
                    </span>
                    <span className="text-text-3 text-[12px] font-mono">
                      {formatDate(notification.submittedAt)}
                    </span>
                  </div>
                </div>

                {notification.status === "pending" && (
                  <div className="flex gap-3 border-t border-border pt-4">
                    <button
                      onClick={() =>
                        handleCourseReviewAction(notification.id, "approve")
                      }
                      className="bg-teal hover:opacity-90 text-bg px-4 py-2 rounded-lg text-[13px] font-semibold transition-opacity"
                    >
                      Approve Course
                    </button>
                    <button
                      onClick={() =>
                        handleCourseReviewAction(notification.id, "reject")
                      }
                      className="bg-danger hover:opacity-90 text-bg px-4 py-2 rounded-lg text-[13px] font-semibold transition-opacity"
                    >
                      Reject Course
                    </button>
                    <button
                      onClick={() =>
                        handleCourseReviewAction(notification.id, "review")
                      }
                      className="bg-gold hover:opacity-90 text-bg px-4 py-2 rounded-lg text-[13px] font-semibold transition-opacity"
                    >
                      Mark as Reviewed
                    </button>
                    <button className="border border-border-strong hover:border-gold-dim text-text-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors">
                      View Course Details
                    </button>
                  </div>
                )}

                {notification.status !== "pending" && (
                  <div className="flex gap-3 border-t border-border pt-4">
                    <button className="border border-border-strong hover:border-gold-dim text-text-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors">
                      View Course
                    </button>
                    <button className="border border-border-strong hover:border-gold-dim text-text-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors">
                      Contact Instructor
                    </button>
                    {notification.status === "rejected" && (
                      <button className="border border-border-strong hover:border-gold-dim text-text-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors">
                        View Feedback
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {courseReviewNotifications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-text-1 mb-2">
                No course review submissions
              </h3>
              <p className="text-text-3 text-sm">
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
            <div className="bg-surface rounded-[14px] p-4 border border-border">
              <div className="font-mono text-2xl font-bold text-gold">
                {announcements.length}
              </div>
              <div className="text-text-3 text-[12.5px] mt-0.5">
                Total Announcements
              </div>
            </div>
            <div className="bg-surface rounded-[14px] p-4 border border-border">
              <div className="font-mono text-2xl font-bold text-teal">
                {announcements.filter((a) => a.status === "published").length}
              </div>
              <div className="text-text-3 text-[12.5px] mt-0.5">Published</div>
            </div>
            <div className="bg-surface rounded-[14px] p-4 border border-border">
              <div className="font-mono text-2xl font-bold text-gold">
                {announcements.filter((a) => a.status === "scheduled").length}
              </div>
              <div className="text-text-3 text-[12.5px] mt-0.5">Scheduled</div>
            </div>
            <div className="bg-surface rounded-[14px] p-4 border border-border">
              <div className="font-mono text-2xl font-bold text-text-3">
                {announcements.filter((a) => a.status === "draft").length}
              </div>
              <div className="text-text-3 text-[12.5px] mt-0.5">Drafts</div>
            </div>
          </div>

          {/* Announcements List */}
          <div className="bg-surface rounded-[14px] border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-2">
                  <tr>
                    <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                      Announcement
                    </th>
                    <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                      Audience
                    </th>
                    <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {announcements.map((announcement) => (
                    <tr
                      key={announcement.id}
                      className="hover:bg-surface-2 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-text-1 text-[13.5px]">
                            {announcement.title}
                          </div>
                          <div className="text-text-2 text-[12.5px] mt-1 line-clamp-2">
                            {announcement.message}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-medium ${getAudienceColor(
                            announcement.audience
                          )} text-bg`}
                        >
                          {announcement.audience}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-medium ${getStatusColor(
                            announcement.status
                          )} text-bg`}
                        >
                          {announcement.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-text-2 text-[13px]">
                        {formatDate(announcement.scheduledFor)}
                      </td>
                      <td className="px-6 py-4 text-text-2 text-[13px]">
                        {formatDate(announcement.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button className="text-gold hover:text-gold/80 text-[13px] font-medium">
                            Edit
                          </button>
                          {announcement.status === "draft" && (
                            <button
                              onClick={() =>
                                handleStatusChange(announcement.id, "published")
                              }
                              className="text-teal hover:text-teal/80 text-[13px] font-medium"
                            >
                              Publish
                            </button>
                          )}
                          {announcement.status === "published" && (
                            <button
                              onClick={() =>
                                handleStatusChange(announcement.id, "draft")
                              }
                              className="text-gold hover:text-gold/80 text-[13px] font-medium"
                            >
                              Unpublish
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleDeleteAnnouncement(announcement.id)
                            }
                            className="text-danger hover:text-danger/80 text-[13px] font-medium"
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

            {announcements.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📢</div>
                <h3 className="text-lg font-medium text-text-1 mb-2">
                  No announcements found
                </h3>
                <p className="text-text-3 text-sm">
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
