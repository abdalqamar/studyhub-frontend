// src/pages/AdminDashboard/components/Transactions.jsx
import { useState } from "react";

const Transactions = () => {
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const transactions = [
    {
      id: 1,
      type: "course_purchase",
      student: "John Doe",
      instructor: "Sarah Wilson",
      course: "React Masterclass",
      amount: 79,
      status: "completed",
      date: "2024-01-15 14:30:00",
      transactionId: "TXN_001234",
    },
    {
      id: 2,
      type: "instructor_payout",
      student: null,
      instructor: "Mike Johnson",
      course: "Node.js Backend",
      amount: -2450,
      status: "processed",
      date: "2024-01-15 10:15:00",
      transactionId: "PAY_001235",
    },
    {
      id: 3,
      type: "course_purchase",
      student: "Emily Davis",
      instructor: "Alex Brown",
      course: "JavaScript Fundamentals",
      amount: 59,
      status: "completed",
      date: "2024-01-14 16:45:00",
      transactionId: "TXN_001236",
    },
    {
      id: 4,
      type: "refund",
      student: "Mike Johnson",
      instructor: "Lisa Chen",
      course: "UI/UX Design",
      amount: -89,
      status: "processed",
      date: "2024-01-14 11:20:00",
      transactionId: "REF_001237",
    },
    {
      id: 5,
      type: "course_purchase",
      student: "David Wilson",
      instructor: "Maria Garcia",
      course: "Python for Data Science",
      amount: 99,
      status: "pending",
      date: "2024-01-13 09:30:00",
      transactionId: "TXN_001238",
    },
    {
      id: 6,
      type: "instructor_payout",
      student: null,
      instructor: "John Doe",
      course: "React Masterclass",
      amount: -1870,
      status: "completed",
      date: "2024-01-12 14:00:00",
      transactionId: "PAY_001239",
    },
    {
      id: 7,
      type: "course_purchase",
      student: "Sarah Miller",
      instructor: "David Wilson",
      course: "Mobile App Development",
      amount: 89,
      status: "failed",
      date: "2024-01-12 13:15:00",
      transactionId: "TXN_001240",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case "course_purchase":
        return "bg-green-500";
      case "instructor_payout":
        return "bg-blue-500";
      case "refund":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case "course_purchase":
        return "Course Purchase";
      case "instructor_payout":
        return "Instructor Payout";
      case "refund":
        return "Refund";
      default:
        return type;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "processed":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getAmountColor = (amount) => {
    return amount > 0 ? "text-green-400" : "text-red-400";
  };

  const getAmountPrefix = (amount) => {
    return amount > 0 ? "+" : "";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate totals
  const totalRevenue = transactions
    .filter((t) => t.amount > 0 && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPayouts = transactions
    .filter((t) => t.amount < 0 && t.status !== "failed")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netRevenue = totalRevenue - totalPayouts;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Transactions & Payments
        </h2>
        <div className="flex space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Export Report
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Process Payouts
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-400">
                ${totalRevenue.toLocaleString()}
              </div>
              <div className="text-slate-400 text-sm">Total Revenue</div>
            </div>
            <div className="text-3xl text-green-400">💰</div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-400">
                ${totalPayouts.toLocaleString()}
              </div>
              <div className="text-slate-400 text-sm">Total Payouts</div>
            </div>
            <div className="text-3xl text-blue-400">💸</div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-400">
                ${netRevenue.toLocaleString()}
              </div>
              <div className="text-slate-400 text-sm">Net Revenue</div>
            </div>
            <div className="text-3xl text-purple-400">📊</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="course_purchase">Course Purchases</option>
              <option value="instructor_payout">Instructor Payouts</option>
              <option value="refund">Refunds</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          <div className="text-slate-400 text-sm">
            Showing {filteredTransactions.length} transactions
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-slate-750 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                            transaction.type
                          )} text-white mr-2`}
                        >
                          {getTypeText(transaction.type)}
                        </span>
                        <div className="text-slate-400 text-xs font-mono">
                          {transaction.transactionId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">
                        {transaction.type === "instructor_payout"
                          ? transaction.instructor
                          : transaction.student}
                      </div>
                      <div className="text-slate-400 text-xs">
                        {transaction.type === "instructor_payout"
                          ? "Instructor"
                          : "Student"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {transaction.course}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`font-bold ${getAmountColor(
                        transaction.amount
                      )}`}
                    >
                      {getAmountPrefix(transaction.amount)}$
                      {Math.abs(transaction.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )} text-white`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        View Details
                      </button>
                      {transaction.status === "pending" && (
                        <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                          Process
                        </button>
                      )}
                      {transaction.status === "failed" && (
                        <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                          Retry
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-lg font-medium text-white mb-2">
              No transactions found
            </h3>
            <p className="text-slate-400">
              {filter !== "all"
                ? "Try adjusting your filters"
                : "No transactions available"}
            </p>
          </div>
        )}
      </div>

      {/* Recent Payouts Summary */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">Recent Payouts</h3>
          <div className="space-y-3">
            {transactions
              .filter((t) => t.type === "instructor_payout")
              .slice(0, 5)
              .map((payout) => (
                <div
                  key={payout.id}
                  className="flex justify-between items-center p-3 bg-slate-700 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-white">
                      {payout.instructor}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {formatDate(payout.date)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 font-bold">
                      -${Math.abs(payout.amount)}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {payout.status}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">
            Transaction Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Transactions:</span>
              <span className="text-white font-medium">
                {transactions.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Successful:</span>
              <span className="text-green-400 font-medium">
                {
                  transactions.filter(
                    (t) => t.status === "completed" || t.status === "processed"
                  ).length
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Pending:</span>
              <span className="text-yellow-400 font-medium">
                {transactions.filter((t) => t.status === "pending").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Failed:</span>
              <span className="text-red-400 font-medium">
                {transactions.filter((t) => t.status === "failed").length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
