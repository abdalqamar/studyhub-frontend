const PageLoader = () => {
  return (
    <div className="bg-slate-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-4">
          <div className="h-10 bg-slate-800/50 rounded-lg w-1/3 shimmer"></div>
          <div className="h-4 bg-slate-800/50 rounded w-1/2 shimmer"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-slate-800/30 rounded-xl overflow-hidden border border-slate-700/50"
            >
              {/* Image Placeholder */}
              <div className="h-40 bg-slate-700/50 shimmer"></div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <div className="h-5 bg-slate-700/50 rounded shimmer"></div>
                  <div className="h-5 bg-slate-700/50 rounded w-3/4 shimmer"></div>
                </div>

                {/* Instructor Skeleton */}
                <div className="h-4 bg-slate-700/50 rounded w-2/3 shimmer"></div>

                {/* Duration & Lessons Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="h-4 bg-slate-700/50 rounded w-20 shimmer"></div>
                  <div className="h-4 bg-slate-700/50 rounded w-24 shimmer"></div>
                </div>

                {/* Rating Skeleton */}
                <div className="h-4 bg-slate-700/50 rounded w-32 shimmer"></div>

                {/* Price & Button Skeleton */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-700/50">
                  <div className="h-6 bg-slate-700/50 rounded w-20 shimmer"></div>
                  <div className="h-9 bg-blue-600/30 rounded-lg w-28 shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
