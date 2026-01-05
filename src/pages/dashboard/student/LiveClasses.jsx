import { useState } from "react";

const LiveClasses = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const liveClasses = [
    {
      id: 1,
      title: "Advanced React Hooks",
      course: "React Masterclass 2024",
      instructor: "John Doe",
      date: "2024-01-15",
      time: "14:00 - 15:30",
      duration: "1h 30m",
      status: "upcoming",
      joinLink: "#",
      participants: 45,
      description:
        "Deep dive into advanced React hooks and custom hook patterns",
    },
    {
      id: 2,
      title: "API Security Best Practices",
      course: "Node.js Backend Development",
      instructor: "Sarah Wilson",
      date: "2024-01-16",
      time: "11:00 - 12:00",
      duration: "1h",
      status: "upcoming",
      joinLink: "#",
      participants: 32,
      description:
        "Learn how to secure your APIs against common vulnerabilities",
    },
    {
      id: 3,
      title: "Design System Workshop",
      course: "UI/UX Design Principles",
      instructor: "Mike Johnson",
      date: "2024-01-12",
      time: "16:00 - 17:30",
      duration: "1h 30m",
      status: "completed",
      joinLink: "#",
      recording: "#",
      participants: 28,
      description: "Hands-on workshop on building scalable design systems",
    },
    {
      id: 4,
      title: "JavaScript Performance Optimization",
      course: "Advanced JavaScript Patterns",
      instructor: "Alex Brown",
      date: "2024-01-18",
      time: "15:00 - 16:30",
      duration: "1h 30m",
      status: "upcoming",
      joinLink: "#",
      participants: 38,
      description:
        "Techniques for optimizing JavaScript performance in modern apps",
    },
    {
      id: 5,
      title: "Data Visualization Masterclass",
      course: "Python for Data Analysis",
      instructor: "Maria Garcia",
      date: "2024-01-10",
      time: "13:00 - 14:30",
      duration: "1h 30m",
      status: "completed",
      joinLink: "#",
      recording: "#",
      participants: 41,
      description: "Create stunning visualizations with Python and Matplotlib",
    },
  ];

  const filteredClasses = liveClasses.filter((classItem) =>
    activeTab === "all" ? true : classItem.status === activeTab
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isUpcoming = (dateString) => {
    const classDate = new Date(dateString);
    const now = new Date();
    return classDate > now;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Live Classes</h1>
        <p className="text-slate-400 mt-2">
          Join scheduled sessions and access recordings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {liveClasses.filter((c) => c.status === "upcoming").length}
          </div>
          <div className="text-slate-400 text-sm">Upcoming</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {liveClasses.filter((c) => c.status === "completed").length}
          </div>
          <div className="text-slate-400 text-sm">Completed</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {liveClasses.reduce((acc, curr) => acc + curr.participants, 0)}
          </div>
          <div className="text-slate-400 text-sm">Total Participants</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 rounded-xl p-4 mb-6">
        <div className="flex space-x-2">
          {["upcoming", "completed", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Live Classes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-white text-lg mb-2">
                  {classItem.title}
                </h3>
                <p className="text-slate-400 text-sm mb-1">
                  {classItem.course}
                </p>
                <p className="text-slate-500 text-sm">
                  {classItem.description}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  classItem.status === "upcoming"
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {classItem.status === "upcoming" ? "Upcoming" : "Completed"}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Instructor:</span>
                <span className="text-slate-200">{classItem.instructor}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Date & Time:</span>
                <span className="text-slate-200">
                  {formatDate(classItem.date)} • {classItem.time}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Duration:</span>
                <span className="text-slate-200">{classItem.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Participants:</span>
                <span className="text-slate-200">
                  {classItem.participants} students
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              {classItem.status === "upcoming" &&
                isUpcoming(classItem.date) && (
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1">
                    Join Class
                  </button>
                )}
              {classItem.status === "completed" && classItem.recording && (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1">
                  Watch Recording
                </button>
              )}
              <button className="border border-slate-600 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Add to Calendar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🎥</div>
          <h3 className="text-lg font-medium text-white mb-2">
            No live classes found
          </h3>
          <p className="text-slate-400">
            There are no live classes scheduled in this category
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveClasses;
