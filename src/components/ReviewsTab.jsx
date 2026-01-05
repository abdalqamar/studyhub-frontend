// components/tabs/ReviewsTab.jsx
import React from "react";
import { Star } from "lucide-react";

const ReviewsTab = ({ courseData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-orange-400 rounded-full"></div>
            Student Reviews
          </h2>
          <div className="flex items-center gap-4 bg-slate-700/50 px-4 py-2 rounded-full">
            <Star className="text-yellow-400 fill-yellow-400" size={24} />
            <span className="text-2xl font-bold text-white">
              {courseData?.averageRating || 0}
            </span>
            <span className="text-slate-400">out of 5</span>
          </div>
        </div>

        {courseData?.reviews && courseData.reviews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courseData.reviews.map((review, index) => (
              <div
                key={review._id || index}
                className="bg-slate-700/20 rounded-xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={review.user?.profileImage}
                    alt={review.user?.name || "User"}
                    className="w-10 h-10 rounded-full border border-slate-600 object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">
                      {review.user?.name || "Anonymous"}
                    </h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.round(review.rating || 0)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-slate-600"
                          }
                        />
                      ))}
                      <span className="text-slate-400 text-xs ml-1">
                        {review.rating?.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {review.review || "No comment provided."}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-slate-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No reviews yet
            </h3>
            <p className="text-slate-500">
              Be the first to review this course!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;
