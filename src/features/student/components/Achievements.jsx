import {
  Trophy,
  Award,
  Star,
  Flame,
  Target,
  Zap,
  Crown,
  Medal,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "Fast Learner",
      description: "Complete 5 courses in a month",
      icon: Zap,
      progress: 80,
      current: 4,
      target: 5,
      earned: false,
      color: "bg-yellow-500",
      iconColor: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
    },
    {
      id: 2,
      title: "Study Streak",
      description: "Study for 7 consecutive days",
      icon: Flame,
      progress: 100,
      current: 7,
      target: 7,
      earned: true,
      earnedDate: "2 days ago",
      color: "bg-orange-500",
      iconColor: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Score 100% in 3 quizzes",
      icon: Target,
      progress: 66,
      current: 2,
      target: 3,
      earned: false,
      color: "bg-gold",
      iconColor: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/30",
    },
    {
      id: 4,
      title: "Top Performer",
      description: "Reach top 10 in leaderboard",
      icon: Crown,
      progress: 100,
      current: 10,
      target: 10,
      earned: true,
      earnedDate: "1 week ago",
      color: "bg-purple-500",
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      id: 5,
      title: "Video Enthusiast",
      description: "Watch 100 hours of content",
      icon: BookOpen,
      progress: 85,
      current: 85,
      target: 100,
      earned: false,
      color: "bg-green-500",
      iconColor: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      id: 6,
      title: "Certificate Collector",
      description: "Earn 5 certificates",
      icon: Award,
      progress: 100,
      current: 5,
      target: 5,
      earned: true,
      earnedDate: "3 weeks ago",
      color: "bg-gold",
      iconColor: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/30",
    },
  ];

  const earnedCount = achievements.filter((a) => a.earned).length;
  const totalCount = achievements.length;

  return (
    <div className="bg-surface-2/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-border-strong transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Achievements
          </h3>
          <p className="text-sm text-text-2 mt-0.5">
            {earnedCount} of {totalCount} unlocked
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold text-yellow-400">
            {earnedCount * 50} XP
          </span>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`relative ${achievement.bgColor} ${achievement.borderColor} border rounded-xl p-4 hover:bg-surface-2/80 transition-all duration-200 group cursor-pointer ${
                achievement.earned ? "ring-1 ring-yellow-500/20" : ""
              }`}
            >
              {/* Earned Badge */}
              {achievement.earned && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50 animate-pulse">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 ${
                  achievement.earned ? achievement.color : "bg-surface-2"
                } rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 ${
                  achievement.earned ? "shadow-lg" : ""
                }`}
                style={
                  achievement.earned
                    ? {
                        boxShadow: `0 0 20px ${achievement.color.replace(
                          "bg-",
                          "rgba("
                        )}0.3)`,
                      }
                    : {}
                }
              >
                <Icon
                  className={`w-7 h-7 ${
                    achievement.earned ? "text-white" : "text-text-3"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="mb-3">
                <h4
                  className={`font-semibold text-sm mb-1 ${
                    achievement.earned ? "text-white" : "text-text-2"
                  }`}
                >
                  {achievement.title}
                </h4>
                <p className="text-xs text-text-2 mb-2">
                  {achievement.description}
                </p>

                {/* Earned date or Progress */}
                {achievement.earned ? (
                  <div className="flex items-center gap-1 text-xs text-yellow-400">
                    <Medal className="w-3 h-3" />
                    <span>Earned {achievement.earnedDate}</span>
                  </div>
                ) : (
                  <div className="text-xs text-text-2">
                    {achievement.current}/{achievement.target}
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {!achievement.earned && (
                <div>
                  <div className="w-full h-1.5 bg-surface-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${achievement.color} rounded-full transition-all duration-500`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-text-3">
                      {achievement.progress}%
                    </span>
                    <span
                      className={`text-xs font-medium ${achievement.iconColor}`}
                    >
                      {Math.round(
                        (achievement.target - achievement.current) * 10
                      ) / 10}{" "}
                      more to go
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="mt-6 text-center">
        <button className="px-6 py-2.5 bg-surface-2 hover:bg-surface-2 text-white rounded-lg font-medium text-sm transition-colors">
          View All Achievements
        </button>
      </div>
    </div>
  );
};

export default Achievements;
