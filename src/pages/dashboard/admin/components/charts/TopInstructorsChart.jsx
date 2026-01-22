// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const TopInstructorsChart = ({ data }) => {
//   const labels = data?.map((i) => i.name) || [];
//   const earnings = data?.map((i) => i.earnings) || [];

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: "Earnings ($)",
//         data: earnings,
//         backgroundColor: [
//           "rgba(34, 197, 94, 0.8)",
//           "rgba(59, 130, 246, 0.8)",
//           "rgba(168, 85, 247, 0.8)",
//           "rgba(245, 158, 11, 0.8)",
//           "rgba(239, 68, 68, 0.8)",
//         ],
//         borderColor: [
//           "rgb(34, 197, 94)",
//           "rgb(59, 130, 246)",
//           "rgb(168, 85, 247)",
//           "rgb(245, 158, 11)",
//           "rgb(239, 68, 68)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // ⬇️ OPTIONS = SAME AS YOUR DESIGN (UNCHANGED)
//   const options = {
//     indexAxis: "y",
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: true,
//         text: "Top Instructors by Earnings",
//         color: "rgb(248, 250, 252)",
//         font: {
//           size: 16,
//           weight: "bold",
//         },
//       },
//       tooltip: {
//         backgroundColor: "rgb(15, 23, 42)",
//         titleColor: "rgb(248, 250, 252)",
//         bodyColor: "rgb(203, 213, 225)",
//         callbacks: {
//           label: function (context) {
//             return `Earnings: $${context.parsed.x}`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: "rgba(71, 85, 105, 0.3)",
//         },
//         ticks: {
//           color: "rgb(148, 163, 184)",
//           callback: function (value) {
//             return "$" + value;
//           },
//         },
//       },
//       y: {
//         grid: {
//           color: "rgba(71, 85, 105, 0.3)",
//         },
//         ticks: {
//           color: "rgb(148, 163, 184)",
//         },
//       },
//     },
//   };

//   // ✅ small derived stats (logic only)
//   const topEarning = earnings[0] || 0;
//   const totalInstructors = earnings.length;

//   return (
//     <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//       <div className="h-80">
//         <Bar data={chartData} options={options} />
//       </div>

//       {/* Additional Instructor Stats (DESIGN SAME) */}
//       <div className="grid grid-cols-2 gap-3 mt-4">
//         <div className="text-center p-3 bg-slate-700 rounded-lg">
//           <div className="text-green-400 font-bold text-lg">₹{topEarning}</div>
//           <div className="text-slate-400 text-xs">Top Earner</div>
//         </div>
//         <div className="text-center p-3 bg-slate-700 rounded-lg">
//           <div className="text-blue-400 font-bold text-lg">
//             {totalInstructors}
//           </div>
//           <div className="text-slate-400 text-xs">Top Instructors</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopInstructorsChart;

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

const TopInstructorsChart = ({ data }) => {
  // Validate and handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">
          Top Instructors by Earnings
        </h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-slate-400">No instructor data available</p>
        </div>
      </div>
    );
  }

  const labels = data.map((i) => i.name);
  const earnings = data.map((i) => i.earnings);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Earnings (₹)",
        data: earnings,
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(168, 85, 247)",
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Top Instructors by Earnings",
        color: "rgb(248, 250, 252)",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: { bottom: 20 },
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
            return `Earnings: ₹${context.parsed.x.toLocaleString("en-IN")}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(71, 85, 105, 0.3)",
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          font: { size: 11 },
          callback: function (value) {
            if (value >= 1000) {
              return "₹" + value / 1000 + "k";
            }
            return "₹" + value;
          },
        },
      },
      y: {
        grid: {
          color: "rgba(71, 85, 105, 0.3)",
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          font: { size: 11 },
        },
      },
    },
  };

  // Calculate stats
  const topEarning = earnings[0] || 0;
  const totalInstructors = earnings.length;
  const avgEarnings = Math.round(
    earnings.reduce((a, b) => a + b, 0) / totalInstructors
  );

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors duration-300">
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>

      {/* Instructor Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
          <div className="text-green-400 font-bold text-lg">
            ₹{topEarning.toLocaleString("en-IN")}
          </div>
          <div className="text-slate-400 text-xs">Top Earner</div>
        </div>
        <div className="text-center p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
          <div className="text-blue-400 font-bold text-lg">
            {totalInstructors}
          </div>
          <div className="text-slate-400 text-xs">Instructors</div>
        </div>
        <div className="text-center p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
          <div className="text-purple-400 font-bold text-lg">
            ₹{avgEarnings.toLocaleString("en-IN")}
          </div>
          <div className="text-slate-400 text-xs">Avg Earnings</div>
        </div>
      </div>
    </div>
  );
};

export default TopInstructorsChart;
