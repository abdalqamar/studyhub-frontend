// src/pages/InstructorDashboard/components/RecentActivity.jsx
const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "enrollment",
      message: "New student enrolled in JavaScript Masterclass",
      time: "2 hours ago",
      amount: "$49",
      icon: "👥",
      color: "text-green-400",
    },
    {
      id: 2,
      type: "payment",
      message: "Payment of ₹1500 credited",
      time: "5 hours ago",
      amount: "$20",
      icon: "💰",
      color: "text-yellow-400",
    },
    {
      id: 3,
      type: "approval",
      message: 'Course "React Basics" approved by admin',
      time: "1 day ago",
      amount: null,
      icon: "✅",
      color: "text-blue-400",
    },
    {
      id: 4,
      type: "review",
      message: "New 5-star review received",
      time: "2 days ago",
      amount: null,
      icon: "⭐",
      color: "text-purple-400",
    },
    {
      id: 5,
      type: "update",
      message: "Course content updated successfully",
      time: "3 days ago",
      amount: null,
      icon: "📝",
      color: "text-indigo-400",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <div className={`text-xl ${activity.color} mt-1`}>
              {activity.icon}
            </div>

            <div className="flex-1">
              <p className="text-slate-200 text-sm">{activity.message}</p>
              <p className="text-slate-400 text-xs mt-1">{activity.time}</p>
            </div>

            {activity.amount && (
              <div className="text-green-400 font-medium text-sm">
                {activity.amount}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-center text-blue-400 hover:text-blue-300 text-sm font-medium">
        Load More Activity →
      </button>
    </div>
  );
};

export default RecentActivity;
