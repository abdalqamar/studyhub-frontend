import { ArrowLeft, ArrowRight } from "lucide-react";

const CurriculumNavigation = ({ onBack, onNext, nextDisabled }) => (
  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-border">
    <button
      onClick={onBack}
      className="flex items-center justify-center gap-2 border border-border-strong text-text-2 px-4 py-2.5 rounded-lg text-sm hover:border-text-3 transition-colors"
    >
      <ArrowLeft size={16} /> Previous: details
    </button>
    <button
      onClick={onNext}
      disabled={nextDisabled}
      className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gold text-bg font-medium rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-gold-glow transition-shadow"
    >
      Next: preview <ArrowRight size={16} />
    </button>
  </div>
);

export default CurriculumNavigation;
