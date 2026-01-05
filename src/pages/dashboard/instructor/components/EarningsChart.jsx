// src/pages/InstructorDashboard/components/EarningsChartDetailed.jsx
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

const EarningsChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Course Sales",
        data: [
          800, 1200, 900, 1500, 1800, 2200, 2500, 2800, 2400, 3000, 3200, 3500,
        ],
        borderColor: "rgb(34, 197, 94)", // green-500
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Total Revenue",
        data: [
          1200, 1800, 1500, 2200, 2800, 3200, 3800, 4200, 3900, 4500, 4800,
          5200,
        ],
        borderColor: "rgb(59, 130, 246)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        borderDash: [5, 5],
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
          color: "rgb(203, 213, 225)",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Revenue Breakdown",
        color: "rgb(248, 250, 252)",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        backgroundColor: "rgb(15, 23, 42)",
        titleColor: "rgb(248, 250, 252)",
        bodyColor: "rgb(203, 213, 225)",
        borderColor: "rgb(51, 65, 85)",
        borderWidth: 1,
        cornerRadius: 6,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: $${context.parsed.y}`;
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
        },
      },
      y: {
        grid: {
          color: "rgba(71, 85, 105, 0.3)",
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          callback: function (value) {
            return "$" + value;
          },
        },
        beginAtZero: true,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EarningsChart;
