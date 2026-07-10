const TabsFilter = ({ userType, statusFilter, onStatusChange }) => {
  const isActive = (tabId) =>
    tabId === "all" ? !statusFilter : statusFilter === tabId;

  const tabs = [
    { id: "all", label: "All" },
    {
      id: "approved",
      label: userType === "instructor" ? "Active" : "Approved",
    },
    { id: "pending", label: "Pending" },
    { id: "rejected", label: "Rejected" },
  ];

  return (
    <div className="flex flex-wrap gap-1 bg-surface-2 border border-border rounded-xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onStatusChange(tab.id === "all" ? "" : tab.id)}
          className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap ${
            isActive(tab.id)
              ? "bg-gold text-bg font-semibold"
              : "text-text-2 hover:text-text-1"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsFilter;
