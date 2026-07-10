import { useState } from "react";
import OverviewTab from "./OverviewTab";
import CurriculumTab from "./CurriculumTab";
import ReviewsTab from "./ReviewsTab";
import InstructorTab from "./InstructorTab";

const CourseTabs = ({ courseData, defaultTab = "overview" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (index) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "reviews", label: "Reviews" },
    { id: "instructor", label: "Instructor" },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-1 bg-surface-2 border border-border rounded-xl p-1 max-w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-mono text-xs px-4 py-2 rounded-lg transition-all duration-150 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-gold text-bg font-semibold"
                : "text-text-2 hover:text-text-1"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto py-8">
        <div className="space-y-8">
          {activeTab === "overview" && <OverviewTab courseData={courseData} />}
          {activeTab === "curriculum" && (
            <CurriculumTab
              courseData={courseData}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
            />
          )}
          {activeTab === "reviews" && <ReviewsTab courseData={courseData} />}
          {activeTab === "instructor" && (
            <InstructorTab courseData={courseData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseTabs;
