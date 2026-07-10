import { testimonials } from "@/data/data.js";

const Testimonials = () => {
  if (!testimonials?.length) return null;

  return (
    <div className="grid sm:grid-cols-3 gap-[22px]">
      {testimonials.slice(0, 3).map((t, i) => (
        <div
          key={i}
          className="bg-surface border border-border border-l-2 border-l-gold rounded-r-[14px] p-[22px]"
        >
          <p className="text-sm leading-relaxed mb-3.5 text-text-1">
            "{t.text}"
          </p>
          <div className="font-mono text-[11px] text-text-3 uppercase tracking-wide">
            {t.name} — {t.role}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
