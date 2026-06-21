import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "otp-input-react";
import { Link, useNavigate } from "react-router-dom";
import LoaderButton from "../../components/ui/LoaderButton";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authServices";
import { resetSignupState } from "../../features/auth/authSlice";
import { errorToast, successToast } from "../../utils/toastUtils";

function RegMark({ className }) {
  return (
    <span className={`absolute w-4 h-4 pointer-events-none ${className}`}>
      <span className="absolute top-1/2 left-0 w-4 h-px bg-cyan-400/70 -translate-y-1/2" />
      <span className="absolute left-1/2 top-0 w-px h-4 bg-cyan-400/70 -translate-x-1/2" />
    </span>
  );
}

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

  const resendOtpMutation = useMutation({
    mutationFn: authService.sendOtp,
  });

  const handleVerify = () => {
    if (!signupState) {
      errorToast("Session expired. Please register again.");
      return navigate("/register");
    }

    if (!otp || otp.length < 6) {
      errorToast("Please enter a valid 6-digit OTP");
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
        errorToast(err?.response?.data?.message || "Invalid OTP");
      },
    });
  };

  const handleResend = () => {
    if (!signupState) {
      errorToast("Session expired. Please register again.");
      return navigate("/register");
    }

    resendOtpMutation.mutate(
      { email: signupState.email },
      {
        onSuccess: () => {
          successToast("OTP resent successfully!");
          setTimer(52);
          setCanResend(false);
        },
        onError: (err) => {
          errorToast(err?.response?.data?.message || "Failed to resend OTP");
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
    <div
      className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative overflow-hidden pt-32 pb-16 px-6 lg:px-8"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px)",
      }}
    >
      <div className="relative border border-slate-700/50 rounded-2xl p-6 sm:p-8 bg-slate-900/30 w-full max-w-[450px] mx-auto text-center flex flex-col justify-center gap-y-5">
        <RegMark className="-top-2 -left-2" />
        <RegMark className="-top-2 -right-2" />
        <RegMark className="-bottom-2 -left-2" />
        <RegMark className="-bottom-2 -right-2" />

        <div>
          <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-cyan-400">
            Verification
          </span>
          <h1 className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl text-white mt-2">
            Confirm your email
          </h1>
        </div>

        <p className="text-slate-400 text-sm sm:text-base">
          Enter the 6-digit code sent to{" "}
          <span className="text-white font-medium">{signupState?.email}</span>
        </p>

        <div className="flex justify-center">
          <OTPInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            otpType="number"
            autoFocus
            inputClassName="border border-slate-700/50 bg-slate-900/40 text-white rounded-lg w-8 h-10 sm:w-10 sm:h-12 text-center text-lg font-['JetBrains_Mono'] focus:border-cyan-400/60 focus:outline-none transition-colors"
          />
        </div>

        <div className="text-slate-400 text-sm font-['JetBrains_Mono']">
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={resendOtpMutation.isPending}
              className="text-cyan-400 hover:text-cyan-300 font-medium transition disabled:opacity-50"
            >
              {resendOtpMutation.isPending ? "Resending..." : "Resend OTP"}
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

        <Link
          to="/register"
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Back to registration
        </Link>
      </div>
    </div>
  );
};

export default VerifyOtp;
