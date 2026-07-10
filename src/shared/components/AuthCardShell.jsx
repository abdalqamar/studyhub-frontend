import { Link } from "react-router-dom";

function RegMark({ className }) {
  return (
    <span className={`absolute w-4 h-4 pointer-events-none ${className}`}>
      <span className="absolute top-1/2 left-0 w-4 h-px bg-cyan-400/70 -translate-y-1/2" />
      <span className="absolute left-1/2 top-0 w-px h-4 bg-cyan-400/70 -translate-x-1/2" />
    </span>
  );
}

const pageStyle = {
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px)",
};

const AuthCardShell = ({ children, tall = false }) => (
  <div
    className={`min-h-screen bg-slate-950 flex items-center justify-center px-4 ${tall ? "py-20" : ""}`}
    style={pageStyle}
  >
    <div className="w-full max-w-md relative">
      <div className="relative border border-slate-700/50 rounded-2xl bg-slate-900/30 p-8">
        <RegMark className="-top-2 -left-2" />
        <RegMark className="-top-2 -right-2" />
        <RegMark className="-bottom-2 -left-2" />
        <RegMark className="-bottom-2 -right-2" />

        <Link to="/" className="flex items-center justify-center gap-2.5 mb-6">
          <span className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
              <path
                d="M4 5h16M4 12h16M4 19h10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="font-['Space_Grotesk'] font-bold text-base text-white">
            StudyHub
          </span>
        </Link>

        {children}
      </div>
    </div>
  </div>
);

export default AuthCardShell;
