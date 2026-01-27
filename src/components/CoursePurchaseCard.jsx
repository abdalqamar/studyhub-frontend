import { Loader, Lock, Share } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { errorToast } from "../utils/toastUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ShareModal from "./ShareModal";
const CoursePurchaseCard = ({ course, user }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/payment/order", {
        courseIds: [course._id],
      });
      return res.data.order;
    },
    onSuccess: (order) => {
      openRazorpay(order);
    },
    onError: (err) => {
      errorToast(err?.response?.data?.message || "Failed to start payment");
    },
  });

  const originalPrice = course?.price || 5788;
  const discountedPrice = course?.discountedPrice || 2069;
  const discountPercentage = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  const openRazorpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "StudyHub",
      description: "Course Purchase",
      order_id: order.id,

      handler: async () => {
        queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
        navigate("/student/my-courses");
      },

      prefill: { email: user?.email },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", () => {
      navigate(`/course/${course._id}`);
    });

    rzp.open();
  };

  return (
    <>
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6 sticky top-6">
        {/* Thumbnail */}
        <div className="mb-6">
          <img
            src={course?.thumbnail}
            loading="lazy"
            alt={course?.title}
            className="w-full h-48 object-cover rounded-xl border border-slate-600/50"
          />
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-bold text-white">
              ₹{course?.price}
            </span>

            {originalPrice > discountedPrice && (
              <>
                <span className="text-xl text-slate-400 line-through">
                  ₹{originalPrice}
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-sm font-medium">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          {!user ? (
            <>
              <Link
                to="/login"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] mb-3 flex items-center justify-center"
              >
                Click here to Login and Buy
              </Link>
              <p className="text-slate-400 text-sm text-center">
                Login to purchase this course
              </p>
            </>
          ) : user.role === "student" ? (
            <button
              onClick={() => createOrderMutation.mutate()}
              disabled={createOrderMutation.isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600  text-white font-semibold py-3 px-4 rounded-xl flex  items-center justify-center"
            >
              {createOrderMutation.isPending ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                " Buy Now"
              )}
            </button>
          ) : (
            <div className="w-full bg-slate-700/30 border border-slate-600/50 text-slate-500 font-medium py-3 px-4 rounded-xl text-center cursor-not-allowed">
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-5 h-5" />
                {user?.role === "instructor"
                  ? "Instructors cannot purchase courses"
                  : "Admins cannot purchase courses"}
              </div>
            </div>
          )}
        </div>

        {/* Course Features */}
        <div className="border-t border-slate-700/50 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            This course includes:
          </h3>

          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-slate-300">
              <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              </div>
              <span>{course?.totalLectures || 146} lectures</span>
            </li>

            <li className="flex items-center gap-3 text-slate-300">
              <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              </div>
              <span>{course?.totalDuration || "21hr 48min"}</span>
            </li>

            <li className="flex items-center gap-3 text-slate-300">
              <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              </div>
              <span>Access on mobile and desktop (2 Years)</span>
            </li>

            <li className="flex items-center gap-3 text-slate-300">
              <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              </div>
              <span>Certificate of completion</span>
            </li>
          </ul>
        </div>

        {/* Share Button */}
        <div className="border-t border-slate-700/50 pt-6 mt-6">
          <button
            onClick={() => setShowShareModal(true)}
            className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Share className="w-5 h-5" />
            Share
          </button>
        </div>
      </div>

      {/* Share Modal */}
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
