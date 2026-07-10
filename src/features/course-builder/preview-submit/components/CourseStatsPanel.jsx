const StatRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-text-2">{label}</span>
    <span className="font-mono text-text-1">{value}</span>
  </div>
);

const CourseStatsPanel = ({ sectionsCount, totalLectures, totalMinutes }) => (
  <div className="bg-surface rounded-xl p-5 border border-border space-y-3">
    <h4 className="font-display text-base mb-1">Course stats</h4>
    <StatRow label="Sections" value={sectionsCount} />
    <StatRow label="Total lectures" value={totalLectures} />
    <StatRow label="Total duration" value={`${totalMinutes} min`} />
  </div>
);

export default CourseStatsPanel;
