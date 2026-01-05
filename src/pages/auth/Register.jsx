import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupState } from "../../features/auth/authSlice";
import AuthSidebar from "../../components/AuthSidebar";
import LoaderButton from "../../components/ui/LoaderButton";
import InputField from "../../components/ui/InputField";
import { useMutation } from "@tanstack/react-query";
import { errorToast, successToast } from "../../utils/toastUtils";
import { authService } from "../../services/authServices";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/registerSchema";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const otpMutation = useMutation({
    mutationFn: authService.sendOtp,
  });

  //  Submit Handler
  const onSubmit = (data) => {
    otpMutation.mutate(
      { email: data.email },
      {
        onSuccess: (res) => {
          dispatch(setSignupState(data));
          successToast(res?.message || "OTP sent successfully");
          navigate("/verify-otp");
        },
        onError: (error) => {
          console.log(error);
          const msg = error?.response?.data?.message || "Failed to send OTP";

          if (error?.response?.data?.errors) {
            Object.keys(error.response.data.errors).forEach((field) => {
              errors[field] = {
                message: error.response.data.errors[field],
              };
            });
          } else errorToast(msg);
        },
      }
    );
  };

  return (
    <AuthSidebar
      image="https://res.cloudinary.com/du7xquzsm/image/upload/v1763812843/Register_image_mriulk.jpg"
      title="Let the Journey Begin!"
      subtitle="Unlock your learning potential — sign in to access your LMS dashboard."
    >
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Start your learning journey today
        </p>
      </div>

      <div className="flex items-center gap-4 my-6 sm:my-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
        <span className="text-slate-500 text-xs sm:text-sm">OR</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 sm:space-y-6"
      >
        {/* First/Last */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          <InputField
            label="First Name"
            placeholder="John"
            error={errors.firstName?.message}
            {...register("firstName")}
          />

          <InputField
            label="Last Name"
            placeholder="Doe"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

        {/* Email */}
        <InputField
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Passwords */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            showPasswordToggle
            isPasswordVisible={showPassword}
            onPasswordToggle={() => setShowPassword(!showPassword)}
            {...register("password")}
            helpText="Min 8 chars, uppercase & number"
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            showPasswordToggle
            isPasswordVisible={showConfirmPassword}
            onPasswordToggle={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            {...register("confirmPassword")}
          />
        </div>

        <LoaderButton
          text="Create Account"
          loadingText="Sending OTP..."
          loading={otpMutation.isPending}
          type="submit"
        />

        <p className="text-center mt-6 sm:mt-8 text-slate-400 text-xs sm:text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-blue-400 font-semibold transition-colors"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthSidebar>
  );
};

export default Register;
