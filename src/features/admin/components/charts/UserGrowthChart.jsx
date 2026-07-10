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

const UserGrowthChart = ({ monthlyStudents, monthlyInstructors }) => {
  if (
    (!monthlyStudents || monthlyStudents.length === 0) &&
    (!monthlyInstructors || monthlyInstructors.length === 0)
  ) {
    return (
      <CardShell>
        <h4 className="font-display font-semibold text-[13.5px] text-text-1">
          User Growth
        </h4>
        <div className="h-72 flex items-center justify-center">
          <p className="text-text-3 text-sm">No user growth data available</p>
        </div>
      </CardShell>
    );
  }

  const studentsByMonth = Array(12).fill(0);
  monthlyStudents?.forEach((item) => {
    if (item._id?.month >= 1 && item._id?.month <= 12) {
      studentsByMonth[item._id.month - 1] = item.count || 0;
    }
  });

  const instructorsByMonth = Array(12).fill(0);
  monthlyInstructors?.forEach((item) => {
    if (item._id?.month >= 1 && item._id?.month <= 12) {
      instructorsByMonth[item._id.month - 1] = item.count || 0;
    }
  });

  const data = {
    labels: MONTHS,
    datasets: [
      {
        label: "Students",
        data: studentsByMonth,
        backgroundColor: "#5b8def",
        borderRadius: 3,
      },
      {
        label: "Instructors",
        data: instructorsByMonth,
        backgroundColor: "#2dd4bf",
        borderRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(18,23,42,0.95)",
        titleColor: "#edeff5",
        bodyColor: "#9aa1b8",
        borderColor: "rgba(255,255,255,0.12)",
        borderWidth: 1,
        padding: 10,
        callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}` },
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

  const totalStudents = studentsByMonth.reduce((a, b) => a + b, 0);
  const totalInstructors = instructorsByMonth.reduce((a, b) => a + b, 0);

  return (
    <CardShell>
      <h4 className="font-display font-semibold text-[13.5px] text-text-1">
        User Growth
      </h4>
      <div className="text-[11.5px] text-text-3 mb-3">
        Students vs instructors
      </div>

      <div className="h-56 mb-3">
        <Bar data={data} options={options} />
      </div>

      <div className="flex gap-3.5 flex-wrap">
        <div className="flex items-center gap-1.5 text-[11.5px] text-text-2">
          <span className="w-2 h-2 rounded-full bg-accent-blue" /> Students ·{" "}
          <strong className="text-text-1">{totalStudents}</strong>
        </div>
        <div className="flex items-center gap-1.5 text-[11.5px] text-text-2">
          <span className="w-2 h-2 rounded-full bg-teal" /> Instructors ·{" "}
          <strong className="text-text-1">{totalInstructors}</strong>
        </div>
      </div>
    </CardShell>
  );
};

export default UserGrowthChart;
