import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StudyProgressChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Study Hours",
        data: [2, 3, 4, 2.5, 5, 1, 3.5],
        borderColor: "rgb(96, 165, 250)",
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "rgb(96, 165, 250)",
        pointBorderColor: "rgb(30, 58, 138)",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "rgb(147, 197, 253)",
        pointHoverBorderColor: "rgb(59, 130, 246)",
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
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
            return `${context.parsed.y}h studied`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(71, 85, 105, 0.2)",
          drawBorder: false,
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(71, 85, 105, 0.2)",
          drawBorder: false,
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          font: {
            size: 12,
          },
          callback: function (value) {
            return value + "h";
          },
          stepSize: 1,
        },
        beginAtZero: true,
        max: 6,
      },
    },
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors h-full flex flex-col">
      {/* Custom Title */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Weekly Study Progress
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">Last 7 days activity</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-400">21h</p>
          <p className="text-xs text-green-400">+3h from last week</p>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default StudyProgressChart;
