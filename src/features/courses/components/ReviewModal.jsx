import { Star, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCreateCourseReview } from "../hooks";
import { errorToast } from "@/shared/utils/toastUtils";
import LoaderButton from "@/shared/ui/LoaderButton";

const ReviewModal = ({ setShowReviewModal, courseId, setIsSidebarOpen }) => {
  const { mutate: createReview, isPending } = useCreateCourseReview(courseId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { rating: 0, review: "" },
  });

  const rating = watch("rating");
  const reviewText = watch("review");

  useEffect(() => {
    register("rating", { required: true });
    reset({ rating: 0, review: "" });
  }, [register, reset]);

  const onSubmit = (data) => {
    createReview(
      { rating: data.rating, review: data.review },
      {
        onSuccess: () => {
          setShowReviewModal(false);
          setIsSidebarOpen(false);
          reset();
        },
        onError: (err) => {
          errorToast(err?.response?.data?.message);
          setShowReviewModal(false);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display text-lg font-bold text-text-1">
            Add review
          </h2>
          <button
            onClick={() => setShowReviewModal(false)}
            className="w-8 h-8 flex items-center justify-center border border-border-strong text-text-2 hover:text-text-1 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-1 mb-3">
              How would you rate this course?
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue("rating", star)}
                  className={`transition-transform hover:scale-110 ${star <= rating ? "text-gold" : "text-text-3"}`}
                >
                  <Star
                    size={26}
                    fill={star <= rating ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>

            {errors.rating && (
              <p className="text-danger text-xs mt-2">Please give a rating.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-1 mb-3">
              Share your feedback
            </label>

            <textarea
              {...register("review", { required: true })}
              placeholder="Tell us what you think about this course..."
              rows="5"
              className="w-full px-3.5 py-3 bg-surface-2 border border-border-strong rounded-xl text-text-1 placeholder-text-3 outline-none focus:ring-2 focus:ring-gold transition-all resize-none text-sm"
            />

            {errors.review && (
              <p className="text-danger text-xs mt-1">Please enter a review.</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() => setShowReviewModal(false)}
              className="flex-1 py-2.5 px-4 text-text-1 border border-border-strong hover:border-text-3 bg-surface-2 hover:bg-surface-raised font-medium rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <LoaderButton
              text="Submit review"
              loadingText="Submitting..."
              loading={isPending}
              disabled={rating === 0 || !reviewText.trim() || isPending}
              type="submit"
              className="flex-1 py-2.5 px-4 bg-gold hover:bg-gold-dim text-bg font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
