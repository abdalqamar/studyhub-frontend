import { CheckCircle2, CreditCard, DollarSign } from "lucide-react";
import Pagination from "../../shared/Pagination";

const Transactions = ({
  data,
  onStatusChange,
  status,
  onPageChange,
  pagination,
  currentPage,
  onDateRangeChange,
  dateRange,
}) => {
  const transactions = data?.transactions || [];
  const stats = data?.stats || { totalRevenue: 0 };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-500";
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
  const totalRevenue = stats.totalRevenue || 0;

  const successfulTransactions = transactions.filter(
    (t) => t.status === "success"
  ).length;

  const pendingTransactions = transactions.filter(
    (t) => t.status === "pending"
  ).length;

  const failedTransactions = transactions.filter(
    (t) => t.status === "failed"
  ).length;

  return (
    <div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-sm font-medium mb-1">
                Total Revenue
              </div>
              <div className="text-3xl font-bold text-white">
                ₹{totalRevenue.toLocaleString()}
              </div>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-sm font-medium mb-1">
                Total Transactions
              </div>
              <div className="text-3xl font-bold text-white">
                {transactions.length}
              </div>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <CreditCard className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-sm font-medium mb-1">
                Successful
              </div>
              <div className="text-3xl font-bold text-white">
                {successfulTransactions}
              </div>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <CheckCircle2 className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
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
            Showing {transactions.length} transactions
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
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Student
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
                  Payment Method
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="hover:bg-slate-750 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-slate-400 text-xs font-mono">
                      {transaction.transactionId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">
                        {transaction.user?.firstName}{" "}
                        {transaction.user?.lastName}
                      </div>
                      <div className="text-slate-400 text-xs">Student</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {transaction.course?.title || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`font-bold ${getAmountColor(transaction.amount)}`}
                    >
                      ₹{transaction.amount.toLocaleString()}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {transaction.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )} text-white capitalize`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {formatDate(transaction.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-300 text-sm capitalize">
                      {transaction.paymentMethod}
                    </div>
                    {transaction.paymentGatewayOrderId && (
                      <div className="text-slate-500 text-xs">
                        {transaction.paymentGatewayOrderId}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination?.totalPages > 1 && (
          <div className="px-6 pb-6">
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}

        {/* Empty State */}
        {transactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-lg font-medium text-white mb-2">
              No transactions found
            </h3>
            <p className="text-slate-400">Try adjusting your filters</p>
          </div>
        )}
      </div>
      {/* Transaction Summary */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction._id}
                className="flex justify-between items-center p-3 bg-slate-700 rounded-lg"
              >
                <div>
                  <div className="font-medium text-white">
                    {transaction.user?.firstName} {transaction.user?.lastName}
                  </div>
                  <div className="text-slate-400 text-xs">
                    {transaction.course?.title}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">
                    ₹{transaction.amount.toLocaleString()}
                  </div>
                  <div className="text-slate-400 text-xs capitalize">
                    {transaction.status}
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
                {successfulTransactions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Pending:</span>
              <span className="text-yellow-400 font-medium">
                {pendingTransactions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Failed:</span>
              <span className="text-red-400 font-medium">
                {failedTransactions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
