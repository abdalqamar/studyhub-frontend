const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "React Fundamentals",
      type: "certificate",
      date: "2024-01-10",
      icon: "📜",
      downloadLink: "#",
    },
    {
      id: 2,
      title: "Perfect Attendance",
      type: "badge",
      date: "2024-01-08",
      icon: "🏅",
      downloadLink: null,
    },
    {
      id: 3,
      title: "Fast Learner",
      type: "badge",
      date: "2024-01-05",
      icon: "⚡",
      downloadLink: null,
    },
    {
      id: 4,
      title: "JavaScript Master",
      type: "certificate",
      date: "2023-12-20",
      icon: "📜",
      downloadLink: "#",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6">Achievements</h3>

      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="bg-slate-700 rounded-lg p-4 text-center hover:bg-slate-600 transition-colors"
          >
            <div className="text-3xl mb-2">{achievement.icon}</div>
            <h4 className="font-semibold text-white text-sm mb-1">
              {achievement.title}
            </h4>
            <p className="text-slate-400 text-xs mb-3">
              {new Date(achievement.date).toLocaleDateString()}
            </p>
            {achievement.downloadLink && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors">
                Download
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-center text-blue-400 hover:text-blue-300 text-sm font-medium">
        View All Achievements →
      </button>
    </div>
  );
};

export default Achievements;
