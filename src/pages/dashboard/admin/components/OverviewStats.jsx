import {
  BookOpen,
  Users,
  IndianRupee,
  UserCheck,
  TrendingUp,
} from "lucide-react";

const OverviewStats = ({ stats }) => {
  const cards = [
    {
      icon: BookOpen,
      label: "Total Courses",
      value: stats?.totalCourses || 0,
      color: "bg-blue-500",
      target: 20,
    },
    {
      icon: Users,
      label: "Total Students",
      value: stats?.totalStudents || 0,
      color: "bg-green-500",
      target: 100,
    },
    {
      icon: IndianRupee,
      label: "Total Revenue",
      value: stats?.totalRevenue || 0,
      color: "bg-yellow-500",
      target: 50000,
      isRevenue: true,
    },
    {
      icon: UserCheck,
      label: "Instructors",
      value: stats?.totalInstructors || 0,
      color: "bg-purple-500",
      target: 10,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const numericValue = card.isRevenue ? card.value : card.value;
        const progress = Math.min(
          Math.round((numericValue / card.target) * 100),
          100
        );

        return (
          <div
            key={index}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
          >
            {/* Header with Icon and Value */}
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} text-white p-3 rounded-lg`}>
                <Icon size={32} strokeWidth={2} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  {card.isRevenue
                    ? `₹${card.value.toLocaleString("en-IN")}`
                    : card.value}
                </div>
                <div className="text-sm text-gray-500">{card.label}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-gray-600" />
                  <span className="text-xs font-medium text-gray-600">
                    Progress
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-700">
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div
                  className={`${card.color} h-2.5 rounded-full transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Target */}
            <div className="text-xs text-gray-500 mt-2">
              Target:{" "}
              {card.isRevenue
                ? `₹${card.target.toLocaleString("en-IN")}`
                : card.target}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default OverviewStats;
