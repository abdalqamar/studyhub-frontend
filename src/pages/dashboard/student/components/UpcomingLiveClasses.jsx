const UpcomingLiveClasses = () => {
  const liveClasses = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:00 - 15:30",
      course: "React Masterclass",
      instructor: "John Doe",
      joinLink: "#",
    },
    {
      id: 2,
      date: "2024-01-16",
      time: "11:00 - 12:00",
      course: "Node.js Backend",
      instructor: "Sarah Wilson",
      joinLink: "#",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Upcoming Live Classes</h3>
        <a
          href="/live-classes"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          View All →
        </a>
      </div>

      <div className="space-y-4">
        {liveClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  <div className="bg-red-500 text-white rounded-lg px-2 py-1">
                    <div className="text-xs font-bold">LIVE</div>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {formatDate(classItem.date)}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white text-sm">
                    {classItem.course}
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    {classItem.time}
                  </p>
                </div>
              </div>

              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingLiveClasses;
