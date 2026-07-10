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

const CardShell = ({ children }) => (
  <div className="bg-surface border border-border rounded-[14px] p-5">
    {children}
  </div>
);

const RevenueChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <CardShell>
        <h4 className="font-display font-semibold text-[13.5px] text-text-1">
          Revenue Trend
        </h4>
        <div className="h-72 flex items-center justify-center">
          <p className="text-text-3 text-sm">No revenue data available</p>
        </div>
      </CardShell>
    );
  }

  const revenueByMonth = Array(12).fill(0);
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
        borderColor: "#d4a537",
        backgroundColor: "rgba(212,165,55,0.14)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#d4a537",
        pointBorderColor: "#12172a",
        pointBorderWidth: 2,
        borderWidth: 2.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: "index" },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(18,23,42,0.95)",
        titleColor: "#edeff5",
        bodyColor: "#9aa1b8",
        borderColor: "rgba(255,255,255,0.12)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (ctx) => `Revenue: ₹${ctx.parsed.y.toLocaleString("en-IN")}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.07)" },
        ticks: {
          color: "#5c6480",
          font: { size: 10.5, family: "JetBrains Mono" },
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(255,255,255,0.07)" },
        ticks: {
          color: "#5c6480",
          font: { size: 10.5, family: "JetBrains Mono" },
          callback: (v) => (v >= 1000 ? `₹${v / 1000}k` : `₹${v}`),
        },
      },
    },
  };

  const totalRevenue = revenueByMonth.reduce((sum, v) => sum + v, 0);

  return (
    <CardShell>
      <h4 className="font-display font-semibold text-[13.5px] text-text-1">
        Revenue Trend
      </h4>
      <div className="text-[11.5px] text-text-3 mb-1">
        Monthly revenue, this year
      </div>
      <div className="font-mono text-[22px] font-bold text-gold mb-3">
        ₹{totalRevenue.toLocaleString("en-IN")}
      </div>

      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </CardShell>
  );
};

export default RevenueChart;
