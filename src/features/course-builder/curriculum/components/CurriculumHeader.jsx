const CurriculumHeader = ({ sectionsCount, totalLectures }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
    <div>
      <p className="font-mono text-xs tracking-wider text-text-3 uppercase mb-1">step 2</p>
      <h2 className="font-display text-2xl font-medium">Course curriculum</h2>
      <p className="text-text-2 text-sm mt-1">Structure your sections and lessons</p>
    </div>
    <div className="flex items-center gap-4 font-mono text-sm">
      <div className="text-center">
        <div className="text-gold text-lg">{sectionsCount}</div>
        <div className="text-text-3 text-xs">sections</div>
      </div>
      <div className="w-px h-8 bg-border-strong" />
      <div className="text-center">
        <div className="text-teal text-lg">{totalLectures}</div>
        <div className="text-text-3 text-xs">lectures</div>
      </div>
    </div>
  </div>
);

export default CurriculumHeader;
