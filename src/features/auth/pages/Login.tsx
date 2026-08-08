import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialLoginButtons from "@/features/auth/components/SocialLoginButtons";
import AuthSidebar from "@/features/auth/components/AuthSidebar";
import LoaderButton from "@/shared/ui/LoaderButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import InputField from "@/shared/ui/InputField";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { LoginFormData, loginSchema } from "../schemas/loginSchema";

const Login = () => {
  const navigate = useNavigate();
  const { loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        setAccessToken(res.accessToken);
        setUser(res.user);

        successToast("Login successful!");
        navigate(`/${res?.user?.role}`);
      },

      onError: (error) => {
        const message = error?.response?.data?.message || "Login failed";
        const backendErrors = error?.response?.data?.errors as
          | Record<string, string>
          | undefined;

        if (backendErrors) {
          Object.keys(backendErrors).forEach((field) => {
            setError(field as keyof LoginFormData, {
              type: "server",
              message: backendErrors[field],
            });
          });
        } else {
          errorToast(message);
        }
      },
    });
  };

  return (
    <AuthSidebar
      image={
        "https://res.cloudinary.com/du7xquzsm/image/upload/v1763812843/Login_image_gi1c7b.avif"
      }
      title="Let the Journey Begin!"
      subtitle="Unlock your learning potential — sign in to access your LMS dashboard."
    >
      <div className="text-center mb-5 sm:mb-7">
        <h2 className="font-display text-3xl font-bold text-gold mb-1">
          Sign In
        </h2>
        <p className="text-text-2 text-sm sm:text-base">
          Enter your credentials to access your account
        </p>
      </div>

      <SocialLoginButtons />

      <div className="flex items-center gap-3 my-5 sm:my-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"></div>
        <span className="text-text-3 text-xs sm:text-sm">OR</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
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
            className="text-xs sm:text-sm text-gold hover:text-gold/80 transition font-medium"
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

        <p className="text-center mt-5 text-text-2 text-xs sm:text-sm">
          Don't have an account?{" "}
          <Link to={"/register"}>
            <span className="text-gold hover:text-gold/80 hover:underline font-semibold transition">
              Register here
            </span>
          </Link>
        </p>
      </form>
    </AuthSidebar>
  );
};
export default Login;
