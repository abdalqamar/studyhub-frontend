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
        bg-gradient-to-r from-gold to-gold
        hover:from-gold-dim hover:to-gold
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-md shadow-gold-glow/20
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
