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
        borderColor: "#2dd4bf",
        backgroundColor: "rgba(45,212,191,0.10)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Total Revenue",
        data: [
          1200, 1800, 1500, 2200, 2800, 3200, 3800, 4200, 3900, 4500, 4800,
          5200,
        ],
        borderColor: "#d4a537",
        backgroundColor: "rgba(212,165,55,0.10)",
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
        labels: { color: "#9aa1b8", font: { size: 12 } },
      },
      title: {
        display: true,
        text: "Revenue Breakdown",
        color: "#edeff5",
        font: { size: 18, weight: "bold" },
      },
      tooltip: {
        backgroundColor: "rgba(18,23,42,0.95)",
        titleColor: "#edeff5",
        bodyColor: "#9aa1b8",
        borderColor: "rgba(255,255,255,0.12)",
        borderWidth: 1,
        cornerRadius: 6,
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.07)" },
        ticks: { color: "#5c6480" },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.07)" },
        ticks: { color: "#5c6480", callback: (value) => "$" + value },
        beginAtZero: true,
      },
    },
    interaction: { intersect: false, mode: "index" },
  };

  return (
    <div className="bg-surface rounded-[14px] p-5 border border-border">
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EarningsChart;
