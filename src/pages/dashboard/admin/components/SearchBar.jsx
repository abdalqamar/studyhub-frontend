import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full md:w-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-64 bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search categories..."
      />

      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
};

export default SearchBar;
