import { Video, Clock, Calendar, Bell, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
const UpcomingLiveClasses = () => {
  const liveClasses = [
    {
      id: 1,
      title: "Node.js Authentication Deep Dive",
      instructor: "Sarah Smith",
      instructorAvatar: "https://i.pravatar.cc/150?img=1",
      date: "Today",
      time: "3:00 PM",
      duration: "2 hours",
      isToday: true,
      startsIn: "2 hours",
      color: "bg-green-500",
      status: "upcoming",
    },
    {
      id: 2,
      title: "React State Management with Zustand",
      instructor: "John Doe",
      instructorAvatar: "https://i.pravatar.cc/150?img=2",
      date: "Tomorrow",
      time: "5:00 PM",
      duration: "1.5 hours",
      isToday: false,
      startsIn: "1 day",
      color: "bg-blue-500",
      status: "upcoming",
    },
    {
      id: 3,
      title: "UI/UX Design Principles Workshop",
      instructor: "Mike Johnson",
      instructorAvatar: "https://i.pravatar.cc/150?img=3",
      date: "Feb 8",
      time: "4:00 PM",
      duration: "2 hours",
      isToday: false,
      startsIn: "3 days",
      color: "bg-purple-500",
      status: "upcoming",
    },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors h-full flex flex-col">
      {/* Header */}
      <div className="mb-6 flex-shrink-0">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Video className="w-5 h-5 text-red-400" />
          Upcoming Live Classes
        </h3>
        <p className="text-sm text-slate-400 mt-0.5">
          {liveClasses.length} classes scheduled
        </p>
      </div>

      {/* Classes List */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
        {liveClasses.map((classItem) => (
          <div
            key={classItem.id}
            className={`bg-slate-800/80 rounded-xl border ${
              classItem.isToday
                ? "border-green-500/50 ring-1 ring-green-500/20"
                : "border-slate-700"
            } hover:border-slate-600 transition-all duration-200 p-4 group cursor-pointer`}
          >
            {/* Today Badge */}
            {classItem.isToday && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-green-400">
                    Starting Soon
                  </span>
                </div>
              </div>
            )}

            {/* Title */}
            <h4 className="text-white font-semibold text-sm mb-3 group-hover:text-blue-400 transition-colors">
              {classItem.title}
            </h4>

            {/* Instructor */}
            <div className="flex items-center gap-2 mb-3">
              <img
                src={classItem.instructorAvatar}
                alt={classItem.instructor}
                className="w-8 h-8 rounded-full border-2 border-slate-700"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400">Instructor</p>
                <p className="text-sm text-slate-200 font-medium truncate">
                  {classItem.instructor}
                </p>
              </div>
            </div>

            {/* Time Info */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  {classItem.date} at {classItem.time}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  {classItem.duration} • Starts in {classItem.startsIn}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-700">
              {classItem.isToday ? (
                <button className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Video className="w-4 h-4" />
                  Join Class
                </button>
              ) : (
                <button className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Bell className="w-4 h-4" />
                  Set Reminder
                </button>
              )}
              <button className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-4 pt-4 border-t border-slate-700 flex-shrink-0">
        <Link
          to={"/student/live-classes"}
          className="w-full px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium text-sm transition-colors"
        >
          View Full Schedule
        </Link>
      </div>

      {/* Empty State */}
      {liveClasses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400 text-sm mb-2">No upcoming classes</p>
          <p className="text-slate-500 text-xs">
            Check back later for new sessions
          </p>
        </div>
      )}
    </div>
  );
};

export default UpcomingLiveClasses;
