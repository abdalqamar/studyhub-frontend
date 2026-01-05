const ActiveCourses = () => {
  const courses = [
    {
      id: 1,
      title: "React Masterclass 2024",
      instructor: "John Doe",
      progress: 70,
      thumbnail: "🎨",
      nextLesson: "State Management",
      duration: "12h 30m",
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      instructor: "Sarah Wilson",
      progress: 45,
      thumbnail: "⚙️",
      nextLesson: "API Authentication",
      duration: "18h 15m",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Mike Johnson",
      progress: 85,
      thumbnail: "🎯",
      nextLesson: "Prototyping",
      duration: "8h 45m",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Active Courses</h3>
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-slate-600 rounded-lg flex items-center justify-center text-2xl">
                {course.thumbnail}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white">{course.title}</h4>
                    <p className="text-slate-400 text-sm mt-1">
                      By {course.instructor}
                    </p>
                  </div>
                  <span className="text-slate-400 text-sm">
                    {course.duration}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Progress: {course.progress}%</span>
                    <span>Next: {course.nextLesson}</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1">
                    Continue Learning
                  </button>
                  <button className="border border-slate-500 hover:border-slate-400 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCourses;
