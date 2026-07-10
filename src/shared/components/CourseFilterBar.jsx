import SearchBar from "../layout/SearchBar";
import TabsFilter from "./TabsFilter";

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
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-surface border border-border rounded-2xl p-3.5 mb-5">
      <TabsFilter
        userType={userType}
        statusFilter={statusFilter}
        onStatusChange={onStatusChange}
      />

      <div className="flex flex-col sm:flex-row gap-2.5">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search courses..."
        />

        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full sm:w-44 bg-surface-2 border border-border-strong rounded-xl px-3.5 py-2.5 text-text-2 text-[13.5px] outline-none focus:ring-2 focus:ring-gold transition-all"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CourseFilterBar;
