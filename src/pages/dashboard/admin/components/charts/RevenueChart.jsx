// src/pages/AdminDashboard/components/charts/RevenueChart.jsx
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
        label: "Monthly Revenue",
        data: [
          18500, 22000, 19800, 24500, 31200, 28400, 35600, 41200, 38500, 45200,
          48800, 52400,
        ],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Revenue Trend",
        color: "rgb(248, 250, 252)",
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(71, 85, 105, 0.3)" },
        ticks: { color: "rgb(148, 163, 184)" },
      },
      y: {
        grid: { color: "rgba(71, 85, 105, 0.3)" },
        ticks: {
          color: "rgb(148, 163, 184)",
          callback: (value) => "$" + value / 1000 + "k",
        },
      },
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

export default RevenueChart;
