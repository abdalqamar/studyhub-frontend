import { Play, Clock, FileText, Bell, Calendar, BookOpen } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Continue Learning",
      description: "React Advanced Patterns",
      progress: 65,
      icon: Play,
      color: "bg-gold",
      iconColor: "text-gold",
      bgColor: "bg-gold/10",
      hoverColor: "hover:bg-gold/20",
      link: "/courses/react-advanced",
    },
    {
      id: 2,
      title: "Upcoming Class",
      description: "Node.js Authentication in 2h",
      time: "Today, 3:00 PM",
      icon: Clock,
      color: "bg-green-500",
      iconColor: "text-green-400",
      bgColor: "bg-green-500/10",
      hoverColor: "hover:bg-green-500/20",
      link: "/live-classes",
    },
    {
      id: 3,
      title: "Pending Assignment",
      description: "JavaScript ES6 Features",
      deadline: "Due in 2 days",
      icon: FileText,
      color: "bg-orange-500",
      iconColor: "text-orange-400",
      bgColor: "bg-orange-500/10",
      hoverColor: "hover:bg-orange-500/20",
      link: "/assignments",
      badge: "2",
    },
    {
      id: 4,
      title: "New Announcements",
      description: "3 new updates from instructors",
      icon: Bell,
      color: "bg-purple-500",
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      hoverColor: "hover:bg-purple-500/20",
      link: "/announcements",
      badge: "3",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            onClick={() => console.log(`Navigate to ${action.link}`)}
            className={`${action.bgColor} ${action.hoverColor} backdrop-blur-sm rounded-xl p-5 border border-border hover:border-border-strong transition-all duration-200 text-left group relative overflow-hidden`}
          >
            {/* Badge */}
            {action.badge && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {action.badge}
                </span>
              </div>
            )}

            {/* Icon */}
            <div
              className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
            >
              <Icon className={`w-6 h-6 text-white`} />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-white font-semibold text-base mb-1">
                {action.title}
              </h3>
              <p className="text-text-2 text-sm mb-2">{action.description}</p>

              {/* Progress bar for Continue Learning */}
              {action.progress && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-2">Progress</span>
                    <span className="text-xs font-semibold text-gold">
                      {action.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all duration-500"
                      style={{ width: `${action.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Time/Deadline tags */}
              {(action.time || action.deadline) && (
                <div className="mt-3 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-text-3" />
                  <span className={`text-xs font-medium ${action.iconColor}`}>
                    {action.time || action.deadline}
                  </span>
                </div>
              )}
            </div>

            {/* Hover arrow */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
              <svg
                className={`w-5 h-5 ${action.iconColor}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;
