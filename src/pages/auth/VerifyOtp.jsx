import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoaderButton from "../../components/ui/LoaderButton";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authServices";
import { resetSignupState } from "../../features/auth/authSlice";
import { errorToast, successToast } from "../../utils/toastUtils";

const VerifyOtp = () => {
  const { signupState } = useSelector((state) => state.auth);
  const [timer, setTimer] = useState(52);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: authService.register,
  });

  const handleVerify = () => {
    if (!signupState) {
      toast.error("Session expired. Please register again.");
      return navigate("/register");
    }

    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const userData = {
      ...signupState,
      otp,
    };

    registerMutation.mutate(userData, {
      onSuccess: (res) => {
        successToast(res?.message || "Registration successful!");
        dispatch(resetSignupState());
        navigate("/login");
      },

      onError: (err) => {
        errorToast(err.response?.message || "Invalid OTP");
      },
    });
  };

  // RESEND OTP

  const resendOtpMutation = useMutation({
    mutationFn: authService.sendOtp,
  });

  const handleResend = () => {
    resendOtpMutation.mutate(
      { email: signupState.email },
      {
        onSuccess: (_, vars) => {
          successToast("OTP resent successfully!");
          setTimer(52);
          setCanResend(false);
        },
        onError: (err) => {
          errorToast(err.response?.data?.message || "Failed to resend OTP");
        },
      }
    );
  };

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative overflow-hidden pt-32 pb-16 px-6 lg:px-8">
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl w-full max-w-[450px] mx-auto text-center flex flex-col justify-center gap-y-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          Email Verification
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Enter the 6-digit code that was sent to <b>{signupState?.email}</b>
        </p>

        <div className="flex justify-center">
          <OTPInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            otpType="number"
            autoFocus
            inputClassName="border border-slate-600 bg-slate-900/60 text-white rounded-xl w-8 h-10 sm:w-10 sm:h-12 text-center text-lg focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="text-gray-400 text-sm">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-blue-400 hover:text-blue-300 font-medium transition"
            >
              Resend OTP
            </button>
          ) : (
            <span>Resend in {timer}s</span>
          )}
        </div>

        <LoaderButton
          text="Verify OTP"
          loadingText="Verifying..."
          loading={registerMutation.isPending}
          type="button"
          onClick={handleVerify}
        />
      </div>
    </div>
  );
};

export default VerifyOtp;

// const VerifyOtp = () => {
//   const { signUpData } = useSelector((state) => state.auth);
//   const [timer, setTimer] = useState(52);
//   const [loading, setLoading] = useState(false);
//   const [canResend, setCanResend] = useState(false);
//   const [otp, setOtp] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   console.log(otp);
//   const handleVerify = async () => {
//     const { firstName, lastName, email, password, confirmPassword } =
//       signUpData;

//     try {
//       setLoading(true);
//       const response = await dispatch(
//         registerUser({
//           firstName,
//           lastName,
//           email,
//           password,
//           confirmPassword,
//           otp,
//         })
//       ).unwrap();
//       setLoading(false);
//       toast.success(response.message);
//       navigate("/login");
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.message);
//     }
//   };
//   const handleResend = () => {
//     console.log("");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative overflow-hidden pt-32 pb-16 px-6 lg:px-8">
//       <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl w-full max-w-[450px] mx-auto text-center flex flex-col justify-center gap-y-6">
//         <h1 className="text-xl sm:text-2xl font-semibold text-white">
//           Email Verification
//         </h1>
//         <p className="text-gray-300 text-sm sm:text-base">
//           Enter the 6-digit code that was sent to your .
//         </p>

//         {/* Center OTP boxes */}
//         <div className="flex justify-center">
//           <OTPInput
//             value={otp}
//             onChange={setOtp}
//             OTPLength={6}
//             otpType="number"
//             autoFocus
//             inputClassName="border border-slate-600 bg-slate-900/60 text-white rounded-xl w-8 h-10 sm:w-10 sm:h-12 text-center text-lg focus:border-blue-500 focus:outline-none"
//           />
//         </div>

//         <div className="text-gray-400 text-sm">
//           {canResend ? (
//             <button
//               onClick={handleResend}
//               className="text-blue-400 hover:text-blue-300 font-medium transition"
//             >
//               Resend OTP
//             </button>
//           ) : (
//             <span>Resend in {timer}s</span>
//           )}
//         </div>

//         <LoaderButton
//           text="Verify Otp"
//           loadingText="Verifying..."
//           loading={loading}
//           type="button"
//           onClick={handleVerify}
//         />
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;
