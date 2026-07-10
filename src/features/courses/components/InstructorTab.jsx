import React from "react";

const InstructorTab = ({ courseData }) => {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <h2 className="font-display text-xl font-bold text-text-1 mb-6 flex items-center gap-3">
        <div className="w-1 h-6 bg-gold rounded-full" />
        About the instructor
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <img
          src={courseData?.instructor?.additionalInformation?.profileImage}
          alt="Instructor"
          className="w-24 h-24 rounded-2xl object-cover border border-border-strong flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl font-semibold text-text-1 mb-1">
            {courseData?.instructor?.firstName}{" "}
            {courseData?.instructor?.lastName}
          </h3>
          <p className="text-text-3 text-sm font-mono mb-4">
            {courseData?.instructor?.email}
          </p>
          <p className="text-text-2 leading-relaxed">
            {courseData?.instructor?.additionalInformation?.about ||
              "No instructor bio available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructorTab;
