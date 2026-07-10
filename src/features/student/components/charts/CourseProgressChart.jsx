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
          "rgb(212, 165, 55)", // blue-500
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
        backgroundColor: "rgb(18, 23, 42)",
        titleColor: "rgb(237, 239, 245)",
        bodyColor: "rgb(154, 161, 184)",
        borderColor: "rgb(212, 165, 55)",
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
      color: "bg-gold",
      icon: Clock,
      iconColor: "text-gold",
    },
    {
      label: "Not Started",
      value: stats.notStarted,
      color: "bg-surface-2",
      icon: Circle,
      iconColor: "text-text-2",
    },
  ];

  return (
    <div className="bg-surface-2/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-border-strong transition-colors h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Course Progress Overview
        </h3>
        <p className="text-sm text-text-2 mt-0.5">
          {stats.total} total courses
        </p>
      </div>

      {/* Chart */}

      <div className="relative h-64 mb-6">
        <Doughnut data={data} options={options} />

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-4xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-text-2 mt-1">Total Courses</p>
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
              className="flex items-center justify-between p-3 bg-surface/50 rounded-lg hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                <Icon className={`w-4 h-4 ${item.iconColor}`} />
                <span className="text-sm text-text-2 font-medium">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-2">{percentage}%</span>
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
