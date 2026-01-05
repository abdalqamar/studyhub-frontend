const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Course Available",
      message: "Advanced React Patterns course is now available",
      time: "5 min ago",
      unread: true,
      type: "course",
    },
    {
      id: 2,
      title: "Live Session Reminder",
      message: "Your live class starts in 30 minutes",
      time: "1 hour ago",
      unread: true,
      type: "live",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "course":
        return "📚";
      case "live":
        return "🎥";
      case "assignment":
        return "📝";
      case "system":
        return "⚙️";
      default:
        return "🔔";
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Notifications</h3>
        <div className="flex items-center space-x-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            2 new
          </span>
          <a
            href="/notifications"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            View All →
          </a>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg transition-colors ${
              notification.unread
                ? "bg-blue-900/20 border border-blue-800/50"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-lg">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4
                    className={`font-semibold text-sm ${
                      notification.unread ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {notification.title}
                  </h4>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  {notification.message}
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
