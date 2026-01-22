// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const EnrollmentsChart = ({ totalStudents }) => {

//   const data = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "New Enrollments",
//         data: Array(12).fill(totalStudents),
//         borderColor: "rgb(168, 85, 247)",
//         backgroundColor: "rgba(168, 85, 247, 0.1)",
//         tension: 0.4,
//         fill: true,
//       },
//       {
//         label: "Cumulative Enrollments",
//         data: Array(12).fill(totalStudents),
//         borderColor: "rgb(14, 165, 233)",
//         backgroundColor: "rgba(14, 165, 233, 0.1)",
//         tension: 0.4,
//         fill: true,
//         borderDash: [5, 5],
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           color: "rgb(203, 213, 225)",
//         },
//       },
//       title: {
//         display: true,
//         text: "Student Enrollment Growth",
//         color: "rgb(248, 250, 252)",
//         font: {
//           size: 16,
//           weight: "bold",
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

//   return (
//     <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//       <div className="h-80">
//         <Line data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default EnrollmentsChart;

// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const EnrollmentsChart = ({ totalStudents }) => {
//   // Generate realistic monthly enrollment data
//   const generateEnrollmentData = (total) => {
//     const months = 12;
//     const monthlyData = [];
//     const cumulativeData = [];

//     // Calculate monthly growth
//     const avgPerMonth = Math.floor(total / months);
//     let cumulative = 0;

//     for (let i = 0; i < months; i++) {
//       // Add variation to make it realistic (70% to 130% of average)
//       const variation = avgPerMonth * (0.7 + Math.random() * 0.6);
//       const monthly = Math.round(variation);

//       monthlyData.push(monthly);
//       cumulative += monthly;
//       cumulativeData.push(cumulative);
//     }

//     // Adjust last month to match exact total
//     const diff = total - cumulative;
//     monthlyData[11] += diff;
//     cumulativeData[11] = total;

//     return { monthlyData, cumulativeData };
//   };

//   const { monthlyData, cumulativeData } = generateEnrollmentData(
//     totalStudents || 0
//   );

//   const data = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "New Enrollments",
//         data: monthlyData,
//         borderColor: "rgb(168, 85, 247)",
//         backgroundColor: "rgba(168, 85, 247, 0.1)",
//         tension: 0.4,
//         fill: true,
//         pointRadius: 4,
//         pointHoverRadius: 6,
//         pointBackgroundColor: "rgb(168, 85, 247)",
//         pointBorderColor: "rgb(15, 23, 42)",
//         pointBorderWidth: 2,
//         borderWidth: 3,
//       },
//       {
//         label: "Cumulative Enrollments",
//         data: cumulativeData,
//         borderColor: "rgb(14, 165, 233)",
//         backgroundColor: "rgba(14, 165, 233, 0.1)",
//         tension: 0.4,
//         fill: true,
//         borderDash: [5, 5],
//         pointRadius: 4,
//         pointHoverRadius: 6,
//         pointBackgroundColor: "rgb(14, 165, 233)",
//         pointBorderColor: "rgb(15, 23, 42)",
//         pointBorderWidth: 2,
//         borderWidth: 3,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: {
//       intersect: false,
//       mode: "index",
//     },
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           color: "rgb(203, 213, 225)",
//           font: { size: 12 },
//           padding: 15,
//           usePointStyle: true,
//         },
//       },
//       title: {
//         display: true,
//         text: "Student Enrollment Growth",
//         color: "rgb(248, 250, 252)",
//         font: {
//           size: 18,
//           weight: "bold",
//         },
//         padding: { bottom: 20 },
//       },
//       tooltip: {
//         backgroundColor: "rgba(15, 23, 42, 0.9)",
//         titleColor: "rgb(248, 250, 252)",
//         bodyColor: "rgb(203, 213, 225)",
//         borderColor: "rgba(71, 85, 105, 0.5)",
//         borderWidth: 1,
//         padding: 12,
//         displayColors: true,
//         callbacks: {
//           label: function (context) {
//             const label = context.dataset.label || "";
//             const value = context.parsed.y;
//             return `${label}: ${value} students`;
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
//           font: { size: 11 },
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: "rgba(71, 85, 105, 0.3)",
//         },
//         ticks: {
//           color: "rgb(148, 163, 184)",
//           font: { size: 11 },
//         },
//       },
//     },
//   };

