const CardShell = ({ children }) => (
  <div className="bg-surface border border-border rounded-[14px] p-5">
    {children}
  </div>
);

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// Reference theme shows "Top Instructors" as a horizontal progress-bar list
// (avatar + name + bar + value), not a bar chart — matching that exactly here.
const TopInstructorsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <CardShell>
        <h4 className="font-display font-semibold text-[13.5px] text-text-1">
          Top Instructors
        </h4>
        <div className="h-72 flex items-center justify-center">
          <p className="text-text-3 text-sm">No instructor data available</p>
        </div>
      </CardShell>
    );
  }

  const maxEarnings = Math.max(...data.map((i) => i.earnings || 0), 1);

  return (
    <CardShell>
      <h4 className="font-display font-semibold text-[13.5px] text-text-1">
        Top Instructors
      </h4>
      <div className="text-[11.5px] text-text-3 mb-2.5">By earnings</div>

      <div>
        {data.map((instructor, i) => {
          const widthPct = Math.round(
            (instructor.earnings / maxEarnings) * 100
          );
          return (
            <div
              key={instructor.name ?? i}
              className="flex items-center gap-2.5 py-2.5 border-b border-border last:border-b-0"
            >
              <div className="w-7 h-7 rounded-full bg-surface-2 flex items-center justify-center flex-shrink-0 font-display text-[11px] font-bold text-gold">
                {getInitials(instructor.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] font-semibold truncate">
                  {instructor.name}
                </div>
              </div>
              <div className="w-16 h-1 rounded-full bg-surface-2 overflow-hidden hidden sm:block">
                <div
                  className="h-full rounded-full bg-gold"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              <div className="font-mono text-xs font-semibold w-[70px] text-right">
                ₹{(instructor.earnings || 0).toLocaleString("en-IN")}
              </div>
            </div>
          );
        })}
      </div>
    </CardShell>
  );
};

export default TopInstructorsChart;
