import { Check } from "lucide-react";

// Signature element for the wizard shell: a gold "spine" that fills in
// as steps complete. Numbers use the mono face — they're data, not copy.
const RenderProgress = ({ steps, currentStep }) => (
  <div className="bg-surface rounded-xl border border-border px-4 sm:px-6 py-5 mb-6">
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isDone = currentStep > step.id;
        const isActive = currentStep === step.id;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-full border font-mono text-xs transition-colors ${
                  isDone
                    ? "bg-gold border-gold text-bg"
                    : isActive
                    ? "border-gold text-gold bg-gold-soft shadow-gold-glow"
                    : "border-border-strong text-text-3"
                }`}
              >
                {isDone ? <Check size={16} /> : step.id}
              </div>
              <span
                className={`hidden sm:inline font-display text-sm ${
                  isActive ? "text-text-1" : isDone ? "text-text-2" : "text-text-3"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-px mx-3 sm:mx-4 bg-border-strong relative overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-gold transition-all duration-300 ${
                    isDone ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default RenderProgress;
