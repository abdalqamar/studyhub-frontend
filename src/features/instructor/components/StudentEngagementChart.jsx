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

const StudentEngagementChart = () => {
  const data = {
    labels: ["React", "Node.js", "JavaScript", "UI/UX", "Python"],
    datasets: [
      {
        label: "Avg. Watch Time (hours)",
        data: [12.5, 8.7, 15.2, 6.8, 9.3],
        backgroundColor: "rgba(212,165,55,0.8)",
        borderColor: "#d4a537",
        borderWidth: 1,
        borderRadius: 3,
      },
      {
        label: "Completion %",
        data: [85, 72, 90, 65, 78],
        backgroundColor: "rgba(45,212,191,0.8)",
        borderColor: "#2dd4bf",
        borderWidth: 1,
        borderRadius: 3,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#9aa1b8" },
      },
      title: {
        display: true,
        text: "Student Engagement by Course",
        color: "#edeff5",
        font: { size: 16 },
      },
      tooltip: {
        backgroundColor: "rgba(18,23,42,0.95)",
        titleColor: "#edeff5",
        bodyColor: "#9aa1b8",
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.07)" },
        ticks: { color: "#5c6480" },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        grid: { color: "rgba(255,255,255,0.07)" },
        ticks: { color: "#5c6480", callback: (value) => value + "h" },
        beginAtZero: true,
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: false },
        ticks: { color: "#5c6480", callback: (value) => value + "%" },
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-surface rounded-[14px] p-5 border border-border">
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default StudentEngagementChart;
