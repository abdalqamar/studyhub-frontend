// const RecentActivity = () => {
//   const activities = [
//     {
//       id: 1,
//       type: "completion",
//       message: "You completed Lesson 4 of React Basics",
//       time: "2 hours ago",
//       icon: "✅",
//       color: "text-green-400",
//     },
//     {
//       id: 2,
//       type: "achievement",
//       message: "You earned a badge in JavaScript Course",
//       time: "1 day ago",
//       icon: "🏆",
//       color: "text-yellow-400",
//     },
//     {
//       id: 3,
//       type: "quiz",
//       message: "Instructor uploaded new quiz in Node.js Course",
//       time: "2 days ago",
//       icon: "📝",
//       color: "text-blue-400",
//     },
//     {
//       id: 4,
//       type: "resource",
//       message: "New resources added to UI/UX Design course",
//       time: "3 days ago",
//       icon: "📚",
//       color: "text-purple-400",
//     },
//   ];

//   return (
//     <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//       <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>

//       <div className="space-y-4">
//         {activities.map((activity, index) => (
//           <div key={activity.id} className="flex items-start space-x-4">
//             <div className={`text-xl ${activity.color}`}>{activity.icon}</div>
//             <div className="flex-1">
//               <p className="text-slate-200">{activity.message}</p>
//               <p className="text-slate-400 text-sm mt-1">{activity.time}</p>
//             </div>
//             {index === 0 && (
//               <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//                 New
//               </span>
//             )}
//           </div>
//         ))}
//       </div>

//       <button className="w-full mt-4 text-center text-blue-400 hover:text-blue-300 text-sm font-medium">
//         Show More Activity →
//       </button>
//     </div>
//   );
// };

// export default RecentActivity;

// src/pages/StudentDashboard/components/RecentActivity.jsx
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
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
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
      iconColor: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
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
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Recent Activity
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">Your learning journey</p>
        </div>
        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
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
              className={`relative flex gap-4 p-4 ${activity.bgColor} ${activity.borderColor} border rounded-lg hover:bg-slate-800/80 transition-all duration-200 group cursor-pointer`}
            >
              {/* Timeline connector */}
              {index !== activities.length - 1 && (
                <div className="absolute left-[30px] top-[60px] w-0.5 h-8 bg-slate-700"></div>
              )}

              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-white font-semibold text-sm">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">{activity.description}</p>
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
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400 text-sm">No recent activity yet</p>
          <p className="text-slate-500 text-xs mt-1">
            Start learning to see your progress here
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
