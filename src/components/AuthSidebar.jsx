import React from "react";
import { Link } from "react-router-dom";

const AuthSidebar = ({ image, title, subtitle, children }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16 sm:py-20 bg-slate-950 relative overflow-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px)",
      }}
    >
      <div className="relative flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-slate-700/50 max-w-6xl w-full bg-slate-900/30 mx-auto">
        <span className="absolute w-4 h-4 -top-2 -left-2 pointer-events-none">
          <span className="absolute top-1/2 left-0 w-4 h-px bg-cyan-400/70 -translate-y-1/2" />
          <span className="absolute left-1/2 top-0 w-px h-4 bg-cyan-400/70 -translate-x-1/2" />
        </span>
        <span className="absolute w-4 h-4 -top-2 -right-2 pointer-events-none">
          <span className="absolute top-1/2 left-0 w-4 h-px bg-cyan-400/70 -translate-y-1/2" />
          <span className="absolute left-1/2 top-0 w-px h-4 bg-cyan-400/70 -translate-x-1/2" />
        </span>
        <span className="absolute w-4 h-4 -bottom-2 -left-2 pointer-events-none">
          <span className="absolute top-1/2 left-0 w-4 h-px bg-cyan-400/70 -translate-y-1/2" />
          <span className="absolute left-1/2 top-0 w-px h-4 bg-cyan-400/70 -translate-x-1/2" />
        </span>
        <span className="absolute w-4 h-4 -bottom-2 -right-2 pointer-events-none">
          <span className="absolute top-1/2 left-0 w-4 h-px bg-cyan-400/70 -translate-y-1/2" />
          <span className="absolute left-1/2 top-0 w-px h-4 bg-cyan-400/70 -translate-x-1/2" />
        </span>

        {/* Left form */}
        <div className="hidden lg:flex lg:w-1/2 flex-col p-10 border-r border-slate-700/50 bg-slate-900/40">
          <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-cyan-400 mb-4">
            Welcome
          </span>

          <h1 className=" text-stone-50 font-['Space_Grotesk'] font-bold text-4xl leading-tight mb-3">
            {title}
          </h1>
          <p className="text-slate-400 text-[15px] leading-relaxed mb-7 max-w-sm">
            {subtitle}
          </p>

          <div className="space-y-3 mb-7">
            {[
              { c: "#22d3ee", t: "Progress syncs across every device" },
              {
                c: "#818cf8",
                t: "Every course ends in a real, reviewable project",
              },
              { c: "#fbbf24", t: "Mentors and peers review your work" },
            ].map((f) => (
              <div
                key={f.t}
                className="flex items-start gap-2.5 text-sm text-slate-400"
              >
                <span
                  className="w-1.5 h-1.5 rounded-sm mt-1.5 flex-shrink-0"
                  style={{ background: f.c }}
                />
                {f.t}
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-700/50 mb-2">
            <img
              src={image}
              loading="lazy"
              alt="Preview of the StudyHub learning experience"
              className="w-full h-44 object-cover"
            />
          </div>
          <span className="font-['JetBrains_Mono'] text-[10px] text-slate-500 tracking-wide">
            FIG. 01 — PLATFORM PREVIEW
          </span>

          <div className="grid grid-cols-2 gap-y-4 gap-x-4 pt-6 mt-auto border-t border-slate-700/50">
            {[
              { v: "50K+", l: "Learners", c: "text-cyan-400" },
              { v: "500+", l: "Courses", c: "text-indigo-400" },
              { v: "100+", l: "Instructors", c: "text-amber-400" },
              { v: "4.8", l: "Rating", c: "text-emerald-400" },
            ].map((s) => (
              <div key={s.l}>
                <p
                  className={`font-['Space_Grotesk'] font-bold text-lg ${s.c}`}
                >
                  {s.v}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-10 lg:p-14 bg-slate-950/60">
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;
