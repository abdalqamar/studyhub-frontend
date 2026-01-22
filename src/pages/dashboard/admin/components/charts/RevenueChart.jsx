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
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MONTHS = [
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

const RevenueChart = ({ data }) => {
  // Validate data
  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">
          Monthly Revenue Trend
        </h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-slate-400">No revenue data available</p>
        </div>
      </div>
    );
  }

  const revenueByMonth = Array(12).fill(0);

  // Backend data ko process karo
  data.forEach((item) => {
    if (item._id?.month >= 1 && item._id?.month <= 12) {
      revenueByMonth[item._id.month - 1] = item.total || 0;
    }
  });

  const chartData = {
    labels: MONTHS,
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenueByMonth,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "rgb(34, 197, 94)",
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
        display: true,
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
        text: "Monthly Revenue Trend",
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
            const value = context.parsed.y;
            return `Revenue: ₹${value.toLocaleString("en-IN")}`;
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
          callback: (value) => {
            if (value >= 1000) {
              return "₹" + value / 1000 + "k";
            }
            return "₹" + value;
          },
        },
      },
    },
  };

  // Calculate stats
  const totalRevenue = revenueByMonth.reduce((sum, val) => sum + val, 0);
  const monthsWithRevenue = revenueByMonth.filter((val) => val > 0).length;
  const avgRevenue =
    monthsWithRevenue > 0 ? Math.round(totalRevenue / monthsWithRevenue) : 0;
  const highestMonth = Math.max(...revenueByMonth);
  const highestMonthName = MONTHS[revenueByMonth.indexOf(highestMonth)];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors duration-300">
      {/* Stats Summary */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-slate-400">Total Revenue (This Year)</p>
          <p className="text-2xl font-bold text-white">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Average/Month</p>
          <p className="text-lg font-semibold text-green-400">
            ₹{Math.round(totalRevenue / 12).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
export default RevenueChart;
