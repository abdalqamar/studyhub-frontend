const STEPS = [
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
];

const Process = () => {
  return (
    <div className="relative grid sm:grid-cols-4 gap-8 sm:gap-4">
      <div className="hidden sm:block absolute top-[17px] left-[4%] right-[4%] h-px bg-border" />

      {STEPS.map((step) => (
        <div key={step.n} className="relative">
          <div className="relative z-10 w-[34px] h-[34px] rounded-full bg-bg border border-gold flex items-center justify-center font-mono text-xs text-gold mb-4">
            {step.n}
          </div>
          <h3 className="font-display font-bold text-base mb-1.5">
            {step.t}
          </h3>
          <p className="text-text-2 text-sm">{step.d}</p>
        </div>
      ))}
    </div>
  );
};

export default Process;
