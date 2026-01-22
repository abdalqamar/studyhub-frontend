import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { useAdminTransactions } from "../../../hooks/admin/useAdminTranscations";
import Transactions from "./components/Transactions";
import { useCallback, useEffect, useMemo, useState } from "react";

const TransactionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all"
  );
  const [dateRange, setDateRange] = useState(
    searchParams.get("dateRange") || "all"
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const ITEMS_PER_PAGE = 12;

  const { data, isLoading } = useAdminTransactions(
    statusFilter,
    dateRange,
    currentPage,
    ITEMS_PER_PAGE
  );

  const pagination = useMemo(() => data?.pagination, [data?.pagination]);

  //
  useEffect(() => {
    setStatusFilter(searchParams.get("status") || "all");
    setDateRange(searchParams.get("dateRange") || "all");
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  const updateSearchParams = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          if (value && value !== "all") {
            params.set(key, value);
          } else {
            params.delete(key);
          }
        });
        return params;
      });
    },
    [setSearchParams]
  );

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
    updateSearchParams({ status, page: "1" });
  };

  const handleDateRangeChange = (dateRange) => {
    setDateRange(dateRange);
    setCurrentPage(1);
    updateSearchParams({ dateRange, page: "1" });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateSearchParams({ page: String(page) });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          Transactions & Payments
        </h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          Export Report
        </button>
      </div>

      <Transactions
        data={data}
        status={statusFilter}
        dateRange={dateRange}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
        onPageChange={handlePageChange}
        pagination={pagination}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TransactionsPage;
