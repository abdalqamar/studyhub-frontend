import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialLoginButtons from "../../components/ui/SocialLoginButtons";
import { useDispatch } from "react-redux";
import AuthLayout from "../../components/AuthSidebar";
import LoaderButton from "../../components/ui/LoaderButton";
import { useAuth } from "../../hooks/useAuth";
import { setToken, setUser } from "../../features/auth/authSlice";
import InputField from "../../components/ui/InputField";
import { errorToast, successToast } from "../../utils/toastUtils";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .pipe(z.email({ message: "Please enter a valid email address" })),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        dispatch(setToken(res.accessToken));
        dispatch(setUser(res.user));

        successToast("Login successful!");
        navigate(`/${res?.user?.role}`);
      },

      onError: (error) => {
        const message = error?.response?.data?.message || "Login failed";

        if (error?.response?.data?.errors) {
          const backendErrors = error.response.data.errors;

          Object.keys(backendErrors).forEach((field) => {
            errors[field] = { message: backendErrors[field] };
          });
        } else {
          errorToast(message);
        }
      },
    });
  };

  return (
    <AuthLayout
      image={
        "https://res.cloudinary.com/du7xquzsm/image/upload/v1763812843/Login_image_gi1c7b.avif"
      }
      title="Let the Journey Begin!"
      subtitle="Unlock your learning potential — sign in to access your LMS dashboard."
    >
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-3xl font-bold text-cyan-200 mb-1">Sign In</h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Enter your credentials to access your account
        </p>
      </div>

      <SocialLoginButtons />

      <div className="flex items-center gap-3 my-6 sm:my-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
        <span className="text-slate-500 text-xs sm:text-sm">OR</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-4"
      >
        {/* Email */}
        <InputField
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password */}
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          showPasswordToggle
          isPasswordVisible={showPassword}
          onPasswordToggle={() => setShowPassword(!showPassword)}
          {...register("password")}
        />

        <div className="flex justify-end">
          <Link
            to={"/forgot-password"}
            className="text-xs sm:text-sm text-blue-400 hover:text-cyan-400 transition font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <LoaderButton
          text="Sign In"
          loadingText="Signing in..."
          loading={loginMutation.isPending}
          type="submit"
        />

        <p className="text-center mt-6 text-slate-400 text-xs sm:text-sm">
          Don't have an account?{" "}
          <Link to={"/register"}>
            <span className="text-cyan-400 hover:underline font-semibold transition">
              Register here
            </span>
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
