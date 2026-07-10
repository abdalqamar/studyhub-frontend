import renderStars from "@/shared/ui/renderStars";
import { Star } from "lucide-react";

const ReviewsTab = ({ courseData }) => {
  const getTimeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    return `${days} days ago`;
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="font-display text-xl font-bold text-text-1 flex items-center gap-3">
          <div className="w-1 h-6 bg-gold rounded-full" />
          Student reviews
        </h2>

        <div className="flex items-center gap-2 bg-surface-2 border border-border px-3.5 py-1.5 rounded-full">
          <Star size={16} className="text-gold fill-gold" />
          <span className="font-mono font-bold text-text-1 text-base">
            {courseData?.averageRating || 0}
          </span>
          <span className="text-text-3 text-xs">/ 5</span>
        </div>
      </div>

      {courseData?.reviews && courseData.reviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {courseData.reviews.map((review, index) => (
            <div
              key={review._id || index}
              className="bg-surface-2 border border-border-strong rounded-xl p-4 hover:border-gold-dim transition-colors duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={review.user?.profileImage}
                  alt={review.user?.name || "User"}
                  className="w-9 h-9 rounded-full border border-border-strong object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-text-1 font-medium text-[13.5px] truncate">
                      {review.user?.name || "Anonymous"}
                    </h4>
                    <span className="text-[10.5px] font-mono text-text-3 whitespace-nowrap flex-shrink-0">
                      {getTimeAgo(review.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex items-center gap-0.5 text-gold">
                      {renderStars(review.rating || 0)}
                    </div>
                    <span className="text-text-3 text-[11px] font-mono">
                      {review.rating?.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-text-2 text-sm leading-relaxed">
                {review.review || "No comment provided."}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-14 h-14 bg-surface-2 border border-border rounded-full flex items-center justify-center mx-auto mb-4">
            <Star size={20} className="text-text-3" />
          </div>
          <h3 className="text-base font-medium text-text-2 mb-1">
            No reviews yet
          </h3>
          <p className="text-text-3 text-sm">
            Be the first to review this course!
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
