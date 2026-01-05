// src/pages/AdminDashboard/components/charts/EnrollmentsChart.jsx
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EnrollmentsChart = () => {
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
        label: "New Enrollments",
        data: [245, 312, 456, 523, 678, 845, 923, 1124, 1345, 1567, 1789, 2012],
        borderColor: "rgb(168, 85, 247)", // purple-500
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Cumulative Enrollments",
        data: [
          245, 557, 1013, 1536, 2214, 3059, 3982, 5106, 6451, 8018, 9807, 11819,
        ],
        borderColor: "rgb(14, 165, 233)", // sky-500
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        tension: 0.4,
        fill: true,
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
        },
      },
      title: {
        display: true,
        text: "Student Enrollment Growth",
        color: "rgb(248, 250, 252)",
        font: {
          size: 16,
          weight: "bold",
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

export default EnrollmentsChart;
