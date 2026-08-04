const DashboardSkeletonLoader = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-7 w-1/4 rounded-lg shimmer"></div>
        <div className="h-4 w-2/5 rounded shimmer"></div>
      </div>

      {/* Stats cards row — matches OverviewStats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-xl p-4 space-y-3"
          >
            <div className="h-3 w-1/2 rounded shimmer"></div>
            <div className="h-6 w-2/3 rounded shimmer"></div>
          </div>
        ))}
      </div>

      {/* Charts grid — matches AnalyticsCharts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-xl p-4 space-y-3"
          >
            <div className="h-4 w-1/3 rounded shimmer"></div>
            <div className="h-56 rounded-lg shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeletonLoader;
