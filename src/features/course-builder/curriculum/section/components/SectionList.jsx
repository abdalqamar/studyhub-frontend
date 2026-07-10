import { Plus } from "lucide-react";
import SectionItem from "./SectionItem";

// The spine: a vertical rule connecting numbered section markers, since
// curriculum order is a real sequence a student follows — the numbering
// carries meaning here, unlike a decorative 01/02/03.
const SectionList = ({
  sections,
  courseId,
  expandedSections,
  onToggle,
  onDeleteSection,
  onDeleteLesson,
  creatingSection,
}) => {
  if (!sections?.length) {
    if (creatingSection) return null;
    return (
      <div className="text-center py-16 border border-dashed border-border rounded-xl">
        <Plus size={40} strokeWidth={1.5} className="text-text-3 mx-auto mb-3" />
        <p className="text-text-1 font-medium mb-1">No sections yet</p>
        <p className="text-text-3 text-sm">Start by creating your first section</p>
      </div>
    );
  }

  return (
    <div className="relative pl-9">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border-strong" />
      <div className="space-y-4">
        {sections.map((section, index) => (
          <SectionItem
            key={section._id}
            section={section}
            index={index}
            courseId={courseId}
            isExpanded={expandedSections.includes(section._id)}
            onToggle={onToggle}
            onDeleteRequest={onDeleteSection}
            onDeleteLessonRequest={onDeleteLesson}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionList;
