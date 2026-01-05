import { useState } from "react";

const InstructorNotifications = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Course Approved",
      message:
        "Your course 'React Masterclass 2024' has been approved and is now live",
      type: "course-approval",
      time: "2 hours ago",
      read: false,
      important: true,
      course: "React Masterclass 2024",
    },
    {
      id: 2,
      title: "New Enrollment",
      message:
        "5 new students enrolled in your Node.js Backend Development course",
      type: "enrollment",
      time: "5 hours ago",
      read: false,
      important: true,
      course: "Node.js Backend Development",
      students: 5,
    },
    {
      id: 3,
      title: "Course Review",
      message:
        "A student left a 5-star review on your UI/UX Design Principles course",
      type: "review",
      time: "1 day ago",
      read: true,
      important: false,
      course: "UI/UX Design Principles",
      rating: 5,
    },
    {
      id: 4,
      title: "Payment Processed",
      message:
        "Your earnings for this month have been processed and transferred",
      type: "payment",
      time: "2 days ago",
      read: true,
      important: true,
      amount: "$1,245.50",
    },
    {
      id: 5,
      title: "Course Needs Update",
      message:
        "Your course 'Advanced JavaScript Patterns' needs content updates for better engagement",
      type: "course-update",
      time: "3 days ago",
      read: true,
      important: false,
      course: "Advanced JavaScript Patterns",
    },
    {
      id: 6,
      title: "New Message",
      message:
        "You have a new student question in your React Masterclass course",
      type: "message",
      time: "4 days ago",
      read: true,
      important: false,
      course: "React Masterclass 2024",
    },
    {
      id: 7,
      title: "Featured Course Opportunity",
      message: "Your course has been selected for featured placement next week",
      type: "promotion",
      time: "1 week ago",
      read: true,
      important: true,
      course: "Node.js Backend Development",
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.read;
    if (activeFilter === "important") return notification.important;
    return notification.type === activeFilter;
  });

  const getIcon = (type) => {
    switch (type) {
      case "course-approval":
        return "✅";
      case "enrollment":
        return "🎓";
      case "review":
        return "⭐";
      case "payment":
        return "💰";
      case "course-update":
        return "🔄";
      case "message":
        return "💬";
      case "promotion":
        return "🚀";
      default:
        return "🔔";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "course-approval":
        return "text-green-400";
      case "enrollment":
        return "text-blue-400";
      case "review":
        return "text-yellow-400";
      case "payment":
        return "text-green-400";
      case "course-update":
        return "text-orange-400";
      case "message":
        return "text-purple-400";
      case "promotion":
        return "text-pink-400";
      default:
        return "text-slate-400";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "course-approval":
        return "Course Approval";
      case "enrollment":
        return "New Enrollment";
      case "review":
        return "Student Review";
      case "payment":
        return "Payment";
      case "course-update":
        return "Course Update";
      case "message":
        return "Student Message";
      case "promotion":
        return "Promotion";
      default:
        return type;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const importantCount = notifications.filter((n) => n.important).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-slate-400 mt-2">
            Stay updated with your teaching activities
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">
            {notifications.length}
          </div>
          <div className="text-slate-400 text-sm">Total</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{unreadCount}</div>
          <div className="text-slate-400 text-sm">Unread</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {importantCount}
          </div>
          <div className="text-slate-400 text-sm">Important</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {notifications.filter((n) => n.type === "enrollment").length}
          </div>
          <div className="text-slate-400 text-sm">New Enrollments</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            "all",
            "unread",
            "important",
            "enrollment",
            "payment",
            "review",
            "course-approval",
          ].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                activeFilter === filter
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {filter === "course-approval" ? "Approvals" : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-slate-800 rounded-xl p-6 border transition-colors ${
              notification.read
                ? "border-slate-700 hover:border-slate-600"
                : "border-blue-800 bg-blue-900/20 hover:border-blue-700"
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`text-2xl ${getTypeColor(notification.type)}`}>
                {getIcon(notification.type)}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3
                      className={`font-semibold text-lg ${
                        notification.read ? "text-slate-300" : "text-white"
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                          notification.type
                        )} bg-slate-700`}
                      >
                        {getTypeLabel(notification.type)}
                      </span>
                      {notification.course && (
                        <span className="text-slate-400 text-sm">
                          • {notification.course}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                    {notification.important && (
                      <span className="text-yellow-400 text-sm">⭐</span>
                    )}
                    <span className="text-slate-500 text-sm">
                      {notification.time}
                    </span>
                  </div>
                </div>

                <p className="text-slate-400 mb-4">{notification.message}</p>

                {/* Additional Info */}
                {notification.students && (
                  <div className="bg-slate-700 rounded-lg p-3 mb-3">
                    <span className="text-green-400 font-medium">
                      +{notification.students} students
                    </span>
                    <span className="text-slate-400 text-sm ml-2">
                      enrolled in your course
                    </span>
                  </div>
                )}

                {notification.rating && (
                  <div className="bg-slate-700 rounded-lg p-3 mb-3">
                    <span className="text-yellow-400 font-medium">
                      {notification.rating} stars
                    </span>
                    <span className="text-slate-400 text-sm ml-2">
                      new review received
                    </span>
                  </div>
                )}

                {notification.amount && (
                  <div className="bg-slate-700 rounded-lg p-3 mb-3">
                    <span className="text-green-400 font-medium">
                      {notification.amount}
                    </span>
                    <span className="text-slate-400 text-sm ml-2">
                      payment processed
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="border border-slate-600 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                  {notification.course && (
                    <button className="border border-slate-600 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Course
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔔</div>
          <h3 className="text-lg font-medium text-white mb-2">
            No notifications found
          </h3>
          <p className="text-slate-400">
            You're all caught up! No notifications in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default InstructorNotifications;
