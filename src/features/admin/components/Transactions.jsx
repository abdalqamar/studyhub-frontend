import Pagination from "@/shared/components/Pagination";
import { CheckCircle2, CreditCard, DollarSign } from "lucide-react";

const STATUS_STYLES = {
  success: "bg-teal",
  pending: "bg-gold",
  failed: "bg-danger",
  refunded: "bg-surface-2",
};

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

  const getStatusColor = (status) => STATUS_STYLES[status] || "bg-surface-2";

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
      {/* Quick Stats — same clip-card language as the dashboard stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] mb-6">
        <div
          className="relative bg-surface border border-border p-5"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-3 text-[12.5px] font-medium mb-1">
                Total Revenue
              </div>
              <div className="font-mono text-[26px] font-bold text-text-1">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="w-10 h-10 rounded-[10px] bg-gold-soft flex items-center justify-center text-gold">
              <DollarSign size={20} />
            </div>
          </div>
        </div>

        <div
          className="relative bg-surface border border-border p-5"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-3 text-[12.5px] font-medium mb-1">
                Total Transactions
              </div>
              <div className="font-mono text-[26px] font-bold text-text-1">
                {transactions.length}
              </div>
            </div>
            <div className="w-10 h-10 rounded-[10px] bg-accent-blue-soft flex items-center justify-center text-accent-blue">
              <CreditCard size={20} />
            </div>
          </div>
        </div>

        <div
          className="relative bg-surface border border-border p-5"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-3 text-[12.5px] font-medium mb-1">
                Successful
              </div>
              <div className="font-mono text-[26px] font-bold text-text-1">
                {successfulTransactions}
              </div>
            </div>
            <div className="w-10 h-10 rounded-[10px] bg-teal-soft flex items-center justify-center text-teal">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface rounded-[14px] p-5 border border-border mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="bg-surface-2 border border-border-strong rounded-lg px-4 py-2 text-text-1 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
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
              className="bg-surface-2 border border-border-strong rounded-lg px-4 py-2 text-text-1 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          <div className="text-text-3 text-[13px]">
            Showing {transactions.length} transactions
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-surface rounded-[14px] border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-2">
              <tr>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-text-3 uppercase tracking-wider">
                  Payment Method
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="hover:bg-surface-2 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-text-3 text-xs font-mono">
                      {transaction.transactionId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-text-1 text-[13.5px]">
                        {transaction.user?.firstName}{" "}
                        {transaction.user?.lastName}
                      </div>
                      <div className="text-text-3 text-xs">Student</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-2 text-[13.5px]">
                    {transaction.course?.title || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono font-bold text-text-1 text-[13.5px]">
                      ₹{transaction.amount.toLocaleString("en-IN")}
                    </div>
                    <div className="text-text-3 text-xs">
                      {transaction.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )} text-bg capitalize`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-2 text-[13px]">
                    {formatDate(transaction.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-text-2 text-[13px] capitalize">
                      {transaction.paymentMethod}
                    </div>
                    {transaction.paymentGatewayOrderId && (
                      <div className="text-text-3 text-xs">
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

        {transactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-lg font-medium text-text-1 mb-2">
              No transactions found
            </h3>
            <p className="text-text-3 text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Transaction Summary */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        <div className="bg-surface rounded-[14px] p-5 border border-border">
          <h3 className="font-display font-semibold text-[15px] text-text-1 mb-4">
            Recent Transactions
          </h3>
          <div className="space-y-2.5">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction._id}
                className="flex justify-between items-center p-3 bg-surface-2 rounded-lg"
              >
                <div>
                  <div className="font-medium text-text-1 text-[13.5px]">
                    {transaction.user?.firstName} {transaction.user?.lastName}
                  </div>
                  <div className="text-text-3 text-xs">
                    {transaction.course?.title}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-gold font-bold text-[13.5px]">
                    ₹{transaction.amount.toLocaleString("en-IN")}
                  </div>
                  <div className="text-text-3 text-xs capitalize">
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-[14px] p-5 border border-border">
          <h3 className="font-display font-semibold text-[15px] text-text-1 mb-4">
            Transaction Summary
          </h3>
          <div className="space-y-3 text-[13.5px]">
            <div className="flex justify-between">
              <span className="text-text-3">Total Transactions:</span>
              <span className="text-text-1 font-medium font-mono">
                {transactions.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-3">Successful:</span>
              <span className="text-teal font-medium font-mono">
                {successfulTransactions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-3">Pending:</span>
              <span className="text-gold font-medium font-mono">
                {pendingTransactions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-3">Failed:</span>
              <span className="text-danger font-medium font-mono">
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
