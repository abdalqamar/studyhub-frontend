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

const EnrollmentsChart = ({ newEnrollments }) => {
  if (!newEnrollments || newEnrollments.length === 0) {
    return (
      <CardShell>
        <h4 className="font-display font-semibold text-[13.5px] text-text-1">
          New Enrollments
        </h4>
        <div className="h-72 flex items-center justify-center">
          <p className="text-text-3 text-sm">No enrollment data available</p>
        </div>
      </CardShell>
    );
  }

  const monthlyData = Array(12).fill(0);
  newEnrollments.forEach((item) => {
    if (item._id?.month >= 1 && item._id?.month <= 12) {
      monthlyData[item._id.month - 1] = item.count || 0;
    }
  });

  const cumulativeData = [];
  let cumulative = 0;
  monthlyData.forEach((count) => {
    cumulative += count;
    cumulativeData.push(cumulative);
  });

  const data = {
    labels: MONTHS,
    datasets: [
      {
        label: "New Enrollments",
        data: monthlyData,
        borderColor: "#d4a537",
        backgroundColor: "rgba(212,165,55,0.14)",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#d4a537",
        pointBorderColor: "#12172a",
        pointBorderWidth: 2,
        borderWidth: 2.5,
      },
      {
        label: "Cumulative",
        data: cumulativeData,
        borderColor: "#2dd4bf",
        backgroundColor: "rgba(45,212,191,0.10)",
        tension: 0.4,
        fill: true,
        borderDash: [5, 5],
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#2dd4bf",
        pointBorderColor: "#12172a",
        pointBorderWidth: 2,
        borderWidth: 2,
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
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} students`,
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
          precision: 0,
        },
      },
    },
  };

  const currentMonth = new Date().getMonth();
  const totalTillNow = cumulativeData[currentMonth] || 0;
  const thisMonth = monthlyData[currentMonth] || 0;

  return (
    <CardShell>
      <h4 className="font-display font-semibold text-[13.5px] text-text-1">
        New Enrollments
      </h4>
      <div className="text-[11.5px] text-text-3 mb-3">Last 6 months</div>

      <div className="h-56 mb-3">
        <Line data={data} options={options} />
      </div>

      <div className="flex justify-between font-mono text-[11px] text-text-3 border-t border-border pt-3">
        <span>
          Total till now <strong className="text-text-1">{totalTillNow}</strong>
        </span>
        <span>
          This month <strong className="text-gold">{thisMonth}</strong>
        </span>
      </div>
    </CardShell>
  );
};

export default EnrollmentsChart;
