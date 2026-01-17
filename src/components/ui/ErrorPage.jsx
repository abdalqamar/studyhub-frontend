import { AlertCircle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ error, onRetry, onGoBack }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        />
      </div>

      {/* Error content */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Error icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full p-8">
              <AlertCircle
                className="w-24 h-24 text-red-400"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Error message */}
        <div className="text-center mb-8">
          <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
            Oops!
          </h1>
          <h2 className="text-3xl font-bold text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            We're sorry, but something unexpected happened while fetching.
          </p>
        </div>

        {/* Error details card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-300 font-semibold mb-2">
                Error Details
              </h3>
              <p className="text-slate-400 text-sm font-mono">
                {error?.message || "Failed to load data from the server."}
              </p>
              <p className="text-slate-500 text-xs mt-2">
                Error Code: {error?.code || "500"} |{" "}
                {error?.status || "Internal Server Error"}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Go Back */}
          <button
            onClick={onGoBack}
            className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50"
          >
            <div className="flex items-center justify-center gap-2 text-slate-300 group-hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Go Back</span>
            </div>
          </button>

          {/* Retry */}
          <button
            onClick={onRetry}
            className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/50"
          >
            <div className="flex items-center justify-center gap-2 text-white">
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span className="font-semibold">Try Again</span>
            </div>
          </button>

          {/* Go Home */}
          <button
            onClick={() => navigate("/")}
            className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50"
          >
            <div className="flex items-center justify-center gap-2 text-slate-300 group-hover:text-white transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-semibold">Home</span>
            </div>
          </button>
        </div>

        {/* Support link */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Need help?{" "}
            <a
              href="/support"
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
    </div>
  );
};
export default ErrorPage;
