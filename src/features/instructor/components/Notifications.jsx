const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Payout Processed",
      message: "Your payment of $2,450 has been processed",
      time: "1 hour ago",
      type: "payout",
      unread: true,
    },
    {
      id: 2,
      title: "New Review",
      message: "Student left a 5-star review on React Masterclass",
      time: "3 hours ago",
      type: "review",
      unread: true,
    },
    {
      id: 3,
      title: "Course Approved",
      message: "Your new course has been approved by admin",
      time: "1 day ago",
      type: "approval",
      unread: false,
    },
    {
      id: 4,
      title: "System Maintenance",
      message: "Scheduled maintenance this weekend",
      time: "2 days ago",
      type: "system",
      unread: false,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "payout":
        return "💰";
      case "review":
        return "⭐";
      case "approval":
        return "✅";
      case "system":
        return "⚙️";
      default:
        return "🔔";
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "payout":
        return "text-green-400";
      case "review":
        return "text-yellow-400";
      case "approval":
        return "text-gold";
      case "system":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-surface-2 rounded-xl p-6 border border-border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Notifications</h3>
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          2 new
        </span>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg transition-colors ${
              notification.unread
                ? "bg-surface/20 border border-gold-dim/50"
                : "bg-surface-2 hover:bg-surface-2"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`text-xl ${getColor(notification.type)}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4
                    className={`font-semibold ${
                      notification.unread ? "text-white" : "text-text-2"
                    }`}
                  >
                    {notification.title}
                  </h4>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                  )}
                </div>
                <p className="text-text-2 text-sm mt-1">
                  {notification.message}
                </p>
                <p className="text-text-3 text-xs mt-2">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-center text-gold hover:text-gold text-sm font-medium">
        Mark All as Read
      </button>
    </div>
  );
};

export default Notifications;
