import {
  PlayCircle,
  CheckCircle2,
  Award,
  BookOpen,
  MessageSquare,
  FileCheck,
  Trophy,
  Clock,
} from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "video_watched",
      title: "Completed: Advanced React Hooks",
      description: "Watched 45 min video on useReducer and useContext",
      time: "2 hours ago",
      icon: PlayCircle,
      iconColor: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/20",
    },
    {
      id: 2,
      type: "assignment_submitted",
      title: "Submitted: JavaScript Assignment",
      description: "ES6 Features Quiz - Score: 95/100",
      time: "5 hours ago",
      icon: FileCheck,
      iconColor: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      id: 3,
      type: "certificate_earned",
      title: "Certificate Earned!",
      description: "React Fundamentals - Course Completion",
      time: "Yesterday",
      icon: Award,
      iconColor: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      id: 4,
      type: "course_enrolled",
      title: "Enrolled in New Course",
      description: "Node.js Backend Development Bootcamp",
      time: "2 days ago",
      icon: BookOpen,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      id: 5,
      type: "discussion_posted",
      title: "Posted in Discussion",
      description: "Question about async/await in JavaScript forum",
      time: "3 days ago",
      icon: MessageSquare,
      iconColor: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/20",
    },
    {
      id: 6,
      type: "achievement",
      title: "Achievement Unlocked!",
      description: "5-Day Study Streak - Keep it up!",
      time: "3 days ago",
      icon: Trophy,
      iconColor: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
  ];

  return (
    <div className="bg-surface-2/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-border-strong transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold" />
            Recent Activity
          </h3>
          <p className="text-sm text-text-2 mt-0.5">Your learning journey</p>
        </div>
        <button className="text-sm text-gold hover:text-gold font-medium transition-colors">
          View All
        </button>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className={`relative flex gap-4 p-4 ${activity.bgColor} ${activity.borderColor} border rounded-lg hover:bg-surface-2/80 transition-all duration-200 group cursor-pointer`}
            >
              {/* Timeline connector */}
              {index !== activities.length - 1 && (
                <div className="absolute left-[30px] top-[60px] w-0.5 h-8 bg-surface-2"></div>
              )}

              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-white font-semibold text-sm">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-text-3 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
                <p className="text-text-2 text-sm">{activity.description}</p>
              </div>

              {/* Hover arrow */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className={`w-4 h-4 ${activity.iconColor}`}
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
            </div>
          );
        })}
      </div>

      {/* Empty State (if no activities) */}
      {activities.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-text-3" />
          </div>
          <p className="text-text-2 text-sm">No recent activity yet</p>
          <p className="text-text-3 text-xs mt-1">
            Start learning to see your progress here
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
