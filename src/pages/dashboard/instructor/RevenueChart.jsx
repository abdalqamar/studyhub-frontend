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

const RevenueChart = () => {
  const data = {
    labels: [
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Course Visit",
        data: [12, 15, 18, 22, 25, 28, 32, 35, 38, 40, 42],
        borderColor: "rgb(34, 197, 94)", // Green-500
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Course Sale",
        data: [8, 10, 12, 15, 18, 22, 25, 28, 30, 32, 35],
        borderColor: "rgb(59, 130, 246)", // Blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgb(203, 213, 225)", // slate-300
          font: {
            size: 12,
          },
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Revenue",
        color: "rgb(248, 250, 252)", // slate-50
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        backgroundColor: "rgb(30, 41, 59)", // slate-800
        titleColor: "rgb(248, 250, 252)", // slate-50
        bodyColor: "rgb(203, 213, 225)", // slate-300
        borderColor: "rgb(71, 85, 105)", // slate-600
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + "k";
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(71, 85, 105, 0.3)", // slate-600 with opacity
        },
        ticks: {
          color: "rgb(148, 163, 184)", // slate-400
        },
      },
      y: {
        grid: {
          color: "rgba(71, 85, 105, 0.3)", // slate-600 with opacity
        },
        ticks: {
          color: "rgb(148, 163, 184)", // slate-400
          callback: function (value) {
            return value + "k";
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-100">Revenue</h3>
          <div className="flex items-center mt-1">
            <span className="text-green-400 text-sm font-medium">+0.3%</span>
            <span className="text-slate-400 text-sm ml-2">This Month</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="text-slate-100 font-bold">20m</div>
            <div className="text-slate-400 text-xs">Course Visit</div>
          </div>
          <div className="text-center">
            <div className="text-slate-100 font-bold">15m</div>
            <div className="text-slate-400 text-xs">Course Sale</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <Line data={data} options={options} />
      </div>

      {/* Months Navigation */}
      <div className="flex justify-between mt-4 px-2">
        {data.labels.map((month, index) => (
          <button
            key={index}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors px-1 py-1"
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
