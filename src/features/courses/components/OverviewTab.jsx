import { Check } from "lucide-react";

const OverviewTab = ({ courseData }) => {
  return (
    <div className="space-y-6">
      {courseData?.whatYouWillLearn?.length > 0 && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-display text-xl font-bold text-text-1 mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-teal rounded-full" />
            What you'll learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {courseData.whatYouWillLearn.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface-2 transition-colors duration-200"
              >
                <div className="w-5 h-5 bg-teal-soft rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-teal" />
                </div>
                <span className="text-text-2 text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {courseData?.requirements?.length > 0 && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-display text-xl font-bold text-text-1 mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-gold rounded-full" />
            Requirements
          </h2>
          <div className="space-y-2">
            {courseData.requirements.map((req, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface-2 transition-colors duration-200"
              >
                <div className="w-5 h-5 bg-gold-soft rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gold text-xs">•</span>
                </div>
                <span className="text-text-2 text-sm leading-relaxed">
                  {req.trim()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;
