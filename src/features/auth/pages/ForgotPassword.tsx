import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import LoaderButton from "@/shared/ui/LoaderButton";
import InputField from "@/shared/ui/InputField";
import { AxiosError } from "axios";
import { ApiErrorData } from "@/types";

interface RegMarkProps {
  className?: string;
}

function RegMark({ className }: RegMarkProps) {
  return (
    <span className={`absolute w-4 h-4 pointer-events-none ${className}`}>
      <span className="absolute top-1/2 left-0 w-4 h-px bg-gold/70 -translate-y-1/2" />
      <span className="absolute left-1/2 top-0 w-px h-4 bg-gold/70 -translate-x-1/2" />
    </span>
  );
}

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { forgotPasswordMutation } = useAuth();

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      return setError("Please enter your email address");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError("Please enter a valid email address");
    }

    try {
      const res = await forgotPasswordMutation.mutateAsync(email);
      setMessage(res?.message || "Reset link sent!");
      setEmail("");
    } catch (err) {
      const error = err as AxiosError<ApiErrorData>;
      setError(error?.response?.data?.message || "Failed to send reset link");
    }
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-bg flex items-center justify-center py-20 px-4"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px)",
      }}
    >
      <div className="relative z-10 w-full max-w-md">
        {/* Form Card */}
        <div className="relative border border-border/50 rounded-2xl bg-surface/30 p-8">
          <RegMark className="-top-2 -left-2" />
          <RegMark className="-top-2 -right-2" />
          <RegMark className="-bottom-2 -left-2" />
          <RegMark className="-bottom-2 -right-2" />

          {/* Header */}
          <div className="text-center mb-7">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-gold">
              Account recovery
            </span>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mt-2 mb-1.5">
              Reset password
            </h1>
            <p className="text-text-2 text-sm">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-5 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-emerald-300">
                  {message}
                </p>
                <p className="text-xs text-emerald-400/70 mt-1">
                  Check your spam folder if you don't see it
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-5 p-4 rounded-xl border border-red-500/30 bg-red-500/5 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <LoaderButton
              text="Send Reset Link"
              loadingText="Sending..."
              loading={forgotPasswordMutation.isPending}
              type="submit"
            />

            <button
              type="button"
              onClick={handleNavigate}
              disabled={forgotPasswordMutation.isPending}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border/50 bg-surface/30 text-text-2 hover:text-white hover:border-gold/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-surface/30 font-mono text-[10px] text-text-3 uppercase tracking-[0.1em]">
                Important Information
              </span>
            </div>
          </div>

          <div className="space-y-2.5 text-sm text-text-2">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-sm bg-gold mt-2 flex-shrink-0" />
              <p>
                Reset link expires in
                <span className="text-white font-medium">5 minutes</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-sm bg-indigo-400 mt-2 flex-shrink-0" />
              <p>
                Check{" "}
                <span className="text-white font-medium">spam folder</span> if
                not received
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-sm bg-amber-400 mt-2 flex-shrink-0" />
              <p>
                You'll be
                <span className="text-white font-medium">logged out</span> on
                all devices after reset
              </p>
            </div>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-6 text-center">
          <p className="text-text-2 text-sm">
            Still having issues?
            <Link
              to="/contact"
              className="text-gold hover:text-gold font-semibold transition-colors"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
