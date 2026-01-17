const TabsFilter = ({ userType, statusFilter, onStatusChange }) => {
  const isActive = (tabId) =>
    tabId === "all" ? !statusFilter : statusFilter === tabId;
  const tabs = [
    { id: "all", label: "All Courses" },
    {
      id: "approved",
      label: userType === "instructor" ? "Active" : "Published",
    },
    { id: "pending", label: "Pending" },
    { id: "rejected", label: "Rejected" },
  ];

  return (
    <div className="w-full">
      {/* Mobile */}
      <div className="block md:hidden">
        <div className="grid grid-cols-2 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onStatusChange(tab.id === "all" ? "" : tab.id)}
              className={`px-3 py-3 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                isActive(tab.id)
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white bg-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex gap-4 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onStatusChange(tab.id === "all" ? "" : tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(tab.id)
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:text-white bg-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsFilter;
