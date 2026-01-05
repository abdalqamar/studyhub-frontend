const SummaryCards = () => {
  const stats = [
    {
      icon: "📚",
      label: "Active Courses",
      value: "7",
      color: "bg-blue-500",
      change: "+2 this month",
    },
    {
      icon: "🕒",
      label: "Total Hours Watched",
      value: "142",
      color: "bg-green-500",
      change: "+12h this week",
    },
    {
      icon: "📜",
      label: "Certificates Earned",
      value: "5",
      color: "bg-purple-500",
      change: "2 pending",
    },
    {
      icon: "🏆",
      label: "Leaderboard Rank",
      value: "#12",
      color: "bg-yellow-500",
      change: "↑ 3 spots this week",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-slate-400 text-sm mt-1">{stat.change}</p>
            </div>
          </div>
          <p className="text-slate-300 font-medium mt-4">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
