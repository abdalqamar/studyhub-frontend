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
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
      {
        label: "Completion %",
        data: [85, 72, 90, 65, 78],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 1,
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
        labels: {
          color: "rgb(203, 213, 225)",
        },
      },
      title: {
        display: true,
        text: "Student Engagement by Course",
        color: "rgb(248, 250, 252)",
        font: {
          size: 16,
        },
      },
      tooltip: {
        backgroundColor: "rgb(15, 23, 42)",
        titleColor: "rgb(248, 250, 252)",
        bodyColor: "rgb(203, 213, 225)",
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
        type: "linear",
        display: true,
        position: "left",
        grid: {
          color: "rgba(71, 85, 105, 0.3)",
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          callback: function (value) {
            return value + "h";
          },
        },
        beginAtZero: true,
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          callback: function (value) {
            return value + "%";
          },
        },
        beginAtZero: true,
        max: 100,
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

export default StudentEngagementChart;
