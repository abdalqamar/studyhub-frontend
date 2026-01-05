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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LeaderboardChart = () => {
  const labels = ["Abdal", "Aditi", "Rahul", "Simran", "Vikas"];

  const data = {
    labels,
    datasets: [
      {
        label: "Points",
        data: [980, 910, 850, 790, 760],
        backgroundColor: [
          "#FFD700", // gold
          "#C0C0C0", // silver
          "#CD7F32", // bronze
          "#38bdf8", // blue
          "#22c55e", // green
        ],
        borderRadius: 10,
        barThickness: 20, // Reduced bar thickness
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
        text: "🏆 Leaderboard — Top Students",
        color: "#60a5fa",
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f8fafc",
        bodyColor: "#f1f5f9",
        borderColor: "#334155",
        borderWidth: 1,
        cornerRadius: 10,
      },
    },
    scales: {
      x: {
        ticks: { color: "#cbd5e1" },
        grid: { color: "#334155" },
      },
      y: {
        ticks: { color: "#cbd5e1" },
        grid: { display: false },
      },
    },
    animation: {
      duration: 1200,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="h-64">
        {" "}
        {/* Reduced height */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default LeaderboardChart;
