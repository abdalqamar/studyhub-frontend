// components/tabs/InstructorTab.jsx
import React from "react";

const InstructorTab = ({ courseData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
          About the Instructor
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <img
              src={courseData?.instructor?.additionalInformation?.profileImage}
              alt="Instructor"
              className="w-32 h-32 rounded-2xl object-cover shadow-xl border-4 border-slate-600/50"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-3xl font-bold text-white mb-3">
              {courseData?.instructor?.firstName}{" "}
              {courseData?.instructor?.lastName}
            </h3>
            <p className="text-slate-400 mb-6 text-lg">
              {courseData?.instructor?.email}
            </p>
            <p className="text-slate-300 leading-relaxed text-lg">
              {courseData?.instructor?.additionalInformation?.about ||
                "No instructor bio available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorTab;
