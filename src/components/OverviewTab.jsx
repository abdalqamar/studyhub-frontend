// components/tabs/OverviewTab.jsx
import React from "react";
import { Check } from "lucide-react";

const OverviewTab = ({ courseData }) => {
  return (
    <div className="space-y-8">
      {/* What You'll Learn */}
      {courseData?.whatYouWillLearn?.length > 0 && (
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full"></div>
            What you'll learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseData.whatYouWillLearn.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-700/30 transition-all duration-200"
              >
                <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="text-emerald-400" size={14} />
                </div>
                <span className="text-slate-300 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requirements */}
      {courseData?.requirements?.length > 0 && (
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full"></div>
            Requirements
          </h2>
          <div className="space-y-3">
            {courseData.requirements[0].split(",").map((req, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-700/30 transition-all duration-200"
              >
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-sm">•</span>
                </div>

                <span className="text-slate-300 leading-relaxed">
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
