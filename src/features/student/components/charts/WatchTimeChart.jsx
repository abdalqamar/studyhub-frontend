import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const WatchTimeChart = () => {
  const courses = [
    { name: "React", hours: 45, color: "rgb(212, 165, 55)" },
    { name: "Node.js", hours: 32, color: "rgb(34, 197, 94)" },
    { name: "JavaScript", hours: 28, color: "rgb(245, 158, 11)" },
    { name: "UI/UX", hours: 18, color: "rgb(139, 92, 246)" },
    { name: "Python", hours: 12, color: "rgb(239, 68, 68)" },
  ];

  const totalHours = courses.reduce((sum, course) => sum + course.hours, 0);

  const data = {
    labels: courses.map((c) => c.name),
    datasets: [
      {
        data: courses.map((c) => c.hours),
        backgroundColor: courses.map((c) => c.color),
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
        display: false,
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
            const percentage = ((context.parsed / totalHours) * 100).toFixed(1);
            return `${context.parsed}h (${percentage}%)`;
          },
        },
      },
    },
    cutout: "70%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="bg-surface-2/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-border-strong transition-colors">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Watch Time Distribution
        </h3>
        <p className="text-sm text-text-2 mt-0.5">By course category</p>
      </div>

      {/* Chart with center text */}
      <div className="relative h-56 mb-6">
        <Doughnut data={data} options={options} />

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-3xl font-bold text-white">{totalHours}h</p>
          <p className="text-xs text-text-2 mt-1">Total Time</p>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="space-y-2">
        {courses.map((course, index) => {
          const percentage = ((course.hours / totalHours) * 100).toFixed(0);
          return (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 bg-surface/30 rounded-lg hover:bg-surface/50 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: course.color }}
                ></div>
                <span className="text-sm text-text-2 font-medium">
                  {course.name}
                </span>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3 flex-1 justify-end">
                <div className="w-24 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 group-hover:opacity-90"
                    style={{
                      backgroundColor: course.color,
                      width: `${percentage}%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-text-2 min-w-[3ch] text-right">
                  {percentage}%
                </span>
                <span className="text-sm font-semibold text-white min-w-[3ch] text-right">
                  {course.hours}h
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WatchTimeChart;
