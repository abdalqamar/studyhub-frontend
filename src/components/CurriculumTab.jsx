import { ChevronDown, ChevronRight, Play } from "lucide-react";

const CurriculumTab = ({ courseData, expandedSections, toggleSection }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
            Course Curriculum
          </h2>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="bg-slate-700/50 px-3 py-1 rounded-full text-sm">
              {courseData?.totalLectures || 0} lectures
            </span>
            <span className="bg-slate-700/50 px-3 py-1 rounded-full text-sm">
              {courseData?.totalDuration || "0h 0m"}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {courseData?.curriculum?.map((section, index) => (
            <div
              key={section._id || index}
              className="bg-slate-700/20 rounded-xl border border-slate-600/30 overflow-hidden hover:border-slate-500/50 transition-all duration-200"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-600/20 transition-all duration-200"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-3 flex-1">
                    {expandedSections.includes(index) ? (
                      <ChevronDown className="text-slate-400" size={20} />
                    ) : (
                      <ChevronRight className="text-slate-400" size={20} />
                    )}
                    <div className="text-left">
                      <h3 className="text-white font-semibold text-lg">
                        {section.sectionName}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {section.lesson?.length || 0} lectures
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm hidden sm:block">
                    {expandedSections.includes(index) ? "Collapse" : "Expand"}
                  </div>
                </div>
              </button>

              {expandedSections.includes(index) && (
                <div className="border-t border-slate-600/30 bg-slate-800/20">
                  {section.lesson?.map((lecture, lectureIndex) => (
                    <div
                      key={lecture._id || lectureIndex}
                      className="p-4 flex items-center justify-between hover:bg-slate-700/30 transition-all duration-200 border-b border-slate-600/20 last:border-b-0 group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-8 h-8 bg-slate-600/50 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 transition-all duration-200">
                          <Play className="text-emerald-400" size={14} />
                        </div>
                        <span className="text-slate-300 group-hover:text-white transition-colors">
                          {lecture.title}
                        </span>
                      </div>
                      <div className="text-slate-500 text-sm hidden sm:block">
                        {lecture.duration || "5:00"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumTab;
