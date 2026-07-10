import { Link } from "react-router-dom";
import { Plus, DollarSign, Video, BarChart3, ArrowRight } from "lucide-react";

const actions = [
  {
    icon: Plus,
    label: "Add New Course",
    description: "Create and publish new course",
    accent: "gold",
    href: "/instructor/courses/create",
  },
  {
    icon: DollarSign,
    label: "Request Payout",
    description: "Withdraw your earnings",
    accent: "teal",
    href: "/instructor/payout",
  },
  {
    icon: Video,
    label: "Schedule Live Class",
    description: "Plan interactive sessions",
    accent: "blue",
    href: "/instructor/live-classes",
  },
  {
    icon: BarChart3,
    label: "View Analytics",
    description: "Detailed performance insights",
    accent: "purple",
    href: "/instructor/analytics",
  },
];

const ACCENTS = {
  gold: "bg-gold-soft text-gold",
  teal: "bg-teal-soft text-teal",
  blue: "bg-accent-blue-soft text-accent-blue",
  purple: "bg-[#8b7ae026] text-[#8b7ae0]",
};

const QuickActions = () => {
  return (
    <div className="bg-surface rounded-[14px] p-5 border border-border">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-[17px] text-text-1">
          Quick Actions
        </h3>
        <div className="text-text-3 text-[12.5px]">Fast Access</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={index}
              to={action.href}
              className="group bg-surface-2 hover:border-border-strong border border-border rounded-[10px] p-4 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0 ${ACCENTS[action.accent]}`}
                  >
                    <IconComponent size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-text-1 text-[13.5px] truncate">
                      {action.label}
                    </div>
                    <div className="text-text-3 text-[11.5px] truncate">
                      {action.description}
                    </div>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-text-3 group-hover:text-text-1 group-hover:translate-x-1 transition-all flex-shrink-0"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
