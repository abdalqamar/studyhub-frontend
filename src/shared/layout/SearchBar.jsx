import { Search, X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  const handleClear = () => onChange({ target: { value: "" } });

  return (
    <div
      className={`flex items-center gap-2 bg-surface-2 border border-border-strong rounded-xl px-3.5 py-2.5 w-full sm:w-60 ${className}`}
    >
      <Search size={15} className="text-text-3 flex-shrink-0" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-text-1 placeholder-text-3 text-[13.5px] w-full"
      />
      {value && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          title="Clear search"
          className="text-text-3 hover:text-text-1 transition-colors flex-shrink-0"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
