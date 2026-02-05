import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CheckCircle2, Clock, Circle } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

const CourseProgressChart = () => {
  const stats = {
    completed: 5,
    inProgress: 7,
    notStarted: 3,
    total: 15,
  };

  const data = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [stats.completed, stats.inProgress, stats.notStarted],
        backgroundColor: [
          "rgb(34, 197, 94)", // green-500
          "rgb(59, 130, 246)", // blue-500
          "rgb(100, 116, 139)", // slate-500
        ],
        borderWidth: 0,
        hoverOffset: 8,
        hoverBorderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Custom legend banayenge
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
        displayColors: true,
        callbacks: {
          label: function (context) {
            const percentage = ((context.parsed / stats.total) * 100).toFixed(
              1
            );
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "75%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  const legendItems = [
    {
      label: "Completed",
      value: stats.completed,
      color: "bg-green-500",
      icon: CheckCircle2,
      iconColor: "text-green-400",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      color: "bg-blue-500",
      icon: Clock,
      iconColor: "text-blue-400",
    },
    {
      label: "Not Started",
      value: stats.notStarted,
      color: "bg-slate-500",
      icon: Circle,
      iconColor: "text-slate-400",
    },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Course Progress Overview
        </h3>
        <p className="text-sm text-slate-400 mt-0.5">
          {stats.total} total courses
        </p>
      </div>

      {/* Chart */}

      <div className="relative h-64 mb-6">
        <Doughnut data={data} options={options} />

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-4xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-slate-400 mt-1">Total Courses</p>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="mt-4 space-y-2">
        {legendItems.map((item, index) => {
          const Icon = item.icon;
          const percentage = ((item.value / stats.total) * 100).toFixed(0);
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                <Icon className={`w-4 h-4 ${item.iconColor}`} />
                <span className="text-sm text-slate-300 font-medium">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">{percentage}%</span>
                <span className="text-base font-semibold text-white min-w-[2ch] text-right">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseProgressChart;
