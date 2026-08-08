import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { z } from "zod";
import LoaderButton from "@/shared/ui/LoaderButton";
import AuthCardShell from "@/shared/components/AuthCardShell";
import PasswordStrengthMeter, {
  calcPasswordStrength,
} from "@/shared/components/PasswordStrengthMeter";

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tokenValid, setTokenValid] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError("Invalid or missing reset token");
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "newPassword")
      setPasswordStrength(calcPasswordStrength(value));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    if (error) setError("");
  };

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setFieldErrors({});

    if (!token) {
      setError("Invalid reset token");
      setLoading(false);
      return;
    }

    try {
      passwordSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          errors[issue.path[0] as string] = issue.message;
        });
        setFieldErrors(errors);
        setLoading(false);
        return;
      }
    }

    try {
      const { data } = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        {
          newPassword: formData.newPassword,
          confirmNewPassword: formData.confirmNewPassword,
        }
      );

      if (data.success) {
        setMessage("Password reset successfully! Redirecting to login...");
        redirectTimeoutRef.current = setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(data.message || "Failed to reset password");
        if (
          data.message?.includes("expired") ||
          data.message?.includes("Invalid")
        )
          setTokenValid(false);
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const backendMessage = error?.response?.data?.message;
      setError(
        backendMessage ||
          "Network error. Please check your connection and try again."
      );
      if (
        backendMessage?.includes("expired") ||
        backendMessage?.includes("Invalid")
      )
        setTokenValid(false);
    }
  };

  if (!tokenValid) {
    return (
      <AuthCardShell>
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full border border-red-500/40 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
        </div>
        <h2 className="font-['Space_Grotesk'] font-bold text-2xl text-white text-center mb-1.5">
          Invalid Reset Link
        </h2>
        <p className="text-slate-400 text-sm text-center mb-6">
          This link has expired or is invalid
        </p>
        <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">
            {error ||
              "This reset link is invalid or has expired. Please request a new password reset."}
          </p>
        </div>
        <Link
          to="/forgot-password"
          className="w-full block text-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/25 transition-all mb-4"
        >
          Request New Reset Link
        </Link>
        <div className="text-center">
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </AuthCardShell>
    );
  }

  return (
    <AuthCardShell tall>
      <div className="text-center mb-7">
        <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-cyan-400">
          Security
        </span>
        <h2 className="font-['Space_Grotesk'] font-bold text-2xl text-white mt-2 mb-1.5">
          Set a new password.
        </h2>
        <p className="text-slate-400 text-sm">Enter your new password below</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="newPassword"
            className="block font-['JetBrains_Mono'] text-[10.5px] tracking-wide uppercase text-slate-400 mb-2"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              required
              value={formData.newPassword}
              onChange={handleChange}
              minLength={6}
              className="w-full px-3.5 py-2.5 pr-11 text-sm bg-slate-900/40 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 transition-all"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
              tabIndex={-1}
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <PasswordStrengthMeter
            password={formData.newPassword}
            strength={passwordStrength}
          />
          {fieldErrors.newPassword && (
            <div className="mt-2 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-400">{fieldErrors.newPassword}</p>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmNewPassword"
            className="block font-['JetBrains_Mono'] text-[10.5px] tracking-wide uppercase text-slate-400 mb-2"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmNewPassword}
              onChange={handleChange}
              minLength={6}
              className="w-full px-3.5 py-2.5 pr-11 text-sm bg-slate-900/40 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 transition-all"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {formData.confirmNewPassword && !fieldErrors.confirmNewPassword && (
            <div className="mt-2 flex items-center gap-1.5">
              {formData.newPassword === formData.confirmNewPassword ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">
                    Passwords match
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-xs text-red-400 font-medium">
                    Passwords do not match
                  </span>
                </>
              )}
            </div>
          )}
          {fieldErrors.confirmNewPassword && (
            <div className="mt-2 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-400">
                {fieldErrors.confirmNewPassword}
              </p>
            </div>
          )}
        </div>

        {message && (
          <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-300">{message}</p>
          </div>
        )}
        {error && (
          <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <LoaderButton
          text="Reset Password"
          loadingText="Resetting password..."
          loading={loading}
          type="submit"
        />

        <div className="text-center">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-700/50 bg-slate-900/30 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all font-medium text-sm"
          >
            ← Back to Login
          </Link>
        </div>
      </form>

      <div className="mt-7 pt-6 border-t border-slate-700/50 flex items-center justify-center gap-2">
        <Lock className="w-3.5 h-3.5 text-slate-500" />
        <span className="font-['JetBrains_Mono'] text-[10.5px] tracking-wide uppercase text-slate-500">
          You'll be logged out of all devices
        </span>
      </div>
    </AuthCardShell>
  );
};

export default ResetPassword;
