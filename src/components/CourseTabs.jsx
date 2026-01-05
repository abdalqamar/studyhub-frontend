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
      {/* Tabs Navigation */}
      <div className="bg-slate-800/30 backdrop-blur-sm border-slate-700/ rounded-lg ">
        <div className="grid grid-cols-2 sm:flex sm:flex-nowrap sm:overflow-x-auto sm:scrollbar-hide gap-2 sm:gap-1 p-2 sm:p-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base capitalize font-medium transition-all duration-200 whitespace-nowrap rounded-lg sm:rounded-none ${
                activeTab === tab.id
                  ? "text-white bg-slate-800/50 sm:bg-transparent"
                  : "text-slate-400 hover:text-slate-300 bg-slate-800/30 sm:bg-transparent"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <>
                  <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-t-full"></div>
                  <div className="hidden sm:block absolute inset-0 bg-white/5 rounded-t-lg"></div>
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
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <OverviewTab courseData={courseData} />
            )}

            {/* Curriculum Tab */}
            {activeTab === "curriculum" && (
              <CurriculumTab
                courseData={courseData}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              />
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && <ReviewsTab courseData={courseData} />}

            {/* Instructor Tab */}
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
