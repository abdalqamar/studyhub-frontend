import React from "react";
import { Search } from "lucide-react";
import TabsFilter from "./TabsFilter";

const CourseFilterBar = ({
  courses,
  userType,
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories,
  setCurrentPage,
}) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-700 rounded-lg p-1">
          <TabsFilter
            courses={courses}
            userType={userType}
            activeTab={activeTab}
            onTabChange={(tabId) => {
              setActiveTab(tabId);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder={
                userType === "admin"
                  ? "Search courses..."
                  : "Search your courses..."
              }
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="all">All</option>
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
