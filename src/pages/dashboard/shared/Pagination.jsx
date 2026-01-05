import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  itemName = "items", // "students", "users", "courses" etc
}) => {
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Page numbers dikhane ke liye logic
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Agar kam pages hain to sab dikhao
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Agar zyada pages hain to smart dikhao
      if (currentPage <= 3) {
        // Start pe ho
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        // End pe ho
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        // Beech mein ho
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-700/50 bg-slate-800/30">
      {/* Info Section */}
      <div className="text-slate-400 text-sm font-medium">
        Showing{" "}
        <span className="text-slate-300 font-semibold">
          {indexOfFirstItem + 1}
        </span>
        -<span className="text-slate-300 font-semibold">{indexOfLastItem}</span>{" "}
        of <span className="text-slate-300 font-semibold">{totalItems}</span>{" "}
        {itemName}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center space-x-1">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-all duration-200 ${
            currentPage === 1
              ? "text-slate-600 cursor-not-allowed"
              : "text-slate-400 hover:text-white hover:bg-slate-700"
          }`}
          title="First page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentPage === 1
              ? "bg-slate-800 text-slate-600 cursor-not-allowed"
              : "bg-slate-700/50 text-slate-300 hover:bg-slate-600 hover:text-white"
          }`}
        >
          <span className="hidden sm:inline">Previous</span>
          <ChevronLeft className="w-4 h-4 sm:hidden" />
        </button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center space-x-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-slate-500"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === page
                    ? " text-white shadow-lg shadow-blue-600/30 scale-105"
                    : "bg-slate-700/50 text-slate-300 hover:bg-slate-600 hover:text-white hover:scale-105"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Current page indicator for mobile */}
        <div className="sm:hidden px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg font-medium">
          {currentPage} / {totalPages}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-slate-800 text-slate-600 cursor-not-allowed"
              : "bg-slate-700/50 text-slate-300 hover:bg-slate-600 hover:text-white"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4 sm:hidden" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-all duration-200 ${
            currentPage === totalPages
              ? "text-slate-600 cursor-not-allowed"
              : "text-slate-400 hover:text-white hover:bg-slate-700"
          }`}
          title="Last page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
