import { useState } from "react";
import ReviewsTab from "./ReviewsTab";
import InstructorTab from "./InstructorTab";
import CurriculumTab from "./CurriculumTab";
import OverviewTab from "./OverviewTab";

const CourseTabs = ({ courseData, defaultTab = "overview" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (index) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter((i) => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "reviews", label: "Reviews" },
    { id: "instructor", label: "Instructor" },
  ];

  return (
    <div className="w-full">
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden">
        <div className="grid grid-cols-2 sm:flex sm:flex-nowrap sm:overflow-x-auto sm:scrollbar-hide gap-2 sm:gap-0 p-2 sm:p-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base capitalize font-medium transition-all duration-300 whitespace-nowrap rounded-lg sm:rounded-none
              ${
                activeTab === tab.id
                  ? "text-white bg-gradient-to-br from-blue-500/20 to-purple-500/20 sm:bg-none shadow-lg sm:shadow-none border-2 border-blue-400/50 sm:border-0"
                  : "text-slate-400 hover:text-slate-200 bg-slate-800/20 sm:bg-transparent hover:bg-slate-700/30 border-2 border-transparent sm:border-0"
              }`}
            >
              <span className="relative z-10">{tab.label}</span>

              {/* Active indicator for desktop */}
              {activeTab === tab.id && (
                <>
                  <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-pulse"></div>
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-b from-transparent to-white/5"></div>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-8">
            {activeTab === "overview" && (
              <OverviewTab courseData={courseData} />
            )}

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
    </div>
  );
};

export default CourseTabs;
