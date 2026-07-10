const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "enrollment",
      message: "New student enrolled in JavaScript Masterclass",
      time: "2 hours ago",
      amount: "$49",
      icon: "👥",
      color: "text-teal",
    },
    {
      id: 2,
      type: "payment",
      message: "Payment of ₹1500 credited",
      time: "5 hours ago",
      amount: "$20",
      icon: "💰",
      color: "text-gold",
    },
    {
      id: 3,
      type: "approval",
      message: 'Course "React Basics" approved by admin',
      time: "1 day ago",
      amount: null,
      icon: "✅",
      color: "text-teal",
    },
    {
      id: 4,
      type: "review",
      message: "New 5-star review received",
      time: "2 days ago",
      amount: null,
      icon: "⭐",
      color: "text-gold",
    },
    {
      id: 5,
      type: "update",
      message: "Course content updated successfully",
      time: "3 days ago",
      amount: null,
      icon: "📝",
      color: "text-accent-blue",
    },
  ];

  return (
    <div className="bg-surface rounded-[14px] p-5 border border-border">
      <h3 className="font-display font-semibold text-[17px] text-text-1 mb-5">
        Recent Activity
      </h3>

      <div className="space-y-1">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-surface-2 transition-colors"
          >
            <div className={`text-lg ${activity.color} mt-0.5`}>
              {activity.icon}
            </div>

            <div className="flex-1">
              <p className="text-text-1 text-[13.5px]">{activity.message}</p>
              <p className="text-text-3 text-[11.5px] mt-0.5">
                {activity.time}
              </p>
            </div>

            {activity.amount && (
              <div className="text-teal font-mono font-semibold text-[13px]">
                {activity.amount}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-3 text-center text-gold hover:text-gold/80 text-[13px] font-medium">
        Load More Activity →
      </button>
    </div>
  );
};

export default RecentActivity;
