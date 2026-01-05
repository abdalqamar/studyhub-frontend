import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CoursePerformanceChart = () => {
  const data = {
    labels: [
      "React Mastery",
      "Node.js Advanced",
      "JavaScript Fundamentals",
      "Python for Data",
      "UX Design",
    ],
    datasets: [
      {
        data: [25, 20, 18, 22, 15],
        backgroundColor: [
          "rgb(79, 70, 229)", // indigo-600
          "rgb(14, 165, 233)", // sky-500
          "rgb(34, 197, 94)", // green-500
          "rgb(245, 158, 11)", // amber-500
          "rgb(239, 68, 68)", // red-500
        ],
        borderWidth: 2,
        borderColor: "rgb(30, 41, 59)", // slate-900
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "rgb(203, 213, 225)", // slate-300
          font: {
            size: 12,
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Course Revenue Distribution",
        color: "rgb(248, 250, 252)", // slate-50
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        backgroundColor: "rgb(15, 23, 42)", // slate-900
        titleColor: "rgb(248, 250, 252)", // slate-50
        bodyColor: "rgb(203, 213, 225)", // slate-300
        borderColor: "rgb(51, 65, 85)", // slate-700
        borderWidth: 1,
        cornerRadius: 6,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            return `${label}: ${value}%`;
          },
        },
      },
    },
    cutout: "60%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Course Performance</h3>
        <span className="text-sm text-slate-400">Revenue Share</span>
      </div>
      <div className="h-80">
        <Doughnut data={data} options={options} />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="text-center p-3 bg-slate-700 rounded-lg">
          <div className="text-blue-400 font-bold text-lg">25%</div>
          <div className="text-slate-400 text-xs">React Mastery</div>
        </div>
        <div className="text-center p-3 bg-slate-700 rounded-lg">
          <div className="text-green-400 font-bold text-lg">20%</div>
          <div className="text-slate-400 text-xs">Node.js Advanced</div>
        </div>
      </div>
    </div>
  );
};

export default CoursePerformanceChart;
