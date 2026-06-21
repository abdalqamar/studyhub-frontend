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
      className={`w-full px-5 py-2.5 text-sm font-semibold rounded-lg text-white
        bg-gradient-to-r from-blue-600 to-cyan-600
        hover:from-blue-500 hover:to-cyan-500
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-md shadow-blue-500/20
        transition-all duration-200
        flex items-center justify-center gap-2
        ${rest.className || ""}`}
    >
      {loading ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {Icon && <Icon size={16} />}
          {text}
        </>
      )}
    </button>
  );
};

export default LoaderButton;
