import { BookOpen, Clock, Award, Trophy } from "lucide-react";

const SummaryCards = () => {
  const stats = [
    {
      icon: BookOpen,
      label: "Active Courses",
      value: "7",
      color: "bg-gold/10",
      iconColor: "text-gold",
      ringColor: "ring-gold/20",
      change: "+2 this month",
      changeColor: "text-gold",
    },
    {
      icon: Clock,
      label: "Total Hours Watched",
      value: "142",
      color: "bg-green-500/10",
      iconColor: "text-green-400",
      ringColor: "ring-green-500/20",
      change: "+12h this week",
      changeColor: "text-green-400",
    },
    {
      icon: Award,
      label: "Certificates Earned",
      value: "5",
      color: "bg-purple-500/10",
      iconColor: "text-purple-400",
      ringColor: "ring-purple-500/20",
      change: "2 pending",
      changeColor: "text-purple-400",
    },
    {
      icon: Trophy,
      label: "Leaderboard Rank",
      value: "#12",
      color: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
      ringColor: "ring-yellow-500/20",
      change: "↑ 3 spots this week",
      changeColor: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-surface-2/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-border-strong hover:bg-surface-2 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center ring-2 ${stat.ringColor} group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
            <div>
              <p className="text-text-2 font-medium text-sm mb-2">
                {stat.label}
              </p>
              <p className={`text-xs font-medium ${stat.changeColor}`}>
                {stat.change}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
