import {
  Bell,
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  RefreshCcw,
  Star,
  Trophy,
  Video,
} from "lucide-react";
import { useState } from "react";

const NotificationsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Course Available",
      message: "Advanced React Patterns course is now available for enrollment",
      type: "course",
      time: "5 minutes ago",
      read: false,
      important: true,
    },
    {
      id: 2,
      title: "Live Session Reminder",
      message: "Your live class 'Advanced React Hooks' starts in 30 minutes",
      type: "live",
      time: "1 hour ago",
      read: false,
      important: true,
    },
    {
      id: 3,
      title: "Assignment Due",
      message: "Project submission for React Component Library due in 2 days",
      type: "assignment",
      time: "3 hours ago",
      read: true,
      important: false,
    },
    {
      id: 4,
      title: "Course Update",
      message: "New resources added to Node.js Backend Development course",
      type: "update",
      time: "1 day ago",
      read: true,
      important: false,
    },
    {
      id: 5,
      title: "Achievement Unlocked",
      message: "You earned the 'Fast Learner' badge in React Masterclass",
      type: "achievement",
      time: "2 days ago",
      read: true,
      important: false,
    },
    {
      id: 6,
      title: "Community Reply",
      message: "Mike Rodriguez replied to your question about error handling",
      type: "community",
      time: "3 days ago",
      read: true,
      important: false,
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
      case "course":
        return BookOpen;
      case "live":
        return Video;
      case "assignment":
        return ClipboardCheck;
      case "achievement":
        return Trophy;
      case "community":
        return MessageSquare;
      case "update":
        return RefreshCcw;
      default:
        return Bell;
    }
  };
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-slate-400 mt-2">
            Stay updated with your learning journey
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
            {notifications.filter((n) => n.important).length}
          </div>
          <div className="text-slate-400 text-sm">Important</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {notifications.filter((n) => n.type === "course").length}
          </div>
          <div className="text-slate-400 text-sm">Course Updates</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            "all",
            "unread",
            "important",
            "course",
            "live",
            "assignment",
            "achievement",
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
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const Icon = getIcon(notification.type);

          return (
            <div
              key={notification.id}
              className={`bg-slate-800 rounded-xl p-6 border transition-colors ${
                notification.read
                  ? "border-slate-700 hover:border-slate-600"
                  : "border-blue-800 bg-blue-900/20 hover:border-blue-700"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className={`font-semibold text-lg ${
                        notification.read ? "text-slate-300" : "text-white"
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                      {notification.important && (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      )}
                      <span className="text-slate-500 text-sm">
                        {notification.time}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-400 mb-4">{notification.message}</p>

                  <div className="flex space-x-2">
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
                    <button className="border border-slate-600 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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

export default NotificationsPage;
