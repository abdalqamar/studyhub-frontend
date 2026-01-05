import { Loader } from "lucide-react";

const LoaderButton = ({
  text,
  loadingText,
  icon: Icon,
  loading = false,
  ...rest
}) => {
  return (
    <button
      disabled={loading}
      {...rest}
      className={`group relative w-full px-6 py-3 font-semibold rounded-lg overflow-hidden transition-all duration-300 ${
        rest.className || ""
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-100 group-hover:opacity-90 group-disabled:opacity-50 transition" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 group-disabled:opacity-0 blur-lg transition" />
      <span className="relative flex items-center justify-center gap-2 text-white">
        {loading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {Icon && <Icon size={18} />}
            {text}
          </>
        )}
      </span>
    </button>
  );
};

export default LoaderButton;
