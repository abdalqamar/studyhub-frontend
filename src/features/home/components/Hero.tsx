import { Link } from "react-router-dom";
import ClipCorner from "@/shared/ui/ClipCorner";
import { clipCardStyle } from "@/shared/ui/clipCardStyle";

const STATS = [
  { num: "50K+", lbl: "Active learners" },
  { num: "500+", lbl: "Courses published" },
  { num: "100+", lbl: "Instructors" },
  { num: "4.8", lbl: "Average rating" },
];

const Hero = () => {
  return (
    <section className="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center border border-border bg-surface rounded-[22px] p-8 sm:p-12 lg:p-14"
          style={clipCardStyle}
        >
          <ClipCorner />

          {/* left — copy */}
          <div>
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-gold">
              Learning, mapped clearly
            </span>

            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.1] tracking-tight mt-4 mb-4">
              Every skill starts
              <br />
              with a{" "}
              <span className="bg-gradient-to-r from-gold to-[#f2cf7a] bg-clip-text text-transparent">
                plan
              </span>
              .
            </h1>

            <p className="text-text-2 text-[15.5px] leading-relaxed max-w-md mb-7">
              Structured courses, real projects, and a clear path from first
              lesson to finished skill. No guesswork, no filler video — just a
              plan you can follow.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-gold to-[#b5842a] shadow-gold-glow px-6 py-3.5 rounded-xl font-semibold text-sm text-bg"
              >
                Start your first course →
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center px-6 py-3.5 rounded-xl font-semibold text-sm border border-border-strong hover:border-gold-dim transition-colors"
              >
                View the catalog
              </Link>
            </div>

            {/* social proof — overlapping avatar stack */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <div className="w-7 h-7 rounded-full border-2 border-surface bg-gold flex items-center justify-center font-display text-[10px] font-bold text-bg">
                  RA
                </div>
                <div className="w-7 h-7 rounded-full border-2 border-surface bg-teal -ml-2.5 flex items-center justify-center font-display text-[10px] font-bold text-bg">
                  PS
                </div>
                <div className="w-7 h-7 rounded-full border-2 border-surface bg-accent-blue -ml-2.5 flex items-center justify-center font-display text-[10px] font-bold text-bg">
                  AK
                </div>
                <div className="w-7 h-7 rounded-full border-2 border-surface bg-[#8b7ae0] -ml-2.5 flex items-center justify-center font-display text-[10px] font-bold text-bg">
                  MI
                </div>
              </div>
              <p className="text-text-2 text-[13px]">
                <strong className="text-text-1">1,247 learners</strong> building
                this path right now
              </p>
            </div>
          </div>

          {/* right — course video-player preview card */}
          <div className="relative">
            <div className="bg-[#080b15] border border-border rounded-[14px] overflow-hidden">
              {/* player chrome */}
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-surface-2 border-b border-border">
                <span className="w-2.5 h-2.5 rounded-full bg-danger" />
                <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                <span className="w-2.5 h-2.5 rounded-full bg-teal" />
                <span className="ml-2 font-mono text-[10.5px] text-text-3">
                  Lesson 14 of 24
                </span>
              </div>

              {/* thumbnail / play button */}
              <div
                className="relative aspect-video flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,165,55,0.22), rgba(91,141,239,0.15))",
                }}
              >
                <button
                  aria-label="Play preview"
                  className="w-14 h-14 rounded-full bg-bg/60 border-[1.5px] border-gold flex items-center justify-center backdrop-blur-sm"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-gold ml-0.5"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <span className="absolute bottom-2.5 right-3 bg-bg/75 font-mono text-[10.5px] px-2 py-0.5 rounded-md text-text-1">
                  06:40 / 40:12
                </span>
              </div>

              {/* info + progress */}
              <div className="p-4 sm:p-[18px]">
                <div className="font-mono text-[10.5px] text-gold tracking-wide">
                  CRS-014 · WEB DEVELOPMENT
                </div>
                <h3 className="font-display font-bold text-[19px] mt-2 mb-3">
                  React Fundamentals for Working Developers
                </h3>

                <div className="flex justify-between font-mono text-[10.5px] text-text-3 mb-1.5">
                  <span>Your progress</span>
                  <span>68%</span>
                </div>
                <div className="h-[5px] rounded-full bg-surface-2 overflow-hidden mb-3.5">
                  <div
                    className="h-full bg-gold rounded-full"
                    style={{ width: "68%" }}
                  />
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-accent-blue to-teal flex items-center justify-center font-display text-[10.5px] font-bold text-bg">
                    RA
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Rohan Agarwal</div>
                    <div className="text-[10.5px] text-text-3">
                      Instructor · ★ 4.9
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* live badge */}
            <div className="absolute -top-3.5 right-3 flex items-center gap-1.5 bg-surface border border-dashed border-teal rounded-full px-3 py-1.5 -rotate-2 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span className="font-mono text-[9.5px] text-teal tracking-wide whitespace-nowrap">
                1,247 BUILDING THIS PATH NOW
              </span>
            </div>
          </div>
        </div>

        {/* stats strip — dashboard-style, right under hero (matches reference exactly) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-[18px] mt-[22px]">
          {STATS.map((s) => (
            <div
              key={s.lbl}
              className="bg-surface border border-border rounded-[14px] p-[22px]"
            >
              <div className="font-mono text-[30px] font-bold text-gold tabular-nums">
                {s.num}
              </div>
              <div className="text-[12.5px] text-text-3 mt-1">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
