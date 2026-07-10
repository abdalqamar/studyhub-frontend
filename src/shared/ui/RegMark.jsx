// small corner registration-mark decoration used across cards on the
// premium theme (hero card, course cards, etc.)
function RegMark({ className }) {
  return (
    <span className={`absolute w-4 h-4 pointer-events-none ${className}`}>
      <span className="absolute top-1/2 left-0 w-4 h-px bg-gold/70 -translate-y-1/2" />
      <span className="absolute left-1/2 top-0 w-px h-4 bg-gold/70 -translate-x-1/2" />
    </span>
  );
}

export default RegMark;
