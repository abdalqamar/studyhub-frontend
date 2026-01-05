// src/pages/AdminDashboard/components/charts/CourseCategoriesChart.jsx
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CourseCategoriesChart = () => {
  const data = {
    labels: [
      "Web Development",
      "Data Science",
      "Mobile Development",
      "Design",
      "Business",
      "Marketing",
      "Photography",
      "Music",
    ],
    datasets: [
      {
        data: [35, 18, 12, 10, 8, 7, 5, 5],
        backgroundColor: [
          "rgb(59, 130, 246)", // blue-500 - Web Dev
          "rgb(34, 197, 94)", // green-500 - Data Science
          "rgb(168, 85, 247)", // purple-500 - Mobile Dev
          "rgb(245, 158, 11)", // amber-500 - Design
          "rgb(14, 165, 233)", // sky-500 - Business
          "rgb(239, 68, 68)", // red-500 - Marketing
          "rgb(236, 72, 153)", // pink-500 - Photography
          "rgb(20, 184, 166)", // teal-500 - Music
        ],
        borderWidth: 2,
        borderColor: "rgb(30, 41, 59)", // slate-900
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "rgb(203, 213, 225)",
          font: {
            size: 11,
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        text: "Course Categories Distribution",
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
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value}% (${percentage}% of total)`;
          },
        },
      },
    },
    cutout: "60%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  // Calculate total courses
  const totalCourses = data.datasets[0].data.reduce((a, b) => a + b, 0);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Course Categories</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-400">
            {totalCourses}%
          </div>
          <div className="text-slate-400 text-sm">Total Distribution</div>
        </div>
      </div>

      <div className="h-80">
        <Doughnut data={data} options={options} />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="text-center p-3 bg-slate-700 rounded-lg">
          <div className="text-blue-400 font-bold text-lg">35%</div>
          <div className="text-slate-400 text-xs">Web Development</div>
        </div>
        <div className="text-center p-3 bg-slate-700 rounded-lg">
          <div className="text-green-400 font-bold text-lg">18%</div>
          <div className="text-slate-400 text-xs">Data Science</div>
        </div>
      </div>
    </div>
  );
};

export default CourseCategoriesChart;
