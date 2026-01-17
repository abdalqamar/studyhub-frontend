const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-between border-t border-slate-700 pt-6 m-3">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors text-sm font-medium"
    >
      Previous
    </button>
    <span className="text-sm text-slate-400">
      Page <span className="font-medium text-white">{currentPage}</span> of{" "}
      <span className="font-medium text-white">{totalPages}</span>
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors text-sm font-medium"
    >
      Next
    </button>
  </div>
);
export default Pagination;
