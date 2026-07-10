import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// theme palette only — gold, teal, blue, purple accent, danger
const PALETTE = ["#d4a537", "#2dd4bf", "#5b8def", "#8b7ae0", "#e2574c"];

const CoursePerformanceChart = () => {
  const data = {
    labels: [
      "React Mastery",
      "Node.js Advanced",
      "JavaScript Fundamentals",
      "Python for Data",
      "UX Design",
    ],
    datasets: [
      {
        data: [25, 20, 18, 22, 15],
        backgroundColor: PALETTE,
        borderWidth: 2,
        borderColor: "#12172a",
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
          color: "#9aa1b8",
          font: { size: 12 },
          padding: 15,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Course Revenue Distribution",
        color: "#edeff5",
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        backgroundColor: "rgba(18,23,42,0.95)",
        titleColor: "#edeff5",
        bodyColor: "#9aa1b8",
        borderColor: "rgba(255,255,255,0.12)",
        borderWidth: 1,
        cornerRadius: 6,
        callbacks: {
          label: (context) => `${context.label || ""}: ${context.parsed}%`,
        },
      },
    },
    cutout: "60%",
    animation: { animateScale: true, animateRotate: true },
  };

  return (
    <div className="bg-surface rounded-[14px] p-5 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-[15px] text-text-1">
          Course Performance
        </h3>
        <span className="text-[12.5px] text-text-3">Revenue Share</span>
      </div>
      <div className="h-80">
        <Doughnut data={data} options={options} />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="text-center p-3 bg-surface-2 rounded-[10px]">
          <div className="text-gold font-mono font-bold text-lg">25%</div>
          <div className="text-text-3 text-[11.5px]">React Mastery</div>
        </div>
        <div className="text-center p-3 bg-surface-2 rounded-[10px]">
          <div className="text-teal font-mono font-bold text-lg">20%</div>
          <div className="text-text-3 text-[11.5px]">Node.js Advanced</div>
        </div>
      </div>
    </div>
  );
};

export default CoursePerformanceChart;
