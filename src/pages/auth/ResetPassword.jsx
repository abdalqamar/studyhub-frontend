import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle, Key } from "lucide-react";
import { z } from "zod";

// Zod validation schema
const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
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
  const [fieldErrors, setFieldErrors] = useState({});
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

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "newPassword") {
      checkPasswordStrength(value);
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
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

    // Zod validation
    try {
      passwordSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = {};
        err.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
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
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(data.message || "Failed to reset password");
        if (
          data.message?.includes("expired") ||
          data.message?.includes("Invalid")
        ) {
          setTokenValid(false);
        }
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-red-600 to-red-700 p-4 rounded-2xl shadow-2xl">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Card */}
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700">
            <h2 className="text-3xl font-bold text-white text-center mb-2">
              Invalid Reset Link
            </h2>
            <p className="text-slate-400 text-center mb-6">
              This link has expired or is invalid
            </p>

            {/* Error Message */}
            <div className="bg-red-900/30 border border-red-800/50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">
                  {error ||
                    "This reset link is invalid or has expired. Please request a new password reset."}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <Link
              to="/forgot-password"
              className="w-full block text-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-[1.02] transition-all shadow-lg mb-4"
            >
              Request New Reset Link
            </Link>

            <div className="text-center">
              <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors"
              >
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-28">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Set New Password
            </h2>
            <p className="text-slate-400">Enter your new password below</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold text-slate-300 mb-2"
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
                  className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Enter new password"
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-400">
                    Password Strength:
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                      passwordStrength <= 1
                        ? "text-red-400 bg-red-900/30"
                        : passwordStrength === 2
                          ? "text-yellow-400 bg-yellow-900/30"
                          : passwordStrength === 3
                            ? "text-blue-400 bg-blue-900/30"
                            : "text-green-400 bg-green-900/30"
                    }`}
                  >
                    {getStrengthText()}
                  </span>
                </div>
              )}

              {/* Field Error */}
              {fieldErrors.newPassword && (
                <div className="mt-2 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-400">
                    {fieldErrors.newPassword}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-semibold text-slate-300 mb-2"
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
                  className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Confirm new password"
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {formData.confirmNewPassword &&
                !fieldErrors.confirmNewPassword && (
                  <div className="mt-2 flex items-center gap-2">
                    {formData.newPassword === formData.confirmNewPassword ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400 font-medium">
                          Passwords match
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-xs text-red-400 font-medium">
                          Passwords do not match
                        </span>
                      </>
                    )}
                  </div>
                )}

              {/* Field Error */}
              {fieldErrors.confirmNewPassword && (
                <div className="mt-2 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-400">
                    {fieldErrors.confirmNewPassword}
                  </p>
                </div>
              )}
            </div>

            {/* Success Message */}
            {message && (
              <div className="bg-green-900/30 border border-green-800/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-200">{message}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-800/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Resetting password...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-700 bg-slate-700/30 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-700/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                ← Back to Login
              </Link>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-semibold text-slate-400">
                Security Notice
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                <p>
                  You will be logged out of all devices after password reset
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                <p>Use a strong password with letters, numbers, and symbols</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                <p>You'll be automatically redirected to login after success</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
