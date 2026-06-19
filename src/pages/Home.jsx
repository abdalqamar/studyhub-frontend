import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { useCourses } from "../hooks/useCourses";
import { formatDuration } from "../utils/formatDuration";
import { testimonials } from "../data/data.js";
import LiveCodeDemo from "../components/LiveCodeDemo.jsx";

function RegMark({ className }) {
  return (
    <span className={`absolute w-4 h-4 pointer-events-none ${className}`}>
      <span className="absolute top-1/2 left-0 w-4 h-px bg-cyan-400/70 -translate-y-1/2" />
      <span className="absolute left-1/2 top-0 w-px h-4 bg-cyan-400/70 -translate-x-1/2" />
    </span>
  );
}

//  catalog index

function CatalogIndex() {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center py-14">
        <div className="w-7 h-7 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!categories.length) {
    return (
      <p className="text-slate-500 text-sm py-8">
        No categories yet — check back soon.
      </p>
    );
  }

  return (
    <div className="border-t border-slate-700/50">
      {categories.map((category, i) => (
        <Link
          key={category._id}
          to={`/courses?page=1&category=${category._id}`}
          className="grid grid-cols-[60px_1fr_24px] sm:grid-cols-[110px_1fr_140px_24px] items-center gap-3 sm:gap-5 py-5 px-1 border-b border-slate-700/50 hover:bg-cyan-500/5 transition-colors group"
        >
          <span className="font-['JetBrains_Mono'] text-[11px] sm:text-xs text-cyan-400 tracking-wide">
            PATH {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-['Space_Grotesk'] font-bold text-base sm:text-xl">
            {category.name}
          </span>
          <span className="hidden sm:block font-['JetBrains_Mono'] text-xs text-slate-500 text-right">
            {category.courses ?? 0} courses
          </span>
          <span className="text-cyan-400 text-lg text-right transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}

// Modules
function ModulesGrid() {
  const { data: coursesData, isLoading } = useCourses({
    search: "",
    category: "",
    page: 1,
    limit: 3,
  });

  const courses = coursesData?.courses || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-14">
        <div className="w-7 h-7 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!courses.length) {
    return (
      <p className="text-slate-500 text-sm py-8">No courses published yet.</p>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {courses.map((course, i) => (
        <Link
          key={course._id}
          to={`/course/${course._id}`}
          className="relative block border border-slate-700/50 rounded-2xl p-6 bg-slate-900/40 hover:border-cyan-500/50 transition-colors"
        >
          <RegMark className="-top-2 -left-2" />
          <RegMark className="-top-2 -right-2" />

          <span className="absolute -top-2.5 left-6 bg-slate-950 px-1.5 font-['JetBrains_Mono'] text-[11px] text-amber-400 tracking-wide">
            CRS-{String(i + 1).padStart(3, "0")}
          </span>

          <div className="font-['JetBrains_Mono'] text-[10.5px] text-cyan-400 uppercase tracking-wide mb-2">
            {course.category?.name || "General"}
          </div>

          <h3 className="font-['Space_Grotesk'] font-bold text-lg mb-4 leading-snug line-clamp-2">
            {course.title}
          </h3>

          <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[11.5px] text-slate-400 border-t border-slate-700/50 pt-3.5">
            <span>
              {course.totalDuration > 0
                ? formatDuration(course.totalDuration)
                : "Self-paced"}
              {course.totalLectures > 0
                ? ` · ${course.totalLectures} lessons`
                : ""}
            </span>
            <span className="text-white">
              {course.averageRating > 0
                ? `★ ${course.averageRating.toFixed(1)}`
                : "New"}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

const Home = () => {
  return (
    <div
      className="min-h-screen bg-slate-950 text-white"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px)",
      }}
    >
      {/*  HERO  */}
      <section className="pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative border border-slate-700/50 rounded-2xl p-8 sm:p-12 lg:p-14 bg-slate-900/30">
            <RegMark className="-top-2 -left-2" />
            <RegMark className="-top-2 -right-2" />
            <RegMark className="-bottom-2 -left-2" />
            <RegMark className="-bottom-2 -right-2" />

            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
              {/* left — copy */}
              <div>
                <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-cyan-400">
                  Learning, mapped clearly
                </span>

                <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mt-4 mb-5">
                  Every skill starts
                  <br />
                  with a{" "}
                  <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                    plan
                  </span>
                  .
                </h1>

                <p className="text-slate-400 text-base sm:text-lg max-w-md mb-7">
                  Structured courses, real projects, and a clear path from first
                  lesson to finished skill. No guesswork, no filler video — just
                  a plan you can follow.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white shadow-lg shadow-blue-500/25 transition-all"
                  >
                    Start your first course →
                  </Link>
                  <Link
                    to="/courses"
                    className="inline-flex items-center px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base border border-slate-700 hover:border-cyan-500/50 transition-colors"
                  >
                    View the catalog
                  </Link>
                </div>

                <div className="flex gap-6 sm:gap-8 flex-wrap font-['JetBrains_Mono'] text-xs text-slate-500 border-t border-slate-700/50 pt-5">
                  <span>
                    <span className="inline-block w-1.5 h-1.5 mr-1.5 bg-cyan-400" />
                    <strong className="text-white font-medium">50K+</strong>{" "}
                    learners
                  </span>
                  <span>
                    <span className="inline-block w-1.5 h-1.5 mr-1.5 bg-indigo-400" />
                    <strong className="text-white font-medium">500+</strong>{" "}
                    courses
                  </span>
                  <span>
                    <span className="inline-block w-1.5 h-1.5 mr-1.5 bg-amber-400" />
                    <strong className="text-white font-medium">100+</strong>{" "}
                    instructors
                  </span>
                  <span>
                    <span className="inline-block w-1.5 h-1.5 mr-1.5 bg-emerald-400" />
                    <strong className="text-white font-medium">4.8</strong> avg.
                    rating
                  </span>
                </div>

                {/* mobile-only diagram */}
                <div className="lg:hidden relative mt-6 border border-slate-700/50 rounded-2xl bg-slate-900/60 p-5">
                  <div className="absolute -top-3 right-4 flex items-center gap-1.5 bg-slate-950 border border-dashed border-emerald-400 rounded-full px-3 py-1 -rotate-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-['JetBrains_Mono'] text-[9px] text-emerald-400 tracking-wide">
                      1,247 BUILDING NOW
                    </span>
                  </div>
                  <div className="font-['JetBrains_Mono'] text-[11px] text-amber-400 mb-2">
                    CRS-014
                  </div>
                  <div className="font-['Space_Grotesk'] font-bold text-lg mb-2">
                    React Fundamentals
                  </div>
                  <div className="font-['JetBrains_Mono'] text-[10.5px] text-slate-500">
                    WEB DEVELOPMENT · 6H 40M
                  </div>
                  <div className="border-t border-slate-700/50 my-2.5" />
                  <div className="font-['JetBrains_Mono'] text-[10.5px] text-slate-500">
                    ★ 4.9 RATING · BEGINNER
                  </div>
                </div>
              </div>

              {/* right — exploded diagram  */}
              <div className="hidden lg:block relative">
                <div className="absolute -top-3.5 right-3 flex items-center gap-1.5 bg-slate-900 border border-dashed border-emerald-400 rounded-full px-3 py-1.5 -rotate-2 z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-['JetBrains_Mono'] text-[9.5px] text-emerald-400 tracking-wide whitespace-nowrap">
                    1,247 BUILDING THIS PATH NOW
                  </span>
                </div>

                <svg
                  viewBox="0 0 480 440"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Exploded diagram of a course module, showing how video lessons, hands-on projects, peer code review, and a certificate connect to the central course card."
                >
                  <line
                    x1="140"
                    y1="150"
                    x2="40"
                    y2="55"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.85"
                  />
                  <line
                    x1="340"
                    y1="150"
                    x2="440"
                    y2="62"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.85"
                  />
                  <line
                    x1="140"
                    y1="280"
                    x2="42"
                    y2="385"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.85"
                  />
                  <line
                    x1="340"
                    y1="280"
                    x2="438"
                    y2="378"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.85"
                  />

                  <circle
                    cx="40"
                    cy="55"
                    r="3"
                    fill="#020617"
                    stroke="#22d3ee"
                    strokeWidth="1.4"
                  />
                  <circle
                    cx="440"
                    cy="62"
                    r="3"
                    fill="#020617"
                    stroke="#22d3ee"
                    strokeWidth="1.4"
                  />
                  <circle
                    cx="42"
                    cy="385"
                    r="3"
                    fill="#020617"
                    stroke="#22d3ee"
                    strokeWidth="1.4"
                  />
                  <circle
                    cx="438"
                    cy="378"
                    r="3"
                    fill="#020617"
                    stroke="#22d3ee"
                    strokeWidth="1.4"
                  />

                  <text
                    x="40"
                    y="40"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10.5"
                    letterSpacing="0.04em"
                    fill="#94a3b8"
                  >
                    24 VIDEO LESSONS
                  </text>
                  <text
                    x="440"
                    y="46"
                    textAnchor="end"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10.5"
                    letterSpacing="0.04em"
                    fill="#94a3b8"
                  >
                    6 HANDS-ON PROJECTS
                  </text>
                  <text
                    x="42"
                    y="405"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10.5"
                    letterSpacing="0.04em"
                    fill="#94a3b8"
                  >
                    PEER CODE REVIEW
                  </text>
                  <text
                    x="438"
                    y="400"
                    textAnchor="end"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10.5"
                    letterSpacing="0.04em"
                    fill="#94a3b8"
                  >
                    CERTIFICATE ON
                  </text>
                  <text
                    x="438"
                    y="416"
                    textAnchor="end"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10.5"
                    letterSpacing="0.04em"
                    fill="#94a3b8"
                  >
                    COMPLETION
                  </text>

                  <line
                    x1="132"
                    y1="142"
                    x2="148"
                    y2="142"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <line
                    x1="140"
                    y1="134"
                    x2="140"
                    y2="150"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <line
                    x1="332"
                    y1="142"
                    x2="348"
                    y2="142"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <line
                    x1="340"
                    y1="134"
                    x2="340"
                    y2="150"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <line
                    x1="132"
                    y1="288"
                    x2="148"
                    y2="288"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <line
                    x1="140"
                    y1="280"
                    x2="140"
                    y2="296"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <line
                    x1="332"
                    y1="288"
                    x2="348"
                    y2="288"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <line
                    x1="340"
                    y1="280"
                    x2="340"
                    y2="296"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity="0.7"
                  />

                  <rect
                    x="140"
                    y="150"
                    width="200"
                    height="130"
                    rx="10"
                    fill="#111c33"
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  <text
                    x="155"
                    y="178"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="11"
                    letterSpacing="0.04em"
                    fill="#fbbf24"
                  >
                    CRS-014
                  </text>
                  <text
                    x="155"
                    y="205"
                    fontFamily="Space Grotesk, sans-serif"
                    fontWeight="700"
                    fontSize="17"
                    fill="#ffffff"
                  >
                    React Fundamentals
                  </text>
                  <text
                    x="155"
                    y="226"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10"
                    letterSpacing="0.03em"
                    fill="#94a3b8"
                  >
                    WEB DEVELOPMENT · 6H 40M
                  </text>
                  <line
                    x1="155"
                    y1="240"
                    x2="325"
                    y2="240"
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  <text
                    x="155"
                    y="262"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10"
                    letterSpacing="0.03em"
                    fill="#94a3b8"
                  >
                    ★ 4.9 RATING · BEGINNER
                  </text>
                </svg>

                <div className="flex justify-between font-['JetBrains_Mono'] text-[10px] text-slate-500 tracking-wide border-t border-slate-700/50 pt-3 mt-2">
                  <span>STUDYHUB · CAREER SKILLS PATH</span>
                  <span>SHEET 01/12 · REV 04</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  LIVE CODE   */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-10">
            <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-cyan-400">
              Inside a lesson
            </span>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl mt-3 leading-tight">
              You don't just watch this part — you ship it.
            </h2>
            <p className="text-slate-400 mt-3">
              Every module ends in real, running code. This is a snippet from
              course CRS-014.
            </p>
          </div>

          <LiveCodeDemo />
        </div>
      </section>

      {/*  CATALOG  */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-10">
            <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-cyan-400">
              The catalog
            </span>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl mt-3 leading-tight">
              Twelve paths. Every skill mapped.
            </h2>
            <p className="text-slate-400 mt-3">
              Each path is its own roadmap — a complete map from first
              principles to a finished, shippable skill.
            </p>
          </div>

          <CatalogIndex />
        </div>
      </section>

      {/*  MODULES  */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-10">
            <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-cyan-400">
              Newest courses
            </span>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl mt-3 leading-tight">
              Fresh off the catalog.
            </h2>
          </div>

          <ModulesGrid />
        </div>
      </section>

      {/*  PROCESS  */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-12">
            <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-cyan-400">
              How it works
            </span>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl mt-3 leading-tight">
              Four stages. No shortcuts.
            </h2>
          </div>

          <div className="relative grid sm:grid-cols-4 gap-8 sm:gap-4">
            <div className="hidden sm:block absolute top-[17px] left-[4%] right-[4%] h-px bg-slate-700/50" />

            {[
              {
                n: "01",
                t: "Enroll",
                d: "Pick a path, set a pace. No fixed schedule — your plan, your hours.",
              },
              {
                n: "02",
                t: "Build",
                d: "Ship real projects, not just quizzes. Every course ends with something you made.",
              },
              {
                n: "03",
                t: "Review",
                d: "Get feedback from mentors and peers before you move to the next course.",
              },
              {
                n: "04",
                t: "Certify",
                d: "Walk away with a certificate and a portfolio piece, not just a badge.",
              },
            ].map((step) => (
              <div key={step.n} className="relative">
                <div className="relative z-10 w-[34px] h-[34px] rounded-full bg-slate-950 border border-cyan-400 flex items-center justify-center font-['JetBrains_Mono'] text-xs text-cyan-400 mb-4">
                  {step.n}
                </div>
                <h3 className="font-['Space_Grotesk'] font-bold text-base mb-1.5">
                  {step.t}
                </h3>
                <p className="text-slate-400 text-sm">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  FIELD NOTES  */}
      {testimonials?.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-xl mb-10">
              <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-cyan-400">
                Field notes
              </span>
              <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl mt-3 leading-tight">
                From people who finished a path.
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t, i) => (
                <div key={i} className="border-l-2 border-cyan-400 pl-5">
                  <p className="text-sm leading-relaxed mb-3">"{t.text}"</p>
                  <div className="font-['JetBrains_Mono'] text-[11.5px] text-slate-500 uppercase tracking-wide">
                    {t.name} — {t.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/*  FINAL CTA  */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-10 border border-slate-700/50 rounded-3xl p-10 sm:p-14 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 text-center sm:text-left">
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl max-w-md leading-tight">
              Stop planning. Start building.
            </h2>
            <Link
              to="/login"
              className="flex-shrink-0 w-28 h-28 rounded-full border-2 border-dashed border-emerald-400 flex items-center justify-center text-center -rotate-6 hover:rotate-0 transition-transform"
            >
              <span className="font-['JetBrains_Mono'] text-[10px] text-emerald-400 uppercase tracking-wide leading-relaxed">
                Ready
                <br />
                for
                <br />
                Path 01
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
