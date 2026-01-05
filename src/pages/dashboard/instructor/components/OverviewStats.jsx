// src/pages/InstructorDashboard/components/OverviewStats.jsx
const OverviewStats = () => {
  const stats = [
    {
      icon: "🎓",
      label: "Total Courses",
      value: "15",
      change: "+3 this month",
      color: "from-blue-500 to-blue-600",
      trend: "up",
    },
    {
      icon: "👥",
      label: "Total Students",
      value: "2,847",
      change: "+142 this week",
      color: "from-green-500 to-green-600",
      trend: "up",
    },
    {
      icon: "💰",
      label: "Total Earnings",
      value: "$24,580",
      change: "+$2,450 this month",
      color: "from-yellow-500 to-yellow-600",
      trend: "up",
    },
    {
      icon: "⭐",
      label: "Average Rating",
      value: "4.8",
      change: "+0.2 from last month",
      color: "from-purple-500 to-purple-600",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div
              className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center text-white text-2xl`}
            >
              {stat.icon}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <div
                className={`flex items-center justify-end mt-1 ${
                  stat.trend === "up" ? "text-green-400" : "text-red-400"
                }`}
              >
                <span className="text-sm">{stat.change}</span>
              </div>
            </div>
          </div>
          <p className="text-slate-300 font-medium mt-4">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewStats;
