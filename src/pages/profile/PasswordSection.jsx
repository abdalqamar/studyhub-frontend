import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useProfile } from "../../hooks/useProfile";
import { errorToast, successToast } from "../../utils/toastUtils";
import { clearAuth } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const PasswordSection = ({ isEditing, toggleEdit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const { clearProfile } = useProfile();

  const { updatePasswordMutation } = useProfile();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("newPassword");

  const onSubmit = (data) => {
    updatePasswordMutation.mutate(data, {
      onSuccess: () => {
        successToast("Password updated successfully please login again");
        reset();
        toggleEdit?.();
        dispatch(clearAuth());
        clearProfile();
      },
      onError: (error) => {
        console.log(error);
        errorToast(error?.response?.data?.message || "Update failed");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-slate-900 border border-slate-700 rounded-xl p-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Old Password */}
        <div className="relative flex-1">
          <label className="block text-sm font-semibold text-slate-300 mb-1">
            Old Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type={showOldPassword ? "text" : "password"}
              className="w-full pl-12 pr-12 py-3 bg-surface-bg border border-slate-700 rounded-xl disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-white"
              placeholder="••••••••"
              disabled={!isEditing}
              {...register("oldPassword", {
                required: "Old Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              disabled={!isEditing}
            >
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-400 text-sm mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="relative flex-1">
          <label className="block text-sm font-semibold text-slate-300 mb-1">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-12 pr-12 py-3 bg-surface-bg border border-slate-700 rounded-xl disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-white"
              placeholder="••••••••"
              disabled={!isEditing}
              {...register("newPassword", {
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              disabled={!isEditing}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-400 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative flex-1">
          <label className="block text-sm font-semibold text-slate-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full pl-12 pr-12 py-3 bg-surface-bg border border-slate-700 rounded-xl disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-white"
              placeholder="••••••••"
              disabled={!isEditing}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isEditing || updatePasswordMutation.isPending}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md disabled:opacity-60 mt-4"
      >
        {updatePasswordMutation.isPending ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default PasswordSection;
