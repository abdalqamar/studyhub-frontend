import { Search, X } from "lucide-react";
import TabsFilter from "./TabsFilter";
import SearchBar from "../../../components/common/SearchBar";

const CourseFilterBar = ({
  userType,
  statusFilter,
  onStatusChange,
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-700 rounded-lg p-1">
          <TabsFilter
            userType={userType}
            statusFilter={statusFilter}
            onStatusChange={onStatusChange}
          />
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search your courses..."
          />

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourseFilterBar;
