import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useProfile } from "../hooks/useProfile";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import FormInput from "@/shared/ui/FormInput";

const PasswordSection = ({ isEditing, toggleEdit }) => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        clearAuth();
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
      className="bg-surface border border-border rounded-[14px] p-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormInput
          label="Old Password"
          name="oldPassword"
          type="password"
          register={register}
          validation={{
            required: "Old Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          error={errors.oldPassword}
          disabled={!isEditing}
          placeholder="••••••••"
          showPasswordToggle
          isPasswordVisible={showOldPassword}
          onPasswordToggle={() => setShowOldPassword((v) => !v)}
        />

        <FormInput
          label="New Password"
          name="newPassword"
          type="password"
          register={register}
          validation={{
            required: "New Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          error={errors.newPassword}
          disabled={!isEditing}
          placeholder="••••••••"
          showPasswordToggle
          isPasswordVisible={showPassword}
          onPasswordToggle={() => setShowPassword((v) => !v)}
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          register={register}
          validation={{
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          }}
          error={errors.confirmPassword}
          disabled={!isEditing}
          placeholder="••••••••"
          showPasswordToggle
          isPasswordVisible={showConfirmPassword}
          onPasswordToggle={() => setShowConfirmPassword((v) => !v)}
        />
      </div>

      <button
        type="submit"
        disabled={!isEditing || updatePasswordMutation.isPending}
        className="bg-gold hover:opacity-90 text-bg font-semibold px-4 py-2 rounded-lg disabled:opacity-60 mt-4 transition-opacity"
      >
        {updatePasswordMutation.isPending ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default PasswordSection;
