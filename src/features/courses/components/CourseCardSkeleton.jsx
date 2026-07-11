// CourseCardSkeleton.jsx
const CourseCardSkeleton = () => {
  return (
    <div className="bg-surface-2 rounded-xl overflow-hidden border border-border">
      <div className="aspect-video shimmer" />

      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 rounded shimmer" />

        <div className="space-y-2">
          <div className="h-4 rounded shimmer" />
          <div className="h-4 w-3/4 rounded shimmer" />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <div className="w-5 h-5 rounded-full shimmer flex-shrink-0" />
          <div className="h-3 w-2/3 rounded shimmer" />
        </div>

        <div className="flex items-center justify-between pt-3 mt-1 border-t border-border">
          <div className="h-3 w-20 rounded shimmer" />
          <div className="h-3 w-10 rounded shimmer" />
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
