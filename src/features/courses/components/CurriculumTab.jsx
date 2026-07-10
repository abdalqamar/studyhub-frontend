import { ChevronDown, ChevronRight, Play } from "lucide-react";

const CurriculumTab = ({ courseData, expandedSections, toggleSection }) => {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="font-display text-xl font-bold text-text-1 flex items-center gap-3">
          <div className="w-1 h-6 bg-gold rounded-full" />
          Course curriculum
        </h2>
        <div className="flex items-center gap-2">
          <span className="bg-surface-2 border border-border px-3 py-1 rounded-full text-xs font-mono text-text-2">
            {courseData?.totalLectures || 0} lectures
          </span>
          <span className="bg-surface-2 border border-border px-3 py-1 rounded-full text-xs font-mono text-text-2">
            {courseData?.totalDuration || "0h 0m"}
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        {courseData?.curriculum?.map((section, index) => {
          const isOpen = expandedSections.includes(index);
          return (
            <div
              key={section._id || index}
              className="bg-surface-2 rounded-xl border border-border-strong overflow-hidden hover:border-gold-dim transition-colors duration-200"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full p-4 flex items-center justify-between hover:bg-surface-raised transition-colors duration-200"
              >
                <div className="flex items-center gap-3 flex-1">
                  {isOpen ? (
                    <ChevronDown className="text-text-3" size={16} />
                  ) : (
                    <ChevronRight className="text-text-3" size={16} />
                  )}
                  <div className="text-left">
                    <h3 className="text-text-1 font-medium text-[14.5px]">
                      {section.sectionName}
                    </h3>
                    <p className="text-xs text-text-3 mt-0.5">
                      {section.lesson?.length || 0} lectures
                    </p>
                  </div>
                </div>
                <span className="text-text-3 text-xs font-mono hidden sm:block">
                  {isOpen ? "Collapse" : "Expand"}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-border-strong">
                  {section.lesson?.map((lecture, lectureIndex) => (
                    <div
                      key={lecture._id || lectureIndex}
                      className="p-3.5 pl-6 flex items-center justify-between hover:bg-surface-raised transition-colors duration-200 border-b border-border-strong last:border-b-0 group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-7 h-7 bg-surface border border-border-strong rounded-full flex items-center justify-center group-hover:border-teal-soft group-hover:bg-teal-soft transition-all duration-200">
                          <Play size={12} className="text-teal" />
                        </div>
                        <span className="text-text-2 text-sm group-hover:text-text-1 transition-colors">
                          {lecture.title}
                        </span>
                      </div>
                      <span className="text-text-3 text-xs font-mono hidden sm:block">
                        {lecture.duration || "5:00"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurriculumTab;
