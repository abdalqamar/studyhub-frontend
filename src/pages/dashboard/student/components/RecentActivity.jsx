const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "completion",
      message: "You completed Lesson 4 of React Basics",
      time: "2 hours ago",
      icon: "✅",
      color: "text-green-400",
    },
    {
      id: 2,
      type: "achievement",
      message: "You earned a badge in JavaScript Course",
      time: "1 day ago",
      icon: "🏆",
      color: "text-yellow-400",
    },
    {
      id: 3,
      type: "quiz",
      message: "Instructor uploaded new quiz in Node.js Course",
      time: "2 days ago",
      icon: "📝",
      color: "text-blue-400",
    },
    {
      id: 4,
      type: "resource",
      message: "New resources added to UI/UX Design course",
      time: "3 days ago",
      icon: "📚",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`text-xl ${activity.color}`}>{activity.icon}</div>
            <div className="flex-1">
              <p className="text-slate-200">{activity.message}</p>
              <p className="text-slate-400 text-sm mt-1">{activity.time}</p>
            </div>
            {index === 0 && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-center text-blue-400 hover:text-blue-300 text-sm font-medium">
        Show More Activity →
      </button>
    </div>
  );
};

export default RecentActivity;
