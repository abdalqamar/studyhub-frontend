import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CourseProgressChart = () => {
  const data = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [5, 7, 3],
        backgroundColor: [
          "rgb(34, 197, 94)", // green-500
          "rgb(59, 130, 246)", // blue-500
          "rgb(148, 163, 184)", // slate-400
        ],
        borderWidth: 2,
        borderColor: "rgb(30, 41, 59)",
        // Add animation properties to dataset
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
        text: "Course Progress Overview",
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
    cutout: "70%",
    // Animation configuration
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
      animateScale: true,
      animateRotate: true,
    },
    // Hover configuration
    hover: {
      animationDuration: 400,
    },
    // Layout configuration
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
          // Add redraw prop to ensure animations trigger
          redraw={true}
        />
      </div>
    </div>
  );
};

export default CourseProgressChart;
