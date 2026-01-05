import { Star, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import LoaderButton from "./ui/LoaderButton";
import { errorToast, successToast } from "../utils/toastUtils";

const ReviewModal = ({ setShowReviewModal, courseId, setIsSidebarOpen }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  const rating = watch("rating");
  const reviewText = watch("review");

  // Reset form when opened
  useEffect(() => {
    reset({ rating: 0, review: "" });
  }, []);

  // Submit Handler
  const onSubmit = async (data) => {
    console.log(data);
    console.log(courseId);
    try {
      //   await createRating({
      //     courseId,
      //     rating: data.rating,
      //     review: data.review,
      //   });

      // Close modal
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setShowReviewModal(false);
      setIsSidebarOpen(false);
      successToast("Review submited");
      // Reset modal
      reset();
    } catch (err) {
      errorToast("Review submit failed", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100">Add Review</h2>
          <button
            onClick={() => setShowReviewModal(false)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-slate-100 mb-3">
              How would you rate this course?
            </label>

            <div className="flex gap-3 text-4xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue("rating", star)}
                  className={`transition-all transform hover:scale-110 ${
                    star <= rating ? "text-yellow-400" : "text-slate-600"
                  }`}
                >
                  <Star
                    size={32}
                    fill={star <= rating ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>

            {errors.rating && (
              <p className="text-red-400 text-sm mt-2">Please give a rating.</p>
            )}
          </div>

          {/*  Review Text */}
          <div>
            <label className="block text-sm font-semibold text-slate-100 mb-3">
              Share your feedback
            </label>

            <textarea
              {...register("review", { required: true })}
              placeholder="Tell us what you think about this course..."
              rows="5"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 resize-none"
            />

            {errors.review && (
              <p className="text-red-400 text-sm mt-1">
                Please enter a review.
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowReviewModal(false)}
              className="flex-1 py-3 px-4 text-blue-400 hover:text-blue-300 border border-blue-500/30  hover:border-blue-400/40 bg-slate-800 hover:bg-slate-800/80 font-semibold rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
            <LoaderButton
              text="Submit Review"
              loadingText="Submitting..."
              loading={""}
              disabled={rating === 0 || !reviewText.trim()}
              type="submit"
              className={`flex-1 py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed `}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
