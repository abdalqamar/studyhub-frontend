interface AuthSidebarProps {
  image: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthSidebar = ({
  image,
  title,
  subtitle,
  children,
}: AuthSidebarProps) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16 sm:py-20 bg-bg relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 0%, rgba(212,165,55,0.05), transparent 40%), radial-gradient(circle at 85% 100%, rgba(45,212,191,0.04), transparent 40%)",
      }}
    >
      <div className="relative flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-border max-w-6xl w-full bg-surface/30 mx-auto">
        <span className="absolute w-4 h-4 -top-2 -left-2 pointer-events-none">
          <span className="absolute top-1/2 left-0 w-4 h-px bg-gold/70 -translate-y-1/2" />
          <span className="absolute left-1/2 top-0 w-px h-4 bg-gold/70 -translate-x-1/2" />
        </span>
        <span className="absolute w-4 h-4 -top-2 -right-2 pointer-events-none">
          <span className="absolute top-1/2 left-0 w-4 h-px bg-gold/70 -translate-y-1/2" />
          <span className="absolute left-1/2 top-0 w-px h-4 bg-gold/70 -translate-x-1/2" />
        </span>
        <span className="absolute w-4 h-4 -bottom-2 -left-2 pointer-events-none">
          <span className="absolute top-1/2 left-0 w-4 h-px bg-gold/70 -translate-y-1/2" />
          <span className="absolute left-1/2 top-0 w-px h-4 bg-gold/70 -translate-x-1/2" />
        </span>
        <span className="absolute w-4 h-4 -bottom-2 -right-2 pointer-events-none">
          <span className="absolute top-1/2 left-0 w-4 h-px bg-gold/70 -translate-y-1/2" />
          <span className="absolute left-1/2 top-0 w-px h-4 bg-gold/70 -translate-x-1/2" />
        </span>

        {/* Left form */}
        <div className="hidden lg:flex lg:w-1/2 flex-col p-10 border-r border-border bg-surface/40">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-gold mb-4">
            Welcome
          </span>

          <h1 className="text-text-1 font-display font-bold text-4xl leading-tight mb-3">
            {title}
          </h1>
          <p className="text-text-2 text-[15px] leading-relaxed mb-7 max-w-sm">
            {subtitle}
          </p>

          <div className="space-y-3 mb-7">
            {[
              { c: "#2dd4bf", t: "Progress syncs across every device" },
              {
                c: "#5b8def",
                t: "Every course ends in a real, reviewable project",
              },
              { c: "#d4a537", t: "Mentors and peers review your work" },
            ].map((f) => (
              <div
                key={f.t}
                className="flex items-start gap-2.5 text-sm text-text-2"
              >
                <span
                  className="w-1.5 h-1.5 rounded-sm mt-1.5 flex-shrink-0"
                  style={{ background: f.c }}
                />
                {f.t}
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden border border-border mb-2">
            <img
              src={image}
              loading="lazy"
              alt="Preview of the StudyHub learning experience"
              className="w-full h-44 object-cover"
            />
          </div>
          <span className="font-mono text-[10px] text-text-3 tracking-wide">
            FIG. 01 — PLATFORM PREVIEW
          </span>

          <div className="grid grid-cols-2 gap-y-4 gap-x-4 pt-6 mt-auto border-t border-border">
            {[
              { v: "50K+", l: "Learners", c: "text-gold" },
              { v: "500+", l: "Courses", c: "text-accent-blue" },
              { v: "100+", l: "Instructors", c: "text-teal" },
              { v: "4.8", l: "Rating", c: "text-gold" },
            ].map((s) => (
              <div key={s.l}>
                <p className={`font-mono font-bold text-lg ${s.c}`}>{s.v}</p>
                <p className="text-[11px] text-text-3 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-10 lg:p-14 bg-bg/60">
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;
