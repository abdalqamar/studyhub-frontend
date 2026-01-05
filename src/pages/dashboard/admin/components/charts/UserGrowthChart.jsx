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

const UserGrowthChart = () => {
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
        label: "Students",
        data: [245, 312, 456, 523, 678, 845, 923, 1124, 1345, 1567, 1789, 2012],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
      {
        label: "Instructors",
        data: [12, 18, 23, 28, 34, 42, 51, 67, 78, 89, 102, 124],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "rgb(203, 213, 225)" },
      },
      title: {
        display: true,
        text: "User Growth - Students vs Instructors",
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
        ticks: { color: "rgb(148, 163, 184)" },
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserGrowthChart;
