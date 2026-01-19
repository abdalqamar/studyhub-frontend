const UserPlaceholder = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-slate-600 to-slate-700 animate-pulse relative overflow-hidden ${className}`}
      role="status"
      aria-label="Loading user profile"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default UserPlaceholder;
