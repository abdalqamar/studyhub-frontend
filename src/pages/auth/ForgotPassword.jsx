import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertCircle, Lock } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import LoaderButton from "../../components/ui/LoaderButton";
import InputField from "../../components/ui/InputField";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { forgotPasswordMutation } = useAuth();

  const handleSubmit = async (e) => {
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
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to send reset link");
    }
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-6 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-5xl font-bold text-cyan-400">Reset Password</h1>
            <p className="text-slate-400 text-lg">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-900/40 backdrop-blur border border-slate-800/50 rounded-3xl p-8 space-y-6 shadow-xl">
            {/* Success Message */}
            {message && (
              <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/10 flex items-start gap-3 animate-in fade-in">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-300">
                    {message}
                  </p>
                  <p className="text-xs text-green-400/70 mt-1">
                    Check your spam folder if you don't see it
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <InputField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  error={error}
                />
              </div>

              {/* Send Button */}

              <LoaderButton
                text="Send Reset Link"
                loadingText="Sending..."
                loading={forgotPasswordMutation.isPending}
                type="submit"
              />

              {/* Back Button */}
              <button
                type="button"
                onClick={handleNavigate}
                disabled={forgotPasswordMutation.isPending}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-800/50 text-slate-300 hover:text-slate-100 hover:border-slate-700 hover:bg-slate-900/50 transition disabled:opacity-30 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Login
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800/50"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-slate-900/40 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Important
                </span>
              </div>
            </div>

            {/* Information List */}
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold text-lg leading-none mt-0.5">
                  •
                </span>
                <span>
                  Reset link expires in{" "}
                  <span className="text-slate-200 font-medium">5 minutes</span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">
                  •
                </span>
                <span>
                  Check{" "}
                  <span className="text-slate-200 font-medium">
                    spam folder
                  </span>{" "}
                  if not received
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 font-bold text-lg leading-none mt-0.5">
                  •
                </span>
                <span>
                  You'll be{" "}
                  <span className="text-slate-200 font-medium">logged out</span>{" "}
                  on all devices
                </span>
              </div>
            </div>
          </div>

          {/* Support Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Still having issues?{" "}
              <button className="text-cyan-400 hover:text-blue-400 font-semibold transition">
                Contact support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
