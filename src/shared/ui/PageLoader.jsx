const PageLoader = () => {
  return (
    <div className="bg-bg min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-3">
          <div className="h-8 w-1/3 rounded-lg shimmer"></div>
          <div className="h-4 w-1/2 rounded shimmer"></div>
        </div>

        {/* Grid Skeleton — mirrors the real course-card layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-surface rounded-xl overflow-hidden border border-border"
            >
              {/* Thumbnail — real 16:9 ratio, matches ModulesGrid cards */}
              <div className="aspect-video shimmer"></div>

              <div className="p-4 space-y-3">
                {/* Category tag line */}
                <div className="h-3 w-1/3 rounded shimmer"></div>

                {/* Title — two lines */}
                <div className="space-y-2">
                  <div className="h-4 rounded shimmer"></div>
                  <div className="h-4 w-3/4 rounded shimmer"></div>
                </div>

                {/* Instructor row */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-5 h-5 rounded-full shimmer flex-shrink-0"></div>
                  <div className="h-3 w-2/3 rounded shimmer"></div>
                </div>

                {/* Duration/rating footer */}
                <div className="flex items-center justify-between pt-3 mt-1 border-t border-border">
                  <div className="h-3 w-20 rounded shimmer"></div>
                  <div className="h-3 w-10 rounded shimmer"></div>
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
