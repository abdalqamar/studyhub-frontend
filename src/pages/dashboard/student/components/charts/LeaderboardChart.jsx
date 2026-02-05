import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Trophy, Medal, Award } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LeaderboardChart = () => {
  const students = [
    { name: "Abdal", points: 980, rank: 1, badge: Trophy, color: "#FFD700" },
    { name: "Aditi", points: 910, rank: 2, badge: Medal, color: "#C0C0C0" },
    { name: "Rahul", points: 850, rank: 3, badge: Medal, color: "#CD7F32" },
    { name: "Simran", points: 790, rank: 4, badge: Award, color: "#38bdf8" },
    { name: "Vikas", points: 760, rank: 5, badge: Award, color: "#22c55e" },
  ];

  const data = {
    labels: students.map((s) => s.name),
    datasets: [
      {
        label: "Points",
        data: students.map((s) => s.points),
        backgroundColor: students.map((s) => s.color + "40"), // 25% opacity
        borderColor: students.map((s) => s.color),
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgb(15, 23, 42)",
        titleColor: "rgb(248, 250, 252)",
        bodyColor: "rgb(203, 213, 225)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `${context.parsed.x} points`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgb(148, 163, 184)",
          font: { size: 11 },
        },
        grid: {
          color: "rgba(71, 85, 105, 0.2)",
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "rgb(203, 213, 225)",
          font: { size: 13, weight: "500" },
        },
        grid: { display: false },
        border: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Top Performers
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">
            This week's leaderboard
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Your rank</p>
          <p className="text-2xl font-bold text-yellow-400">#12</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-4">
        <Bar data={data} options={options} />
      </div>

      {/* Detailed List */}
      <div className="space-y-2 pt-4 border-t border-slate-700">
        {students.map((student, index) => {
          const Icon = student.badge;
          const isTop3 = index < 3;
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                isTop3
                  ? "bg-slate-900/50 hover:bg-slate-900"
                  : "bg-slate-900/30 hover:bg-slate-900/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isTop3 ? "bg-slate-700" : "bg-slate-800"
                  }`}
                >
                  <span className="text-sm font-bold text-slate-300">
                    #{student.rank}
                  </span>
                </div>
                <Icon className="w-4 h-4" style={{ color: student.color }} />
                <span className="text-sm font-medium text-slate-200">
                  {student.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-white">
                    {student.points}
                  </p>
                  <p className="text-xs text-slate-500">points</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardChart;
