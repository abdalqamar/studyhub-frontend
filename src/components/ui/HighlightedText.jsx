const colorThemes = {
  blue: "from-blue-400 to-cyan-400",
  yellow: "from-yellow-300 to-amber-500",
  pink: "from-purple-400 to-pink-400",
  green: "from-green-400 to-emerald-400",
  purple: "from-violet-400 to-fuchsia-500",
};

const HighlightedText = ({ text, theme = "blue", className = "" }) => {
  return (
    <span
      className={`bg-gradient-to-r ${colorThemes[theme]} bg-clip-text text-transparent ${className}`}
    >
      {text}
    </span>
  );
};
export default HighlightedText;
