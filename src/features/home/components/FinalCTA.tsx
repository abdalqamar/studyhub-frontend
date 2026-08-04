import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-10 border border-gold-dim rounded-3xl p-10 sm:p-14 bg-gradient-to-br from-gold/10 to-teal/5 text-center sm:text-left">
      <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-md leading-tight">
        Stop planning. Start building.
      </h2>
      <Link
        to="/login"
        className="flex-shrink-0 w-28 h-28 rounded-full border-2 border-dashed border-gold flex items-center justify-center text-center -rotate-6 hover:rotate-0 transition-transform"
      >
        <span className="font-mono text-[10px] text-gold uppercase tracking-wide leading-relaxed">
          Ready
          <br />
          for
          <br />
          Path 01
        </span>
      </Link>
    </div>
  );
};

export default FinalCTA;
