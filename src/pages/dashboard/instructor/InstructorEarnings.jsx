import { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const InstructorEarnings = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [activeTab, setActiveTab] = useState("overview");

  // Earnings Data
  const earningsData = {
    totalEarnings: 28450,
    pendingBalance: 1245,
    withdrawn: 27205,
    thisMonth: 2450,
    lastMonth: 2180,
    studentsThisMonth: 45,
    averageEarningPerStudent: 54.44,
  };

  // Monthly earnings data for chart
  const monthlyEarnings = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Monthly Earnings ($)",
        data: [
          2100, 1800, 2200, 1950, 2400, 2800, 3200, 3000, 2750, 2900, 3100,
          2450,
        ],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Course-wise earnings for doughnut chart
  const courseEarnings = {
    labels: [
      "React Masterclass",
      "Node.js Backend",
      "UI/UX Design",
      "JavaScript Patterns",
      "Python Data",
    ],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          "rgb(59, 130, 246)",
          "rgb(34, 197, 94)",
          "rgb(245, 158, 11)",
          "rgb(139, 92, 246)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 2,
        borderColor: "rgb(30, 41, 59)",
      },
    ],
  };

  // Transactions data
  const transactions = [
    {
      id: 1,
      date: "2024-01-15",
      type: "course_sale",
      course: "React Masterclass 2024",
      students: 3,
      amount: 147,
      status: "completed",
    },
    {
      id: 2,
      date: "2024-01-14",
      type: "course_sale",
      course: "Node.js Backend Development",
      students: 2,
      amount: 178,
      status: "completed",
    },
    {
      id: 3,
      date: "2024-01-13",
      type: "withdrawal",
      course: "",
      students: 0,
      amount: -2000,
      status: "processed",
    },
    {
      id: 4,
      date: "2024-01-12",
      type: "course_sale",
      course: "UI/UX Design Principles",
      students: 5,
      amount: 345,
      status: "completed",
    },
    {
      id: 5,
      date: "2024-01-10",
      type: "course_sale",
      course: "Advanced JavaScript Patterns",
      students: 1,
      amount: 59,
      status: "pending",
    },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgb(203, 213, 225)",
          padding: 20,
        },
      },
      title: {
        display: true,
        color: "rgb(248, 250, 252)",
      },
      tooltip: {
        backgroundColor: "rgb(15, 23, 42)",
        titleColor: "rgb(248, 250, 252)",
        bodyColor: "rgb(203, 213, 225)",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(71, 85, 105, 0.3)",
        },
        ticks: {
          color: "rgb(148, 163, 184)",
        },
      },
      y: {
        grid: {
          color: "rgba(71, 85, 105, 0.3)",
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          callback: function (value) {
            return "$" + value;
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgb(203, 213, 225)",
          padding: 20,
        },
      },
    },
    cutout: "60%",
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "processed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      default:
        return "text-slate-400";
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "course_sale":
        return "💰";
      case "withdrawal":
        return "🏦";
      default:
        return "📊";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Earnings & Analytics</h1>
        <p className="text-slate-400 mt-2">
          Track your course earnings and performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Earnings</p>
              <p className="text-2xl font-bold text-white mt-1">
                {formatCurrency(earningsData.totalEarnings)}
              </p>
            </div>
            <div className="text-2xl text-green-400">💰</div>
          </div>
          <div className="mt-4 text-green-400 text-sm">
            ↑ 12.4% from last month
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Pending Balance</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">
                {formatCurrency(earningsData.pendingBalance)}
              </p>
            </div>
            <div className="text-2xl text-yellow-400">⏳</div>
          </div>
          <div className="mt-4 text-slate-400 text-sm">
            Next payout: Jan 30, 2024
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">This Month</p>
              <p className="text-2xl font-bold text-blue-400 mt-1">
                {formatCurrency(earningsData.thisMonth)}
              </p>
            </div>
            <div className="text-2xl text-blue-400">📈</div>
          </div>
          <div className="mt-4 text-green-400 text-sm">
            +{earningsData.studentsThisMonth} students
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Avg/Student</p>
              <p className="text-2xl font-bold text-purple-400 mt-1">
                {formatCurrency(earningsData.averageEarningPerStudent)}
              </p>
            </div>
            <div className="text-2xl text-purple-400">🎯</div>
          </div>
          <div className="mt-4 text-slate-400 text-sm">Lifetime average</div>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="bg-slate-800 rounded-xl p-4 mb-6">
        <div className="flex space-x-2">
          {["weekly", "monthly", "quarterly", "yearly"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 rounded-xl p-4 mb-6">
        <div className="flex space-x-2">
          {["overview", "transactions", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Earnings Chart */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">
                Earnings Overview
              </h3>
              <span className="text-slate-400 text-sm capitalize">
                {timeRange}
              </span>
            </div>
            <div className="h-80">
              <Line data={monthlyEarnings} options={chartOptions} />
            </div>
          </div>

          {/* Course Distribution */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-6">
              Earnings by Course
            </h3>
            <div className="h-80">
              <Doughnut data={courseEarnings} options={doughnutOptions} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-lg font-bold text-white">
              Recent Transactions
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-slate-750 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-300">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span>{getTransactionIcon(transaction.type)}</span>
                        <span className="text-slate-300 capitalize">
                          {transaction.type.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {transaction.course || "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {transaction.students > 0 ? transaction.students : "-"}
                    </td>
                    <td
                      className={`px-6 py-4 font-medium ${
                        transaction.amount > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          transaction.status
                        )} bg-slate-700`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Withdrawal Section */}
          <div className="p-6 border-t border-slate-700">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-white">
                  Available for Withdrawal
                </h4>
                <p className="text-slate-400 text-sm mt-1">
                  {formatCurrency(earningsData.pendingBalance)} • Next payout:
                  Jan 30, 2024
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Request Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Metrics */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-6">
              Performance Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-700 rounded-lg">
                <span className="text-slate-300">Conversion Rate</span>
                <span className="text-green-400 font-bold">8.2%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-700 rounded-lg">
                <span className="text-slate-300">Student Completion Rate</span>
                <span className="text-blue-400 font-bold">72%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-700 rounded-lg">
                <span className="text-slate-300">Average Rating</span>
                <span className="text-yellow-400 font-bold">4.8/5</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-700 rounded-lg">
                <span className="text-slate-300">Refund Rate</span>
                <span className="text-green-400 font-bold">1.2%</span>
              </div>
            </div>
          </div>

          {/* Top Performing Courses */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-6">
              Top Performing Courses
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "React Masterclass 2024",
                  earnings: 9850,
                  students: 185,
                },
                {
                  name: "Node.js Backend Development",
                  earnings: 7450,
                  students: 149,
                },
                {
                  name: "UI/UX Design Principles",
                  earnings: 5230,
                  students: 87,
                },
                {
                  name: "Advanced JavaScript Patterns",
                  earnings: 3870,
                  students: 65,
                },
                {
                  name: "Python for Data Analysis",
                  earnings: 2050,
                  students: 41,
                },
              ].map((course, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-slate-700 rounded-lg"
                >
                  <div>
                    <div className="text-white font-medium">{course.name}</div>
                    <div className="text-slate-400 text-sm">
                      {course.students} students
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">
                      {formatCurrency(course.earnings)}
                    </div>
                    <div className="text-slate-400 text-sm">
                      Avg: {formatCurrency(course.earnings / course.students)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorEarnings;
