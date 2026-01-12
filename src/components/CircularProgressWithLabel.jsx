const CircularProgressWithLabel = ({
  value,
  size = 80,
  strokeWidth = 6,
  color = "#3b82f6",
  backgroundColor = "#334155",
  textColor = "#fff",
  showPercentage = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>

      {/* Percentage Label */}
      {showPercentage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: `${size * 0.2}px`,
              color: textColor,
              fontWeight: 600,
            }}
          >
            {Math.round(value)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default CircularProgressWithLabel;
