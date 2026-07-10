import { Edit, PlayCircle } from "lucide-react";

const CurriculumPreview = ({ sections, onEditStep }) => (
  <div className="bg-surface rounded-xl p-5 border border-border">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-display text-base">Curriculum</h4>
      <button
        onClick={() => onEditStep(2)}
        className="text-gold text-xs px-3 py-1.5 border border-gold/30 rounded-lg flex items-center gap-1.5 hover:bg-gold-soft"
      >
        <Edit size={13} /> Edit
      </button>
    </div>
    <div className="space-y-3">
      {sections?.map((section, si) => (
        <div key={section._id} className="border border-border p-3.5 rounded-lg">
          <h5 className="text-sm font-medium mb-2">
            <span className="font-mono text-text-3 mr-1.5">{String(si + 1).padStart(2, "0")}</span>
            {section.sectionName}
          </h5>
          <div className="space-y-1.5">
            {section.lesson?.map((lesson, li) => (
              <div key={lesson._id} className="flex items-center justify-between bg-surface-2 rounded-md px-3 py-2 text-xs">
                <div className="flex items-center gap-2 text-text-1 min-w-0">
                  <PlayCircle size={13} className="text-teal flex-shrink-0" />
                  <span className="truncate">{li + 1}. {lesson.title}</span>
                </div>
                {lesson.duration && (
                  <span className="font-mono text-text-3 flex-shrink-0 ml-2">{lesson.duration} min</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CurriculumPreview;
