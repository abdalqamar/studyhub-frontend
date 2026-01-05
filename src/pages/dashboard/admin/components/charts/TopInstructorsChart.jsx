// src/pages/AdminDashboard/components/charts/TopInstructorsChart.jsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopInstructorsChart = () => {
  const data = {
    labels: [
      "John Doe",
      "Sarah Wilson",
      "Mike Johnson",
      "Emily Davis",
      "Alex Brown",
    ],
    datasets: [
      {
        label: "Earnings ($)",
        data: [24500, 18700, 15600, 13200, 9800],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)", // green-500
          "rgba(59, 130, 246, 0.8)", // blue-500
          "rgba(168, 85, 247, 0.8)", // purple-500
          "rgba(245, 158, 11, 0.8)", // amber-500
          "rgba(239, 68, 68, 0.8)", // red-500
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(168, 85, 247)",
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 1,
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
        display: true,
        text: "Top Instructors by Earnings",
        color: "rgb(248, 250, 252)",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        backgroundColor: "rgb(15, 23, 42)",
        titleColor: "rgb(248, 250, 252)",
        bodyColor: "rgb(203, 213, 225)",
        callbacks: {
          label: function (context) {
            return `Earnings: $${context.parsed.x}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(71, 85, 105, 0.3)",
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          callback: function (value) {
            return "$" + value;
          },
        },
      },
      y: {
        grid: {
          color: "rgba(71, 85, 105, 0.3)",
        },
        ticks: {
          color: "rgb(148, 163, 184)",
        },
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>

      {/* Additional Instructor Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="text-center p-3 bg-slate-700 rounded-lg">
          <div className="text-green-400 font-bold text-lg">$24.5K</div>
          <div className="text-slate-400 text-xs">Top Earner</div>
        </div>
        <div className="text-center p-3 bg-slate-700 rounded-lg">
          <div className="text-blue-400 font-bold text-lg">5</div>
          <div className="text-slate-400 text-xs">Top Instructors</div>
        </div>
      </div>
    </div>
  );
};

export default TopInstructorsChart;
