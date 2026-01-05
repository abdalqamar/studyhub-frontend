import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const WatchTimeChart = () => {
  const data = {
    labels: ["React", "Node.js", "JavaScript", "UI/UX", "Python"],
    datasets: [
      {
        data: [45, 32, 28, 18, 12],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(34, 197, 94)",
          "rgb(245, 158, 11)",
          "rgb(139, 92, 246)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 2,
        // Add animation properties to dataset (same as CourseProgressChart)
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 2000,
          easing: "easeOutQuart",
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgb(203, 213, 225)",
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Watch Time Distribution",
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
        borderColor: "rgb(51, 65, 85)",
        borderWidth: 1,
      },
    },
    cutout: "60%",
    // Animation configuration (same as CourseProgressChart)
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
      animateScale: true,
      animateRotate: true,
    },
    // Hover configuration (same as CourseProgressChart)
    hover: {
      animationDuration: 400,
    },
    // Layout configuration (same as CourseProgressChart)
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="h-80">
        <Doughnut
          data={data}
          options={options}
          // Add redraw prop to ensure animations trigger (same as CourseProgressChart)
          redraw={true}
        />
      </div>
    </div>
  );
};

export default WatchTimeChart;
