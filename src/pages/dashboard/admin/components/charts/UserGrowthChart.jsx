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

const UserGrowthChart = ({ monthlyStudents, monthlyInstructors }) => {
  const labels = [
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
  ];

  // Validate data
  if (
    (!monthlyStudents || monthlyStudents.length === 0) &&
    (!monthlyInstructors || monthlyInstructors.length === 0)
  ) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">
          User Growth - Students vs Instructors
        </h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-slate-400">No user growth data available</p>
        </div>
      </div>
    );
  }

  // Process backend data for students
  const studentsByMonth = Array(12).fill(0);
  monthlyStudents?.forEach((item) => {
    if (item._id?.month >= 1 && item._id?.month <= 12) {
      studentsByMonth[item._id.month - 1] = item.count || 0;
    }
  });

  // Process backend data for instructors
  const instructorsByMonth = Array(12).fill(0);
  monthlyInstructors?.forEach((item) => {
    if (item._id?.month >= 1 && item._id?.month <= 12) {
      instructorsByMonth[item._id.month - 1] = item.count || 0;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Students",
        data: studentsByMonth,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: "Instructors",
        data: instructorsByMonth,
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
        borderRadius: 4,
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
          font: { size: 12 },
          padding: 15,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "User Growth - Students vs Instructors",
        color: "rgb(248, 250, 252)",
        font: { size: 18, weight: "bold" },
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "rgb(248, 250, 252)",
        bodyColor: "rgb(203, 213, 225)",
        borderColor: "rgba(71, 85, 105, 0.5)",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(71, 85, 105, 0.3)",
          drawOnChartArea: true,
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          font: { size: 11 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(71, 85, 105, 0.3)",
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          font: { size: 11 },
          precision: 0,
        },
      },
    },
  };

  // Calculate stats
  const totalStudents = studentsByMonth.reduce((a, b) => a + b, 0);
  const totalInstructors = instructorsByMonth.reduce((a, b) => a + b, 0);
  const monthsWithData = studentsByMonth.filter((val) => val > 0).length;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors duration-300">
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-3 bg-slate-700 rounded-lg">
          <p className="text-xs text-slate-400">Total Students</p>
          <p className="text-xl font-bold text-blue-400">{totalStudents}</p>
        </div>
        <div className="p-3 bg-slate-700 rounded-lg">
          <p className="text-xs text-slate-400">Total Instructors</p>
          <p className="text-xl font-bold text-green-400">{totalInstructors}</p>
        </div>
        <div className="p-3 bg-slate-700 rounded-lg">
          <p className="text-xs text-slate-400">Active Months</p>
          <p className="text-xl font-bold text-white">{monthsWithData}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserGrowthChart;
