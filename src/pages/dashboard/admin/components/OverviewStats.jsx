const OverviewStats = () => {
  const stats = [
    {
      icon: "🎓",
      label: "Total Courses",
      value: "15",
      change: "+3 this month",
      color: "bg-blue-500",
      progress: 75,
      target: 20,
    },
    {
      icon: "👥",
      label: "Total Students",
      value: "2,847",
      change: "+142 this week",
      color: "bg-green-500",
      progress: 60,
      target: 5000,
    },
    {
      icon: "💰",
      label: "Total Earnings",
      value: "$24,580",
      change: "+$2,450 this month",
      color: "bg-yellow-500",
      progress: 45,
      target: 50000,
    },
    {
      icon: "⭐",
      label: "Average Rating",
      value: "4.8",
      change: "+0.2 from last month",
      color: "bg-purple-500",
      progress: 96,
      target: 5.0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}
            >
              {stat.icon}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-green-400 text-sm">{stat.change}</p>
            </div>
          </div>

          <p className="text-slate-300 font-medium mb-2">{stat.label}</p>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Progress</span>
              <span>{stat.progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${stat.color} transition-all duration-500`}
                style={{ width: `${stat.progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Target: {stat.target}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewStats;
