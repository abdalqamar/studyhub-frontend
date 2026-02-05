import { Play, Clock, BookOpen, MoreVertical, TrendingUp } from "lucide-react";

const ActiveCourses = () => {
  const courses = [
    {
      id: 1,
      title: "React Advanced Patterns",
      instructor: "John Doe",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      progress: 65,
      totalLessons: 42,
      completedLessons: 27,
      lastAccessed: "2 hours ago",
      nextLesson: "Custom Hooks Deep Dive",
      duration: "12h 30m total",
      category: "Frontend",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      instructor: "Sarah Smith",
      thumbnail:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
      progress: 42,
      totalLessons: 38,
      completedLessons: 16,
      lastAccessed: "1 day ago",
      nextLesson: "Authentication with JWT",
      duration: "15h 45m total",
      category: "Backend",
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Johnson",
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
      progress: 28,
      totalLessons: 30,
      completedLessons: 8,
      lastAccessed: "3 days ago",
      nextLesson: "Color Theory & Typography",
      duration: "8h 20m total",
      category: "Design",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-400" />
            Active Courses
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">
            {courses.length} courses in progress
          </p>
        </div>
        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
          View All Courses
        </button>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-slate-800/80 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200 overflow-hidden group"
          >
            <div className="flex flex-col sm:flex-row gap-4 p-4">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-full sm:w-40 h-32 rounded-lg overflow-hidden bg-slate-700">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play
                      className="w-6 h-6 text-slate-900 ml-0.5"
                      fill="currentColor"
                    />
                  </div>
                </div>
                {/* Category badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded text-xs text-white font-medium">
                  {course.category}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-base mb-1 truncate">
                      {course.title}
                    </h4>
                    <p className="text-sm text-slate-400 mb-2">
                      by {course.instructor}
                    </p>
                  </div>
                  <button className="text-slate-400 hover:text-white transition-colors p-1">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Last: {course.lastAccessed}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-400">Progress</span>
                    <span className="text-xs font-semibold text-green-400">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${course.color} rounded-full transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Next Lesson & CTA */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-0.5">Up Next:</p>
                    <p className="text-sm text-slate-300 truncate">
                      {course.nextLesson}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 flex-shrink-0">
                    <Play className="w-4 h-4" />
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400 text-sm mb-2">No active courses</p>
          <p className="text-slate-500 text-xs mb-4">
            Start learning by enrolling in a course
          </p>
          <button className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-colors">
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default ActiveCourses;
