const PALETTE = ["#d4a537", "#2dd4bf", "#5b8def", "#8b7ae0", "#e2574c"];

const CardShell = ({ children }) => (
  <div className="bg-surface border border-border rounded-[14px] p-5">
    {children}
  </div>
);

const getName = (c) => c.name || c._id?.name || c._id || "Other";
const getCount = (c) => c.count ?? c.total ?? 0;

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CourseCategoriesChart = ({ courseCategories }) => {
  if (!courseCategories || courseCategories.length === 0) {
    return (
      <CardShell>
        <h4 className="font-display font-semibold text-[13.5px] text-text-1">
          Course Categories
        </h4>
        <div className="h-56 flex items-center justify-center">
          <p className="text-text-3 text-sm">No category data available</p>
        </div>
      </CardShell>
    );
  }

  const total = courseCategories.reduce((sum, c) => sum + getCount(c), 0) || 1;

  let offsetSoFar = 0;
  const segments = courseCategories.map((c, i) => {
    const count = getCount(c);
    const pct = count / total;
    const dash = pct * CIRCUMFERENCE;
    const segment = {
      name: getName(c),
      pct: Math.round(pct * 100),
      color: PALETTE[i % PALETTE.length],
      dasharray: `${dash} ${CIRCUMFERENCE}`,
      dashoffset: -offsetSoFar,
    };
    offsetSoFar += dash;
    return segment;
  });

  return (
    <CardShell>
      <h4 className="font-display font-semibold text-[13.5px] text-text-1">
        Course Categories
      </h4>
      <div className="text-[11.5px] text-text-3 mb-1">
        Share of published courses
      </div>

      <svg
        viewBox="0 0 120 120"
        width="120"
        height="120"
        className="block mx-auto my-1.5"
      >
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="#1c2340"
          strokeWidth="16"
        />
        {segments.map((s) => (
          <circle
            key={s.name}
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke={s.color}
            strokeWidth="16"
            strokeDasharray={s.dasharray}
            strokeDashoffset={s.dashoffset}
            transform="rotate(-90 60 60)"
          />
        ))}
        <text
          x="60"
          y="56"
          textAnchor="middle"
          fill="#edeff5"
          fontFamily="JetBrains Mono"
          fontSize="18"
          fontWeight="700"
        >
          {total}
        </text>
        <text
          x="60"
          y="72"
          textAnchor="middle"
          fill="#5c6480"
          fontFamily="Inter"
          fontSize="9"
        >
          courses
        </text>
      </svg>

      <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-1.5 mt-2">
        {segments.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-1.5 text-[11.5px] text-text-2"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: s.color }}
            />
            {s.name} ({s.pct}%)
          </div>
        ))}
      </div>
    </CardShell>
  );
};

export default CourseCategoriesChart;
