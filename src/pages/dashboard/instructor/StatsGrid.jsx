// src/pages/Instructor/Dashboard/components/StatsGrid.jsx
const StatsGrid = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,458",
      change: "+12.5%",
      trend: "up",
      icon: "💰",
      description: "From all courses",
    },
    {
      title: "Total Students",
      value: "2,847",
      change: "+8.2%",
      trend: "up",
      icon: "👨‍🎓",
      description: "Active learners",
    },
    {
      title: "Course Completion",
      value: "78%",
      change: "+5.1%",
      trend: "up",
      icon: "✅",
      description: "Average rate",
    },
    {
      title: "Avg Rating",
      value: "4.8",
      change: "+0.2",
      trend: "up",
      icon: "⭐",
      description: "Across all courses",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
              <div
                className={`flex items-center mt-2 ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                <span className="text-sm font-medium">{stat.change}</span>
                <span className="text-xs ml-1">vs last period</span>
              </div>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
          <p className="text-xs text-gray-500 mt-3">{stat.description}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
