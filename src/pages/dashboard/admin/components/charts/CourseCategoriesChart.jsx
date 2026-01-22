import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CourseCategoriesChart = ({ courseCategories }) => {
  if (!courseCategories || courseCategories.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">
          Course Categories Distribution
        </h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-slate-400">No category data available</p>
        </div>
      </div>
    );
  }

  // Sort by count (highest to lowest)
  const sortedCategories = [...courseCategories].sort(
    (a, b) => b.count - a.count
  );

  const labels = sortedCategories.map((c) => c._id);
  const values = sortedCategories.map((c) => c.count);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "rgb(59, 130, 246)",
          "rgb(34, 197, 94)",
          "rgb(168, 85, 247)",
          "rgb(245, 158, 11)",
          "rgb(14, 165, 233)",
          "rgb(239, 68, 68)",
          "rgb(236, 72, 153)",
          "rgb(20, 184, 166)",
        ],
        borderWidth: 2,
        borderColor: "rgb(30, 41, 59)",
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
          font: { size: 12 },
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "rgb(248, 250, 252)",
        bodyColor: "rgb(203, 213, 225)",
        borderColor: "rgba(71, 85, 105, 0.5)",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} courses (${percentage}%)`;
          },
        },
      },
    },
    cutout: "65%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  const totalCourses = values.reduce((a, b) => a + b, 0);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">
          Course Categories Distribution
        </h3>
        <div className="text-right">
          <p className="text-xs text-slate-400">Total Courses</p>
          <div className="text-2xl font-bold text-blue-400">{totalCourses}</div>
        </div>
      </div>

      <div className="h-80">
        <Doughnut data={data} options={options} />
      </div>

      {/* All Categories List (Sorted) */}
      {sortedCategories.length > 0 && (
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          {sortedCategories.map((c, i) => {
            const percentage = ((c.count / totalCourses) * 100).toFixed(1);
            const bgColor = data.datasets[0].backgroundColor[i % 8];

            return (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: bgColor }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-200 text-sm font-medium truncate">
                      {c._id}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-blue-400 font-bold text-lg">
                    {c.count}
                  </div>
                  <div className="text-slate-400 text-xs w-12 text-right">
                    {percentage}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseCategoriesChart;
