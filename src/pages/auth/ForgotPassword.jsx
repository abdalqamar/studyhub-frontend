import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Reset Password</h1>
          <p className="text-slate-400 text-base">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700">
          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 rounded-xl border border-green-800/50 bg-green-900/30 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-200">{message}</p>
                <p className="text-xs text-green-300/70 mt-1">
                  Check your spam folder if you don't see it
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
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
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-700 bg-slate-700/30 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-700/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Important Information
              </span>
            </div>
          </div>

          {/* Information List */}
          <div className="space-y-2.5 text-sm text-slate-400">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
              <p>
                Reset link expires in{" "}
                <span className="text-white font-semibold">5 minutes</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
              <p>
                Check{" "}
                <span className="text-white font-semibold">spam folder</span> if
                not received
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <p>
                You'll be{" "}
                <span className="text-white font-semibold">logged out</span> on
                all devices after reset
              </p>
            </div>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Still having issues?{" "}
            <button
              type="button"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
