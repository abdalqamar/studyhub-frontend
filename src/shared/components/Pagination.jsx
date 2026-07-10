const getPageNumbers = (current, total) => {
  const pages = [];
  const delta = 1;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }
  return pages;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-border">
      <span className="font-mono text-xs text-text-3">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="min-w-8 h-8 px-2 rounded-lg border border-border-strong font-mono text-xs text-text-2 disabled:opacity-40 disabled:cursor-not-allowed hover:border-text-3 transition-colors"
        >
          Prev
        </button>

        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="min-w-8 h-8 flex items-center justify-center font-mono text-xs text-text-3"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-8 h-8 rounded-lg border font-mono text-xs transition-colors ${
                page === currentPage
                  ? "bg-gold border-gold text-bg font-semibold"
                  : "border-border-strong text-text-2 hover:border-text-3"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="min-w-8 h-8 px-2 rounded-lg border border-border-strong font-mono text-xs text-text-2 disabled:opacity-40 disabled:cursor-not-allowed hover:border-text-3 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
