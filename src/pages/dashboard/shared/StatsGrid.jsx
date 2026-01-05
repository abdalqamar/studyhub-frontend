const StatsCard = ({ value, label, color = "blue", icon: Icon, trend }) => {
  const colorClasses = {
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    green: "text-green-400 bg-green-400/10 border-green-400/20",
    yellow: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    red: "text-red-400 bg-red-400/10 border-red-400/20",
    purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  };

  const iconColorClasses = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    red: "bg-red-500/20 text-red-400",
    purple: "bg-purple-500/20 text-purple-400",
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg group">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`p-3 rounded-lg ${iconColorClasses[color]} group-hover:scale-110 transition-transform duration-300`}
        >
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {trend && (
          <div
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              trend > 0
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </div>
        )}
      </div>
      <div
        className={`text-3xl font-bold mb-1 ${
          colorClasses[color].split(" ")[0]
        }`}
      >
        {value.toLocaleString()}
      </div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </div>
  );
};

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};
export default StatsGrid;
