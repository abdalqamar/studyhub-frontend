import { Loader, Lock, Share } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { errorToast } from "@/shared/utils/toastUtils";
import { loadRazorpayScript } from "@/shared/utils/loadRazorpayScript";
import ShareModal from "./ShareModal";
import type { CourseDetail, UserRole } from "@/types";
import type { RazorpayOrder, RazorpaySuccessResponse } from "@/types";

interface CourseUser {
  email?: string;
  role?: UserRole;
}

interface CoursePurchaseCardProps {
  course: CourseDetail;
  user: CourseUser | null | undefined;
}

const CoursePurchaseCard = ({ course, user }: CoursePurchaseCardProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const navigate = useNavigate();

  const createOrderMutation = useMutation<RazorpayOrder, Error>({
    mutationFn: async () => {
      await loadRazorpayScript();
      const res = await axiosInstance.post("/payment/order", {
        courseIds: [course._id],
      });
      return res.data.order;
    },
    onSuccess: (order) => {
      openRazorpay(order);
    },
    onError: (err: any) => {
      errorToast(
        err?.response?.data?.message ||
          "Something went wrong, please try again later"
      );
    },
  });

  const originalPrice = Number(course?.price) || 5788;
  const discountedPrice = 2069; // TODO: course.discountedPrice backend se aana chahiye
  const discountPercentage =
    originalPrice > 0
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  const openRazorpay = (order: RazorpayOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "StudyHub",
      description: "Course Purchase",
      order_id: order.id,

      handler: (_response: RazorpaySuccessResponse) => {
        navigate("/payment-processing", { state: { courseId: course._id } });
      },

      prefill: { email: user?.email },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", () => {
      errorToast("Payment fail ho gaya, dobara try karein");
      navigate(`/course/${course._id}`);
    });

    rzp.open();
  };

  return (
    <>
      <div className="bg-surface border border-border rounded-2xl p-5 sticky top-6">
        <img
          src={course?.thumbnail}
          loading="lazy"
          alt={course?.title}
          className="w-full h-44 object-cover rounded-xl border border-border-strong mb-5"
        />

        <div className="mb-5">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="font-display text-2xl font-bold text-gold">
              ₹{discountedPrice.toLocaleString("en-IN")}
            </span>

            {originalPrice > discountedPrice && (
              <>
                <span className="text-sm text-text-3 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="bg-teal-soft text-teal px-2 py-0.5 rounded-full text-[11px] font-mono font-medium">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          {!user ? (
            <>
              <Link
                to="/login"
                className="w-full bg-gold hover:bg-gold-dim text-bg font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 mb-2.5 flex items-center justify-center"
              >
                Login to buy
              </Link>
              <p className="text-text-3 text-xs text-center">
                Login to purchase this course
              </p>
            </>
          ) : user.role === "student" ? (
            <button
              onClick={() => createOrderMutation.mutate()}
              disabled={createOrderMutation.isPending}
              className="w-full bg-gold hover:bg-gold-dim text-bg font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {createOrderMutation.isPending ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Buy now"
              )}
            </button>
          ) : (
            <div className="w-full bg-surface-2 border border-border-strong text-text-3 font-medium py-2.5 px-4 rounded-xl text-center cursor-not-allowed">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Lock className="w-4 h-4" />
                {user?.role === "instructor"
                  ? "Instructors cannot purchase courses"
                  : "Admins cannot purchase courses"}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-5">
          <h3 className="text-[13.5px] font-semibold text-text-1 mb-3">
            This course includes:
          </h3>

          <ul className="space-y-2.5">
            {[
              `${course?.totalLectures || 146} lectures`,
              course?.totalDuration || "21hr 48min",
              "Access on mobile and desktop (2 years)",
              "Certificate of completion",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-text-2 text-sm"
              >
                <div className="w-4 h-4 bg-teal-soft rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 bg-teal rounded-full" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border pt-5 mt-5">
          <button
            onClick={() => setShowShareModal(true)}
            className="w-full bg-surface-2 hover:bg-surface-raised text-text-2 hover:text-text-1 font-medium py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <Share className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareUrl={window.location.href}
        shareTitle={`Check out this amazing course: ${course?.title}`}
      />
    </>
  );
};

export default CoursePurchaseCard;
