import { Link } from "react-router-dom";
import { Plus, DollarSign, Video, BarChart3, ArrowRight } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: "Add New Course",
      description: "Create and publish new course",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "from-blue-600 to-cyan-600",
      href: "/instructor/courses/create",
    },
    {
      icon: DollarSign,
      label: "Request Payout",
      description: "Withdraw your earnings",
      color: "from-green-500 to-emerald-500",
      hoverColor: "from-green-600 to-emerald-600",
      href: "/instructor/payout",
    },
    {
      icon: Video,
      label: "Schedule Live Class",
      description: "Plan interactive sessions",
      color: "from-purple-500 to-pink-500",
      hoverColor: "from-purple-600 to-pink-600",
      href: "/instructor/live-classes",
    },
    {
      icon: BarChart3,
      label: "View Analytics",
      description: "Detailed performance insights",
      color: "from-orange-500 to-red-500",
      hoverColor: "from-orange-600 to-red-600",
      href: "/instructor/analytics",
    },
  ];

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Quick Actions</h3>
        <div className="text-slate-400 text-sm">Fast Access</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={index}
              to={action.href}
              className={`group bg-gradient-to-r ${action.color} hover:${action.hoverColor} rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-slate-600/30`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm sm:text-base">
                      {action.label}
                    </div>
                    <div className="text-white/70 text-xs sm:text-sm">
                      {action.description}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