//   // Calculate stats
//   const avgMonthly = Math.round(totalStudents / 12);
//   const lastMonthEnrollments = monthlyData[11];

//   return (
//     <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors duration-300">
//       {/* Stats Summary */}
//       <div className="grid grid-cols-3 gap-4 mb-4">
//         <div className="text-center p-3 bg-slate-700 rounded-lg">
//           <p className="text-xs text-slate-400">Total Students</p>
//           <p className="text-xl font-bold text-white">{totalStudents}</p>
//         </div>
//         <div className="text-center p-3 bg-slate-700 rounded-lg">
//           <p className="text-xs text-slate-400">Avg/Month</p>
//           <p className="text-xl font-bold text-purple-400">{avgMonthly}</p>
//         </div>
//         <div className="text-center p-3 bg-slate-700 rounded-lg">
//           <p className="text-xs text-slate-400">Last Month</p>
//           <p className="text-xl font-bold text-sky-400">
//             {lastMonthEnrollments}
//           </p>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="h-80">
//         <Line data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default EnrollmentsChart;

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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EnrollmentsChart = ({ newEnrollments }) => {
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
  if (!newEnrollments || newEnrollments.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">
          Student Enrollment Growth
        </h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-slate-400">No enrollment data available</p>
        </div>
      </div>
    );
  }

  // Process backend data for new enrollments
  const monthlyData = Array(12).fill(0);
  newEnrollments.forEach((item) => {
    if (item._id?.month >= 1 && item._id?.month <= 12) {
      monthlyData[item._id.month - 1] = item.count || 0;
    }
  });

  // Calculate cumulative enrollments
  const cumulativeData = [];
  let cumulative = 0;
  monthlyData.forEach((count) => {
    cumulative += count;
    cumulativeData.push(cumulative);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "New Enrollments",
        data: monthlyData,
        borderColor: "rgb(168, 85, 247)",
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(168, 85, 247)",
        pointBorderColor: "rgb(15, 23, 42)",
        pointBorderWidth: 2,
        borderWidth: 3,
      },
      {
        label: "Cumulative Enrollments",
        data: cumulativeData,
        borderColor: "rgb(14, 165, 233)",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        tension: 0.4,
        fill: true,
        borderDash: [5, 5],
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(14, 165, 233)",
        pointBorderColor: "rgb(15, 23, 42)",
        pointBorderWidth: 2,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
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
        text: "Student Enrollment Growth",
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
        displayColors: true,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value} students`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(71, 85, 105, 0.3)",
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
  const currentMonth = new Date().getMonth(); // 0-11 (Jan = 0)
  const totalStudentsTillNow = cumulativeData[currentMonth] || 0; // Current month tak ka total
  const monthsWithData = monthlyData
    .slice(0, currentMonth + 1)
    .filter((val) => val > 0).length;
  const avgMonthly =
    monthsWithData > 0 ? Math.round(totalStudentsTillNow / monthsWithData) : 0;
  const lastMonthEnrollment = monthlyData[currentMonth] || 0; // Current month ki enrollment

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors duration-300">
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-3 bg-slate-700 rounded-lg">
          <p className="text-xs text-slate-400">Total Till Now</p>
          <p className="text-xl font-bold text-white">{totalStudentsTillNow}</p>
        </div>
        <div className="p-3 bg-slate-700 rounded-lg">
          <p className="text-xs text-slate-400">Avg/Month</p>
          <p className="text-xl font-bold text-purple-400">{avgMonthly}</p>
        </div>
        <div className="p-3 bg-slate-700 rounded-lg">
          <p className="text-xs text-slate-400">This Month</p>
          <p className="text-xl font-bold text-sky-400">
            {lastMonthEnrollment}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EnrollmentsChart;
