const ACCENTS = {
  gold: { box: "bg-gold-soft text-gold" },
  teal: { box: "bg-teal-soft text-teal" },
  blue: { box: "bg-accent-blue-soft text-accent-blue" },
  purple: { box: "bg-[#8b7ae026] text-[#8b7ae0]" },
};

const SummaryCards = () => {
  const stats = [
    {
      icon: "🎓",
      label: "Total Courses",
      value: "15",
      change: "+3 this month",
      accent: "gold",
      trend: "up",
    },
    {
      icon: "👥",
      label: "Total Students",
      value: "2,847",
      change: "+142 this week",
      accent: "teal",
      trend: "up",
    },
    {
      icon: "💰",
      label: "Total Earnings",
      value: "$24,580",
      change: "+$2,450 this month",
      accent: "blue",
      trend: "up",
    },
    {
      icon: "⭐",
      label: "Average Rating",
      value: "4.8",
      change: "+0.2 from last month",
      accent: "purple",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
      {stats.map((stat, index) => {
        const a = ACCENTS[stat.accent];
        return (
          <div
            key={index}
            className="bg-surface rounded-[14px] p-5 border border-border hover:border-border-strong transition-colors"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-[10px] flex items-center justify-center text-xl ${a.box}`}
              >
                {stat.icon}
              </div>
              <div className="text-right">
                <p className="font-mono text-2xl font-bold text-text-1">
                  {stat.value}
                </p>
                <div
                  className={`flex items-center justify-end mt-1 ${
                    stat.trend === "up" ? "text-teal" : "text-danger"
                  }`}
                >
                  <span className="text-[11.5px]">{stat.change}</span>
                </div>
              </div>
            </div>
            <p className="text-text-2 font-medium text-[13.5px] mt-4">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
