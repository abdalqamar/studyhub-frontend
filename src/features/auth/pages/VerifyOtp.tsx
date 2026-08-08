import { useEffect, useState } from "react";
import OTPInput from "otp-input-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import LoaderButton from "@/shared/ui/LoaderButton";
import { AuthResponse, authService } from "../services/authServices";
import { useAuthStore } from "../store/auth.store";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import { AxiosError } from "axios";
import { ApiErrorData } from "@/types";

interface RegMarkProps {
  className: string;
}

function RegMark({ className }: RegMarkProps) {
  return (
    <span className={`absolute w-4 h-4 pointer-events-none ${className}`}>
      <span className="absolute top-1/2 left-0 w-4 h-px bg-gold/70 -translate-y-1/2" />
      <span className="absolute left-1/2 top-0 w-px h-4 bg-gold/70 -translate-x-1/2" />
    </span>
  );
}

const VerifyOtp = () => {
  const signupState = useAuthStore((state) => state.signupState);
  const resetSignupState = useAuthStore((state) => state.resetSignupState);
  const [timer, setTimer] = useState(52);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const registerMutation = useMutation<
    AuthResponse,
    AxiosError<ApiErrorData>,
    { email: string; otp: string }
  >({
    mutationFn: authService.register,
  });
  const resendOtpMutation = useMutation<
    { message: string },
    AxiosError<ApiErrorData>,
    { email: string }
  >({
    mutationFn: ({ email }) => authService.sendOtp({ email }),
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

    registerMutation.mutate(
      {
        email: signupState.email,
        otp,
      },
      {
        onSuccess: (res) => {
          successToast(res?.message || "Registration successful!");
          resetSignupState();
          navigate("/login");
        },

        onError: (err) => {
          errorToast(err?.response?.data?.message || "Invalid OTP");
        },
      }
    );
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
      className="min-h-screen flex items-center justify-center bg-bg text-white relative overflow-hidden pt-32 pb-16 px-6 lg:px-8"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px)",
      }}
    >
      <div className="relative border border-border/50 rounded-2xl p-6 sm:p-8 bg-surface/30 w-full max-w-[450px] mx-auto text-center flex flex-col justify-center gap-y-5">
        <RegMark className="-top-2 -left-2" />
        <RegMark className="-top-2 -right-2" />
        <RegMark className="-bottom-2 -left-2" />
        <RegMark className="-bottom-2 -right-2" />

        <div>
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-gold">
            Verification
          </span>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-white mt-2">
            Confirm your email
          </h1>
        </div>

        <p className="text-text-2 text-sm sm:text-base">
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
            inputClassName="border border-border/50 bg-surface/40 text-white rounded-lg w-8 h-10 sm:w-10 sm:h-12 text-center text-lg font-mono focus:border-gold/60 focus:outline-none transition-colors"
          />
        </div>

        <div className="text-text-2 text-sm font-mono">
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={resendOtpMutation.isPending}
              className="text-gold hover:text-gold font-medium transition disabled:opacity-50"
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
          className="text-xs text-text-3 hover:text-text-2 transition-colors"
        >
          ← Back to registration
        </Link>
      </div>
    </div>
  );
};

export default VerifyOtp;
