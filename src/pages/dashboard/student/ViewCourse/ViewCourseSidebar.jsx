// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronDown, Play, Clock, MessageSquare, X } from "lucide-react";
// import ReviewModal from "../../../../components/ReviewModal";
// import LoaderButton from "../../../../components/ui/LoaderButton";

// const ViewCourseSidebar = ({ isSidebarOpen, setIsSidebarOpen, course }) => {
//   const [expandedSection, setExpandedSection] = useState(0);
//   const [showReviewModal, setShowReviewModal] = useState(false);

//   const navigate = useNavigate();
//   const { lessonId, courseId } = useParams();

//   const toggleSection = (index) => {
//     setExpandedSection(expandedSection === index ? -1 : index);
//   };

//   const handleLessonClick = (sectionId, lessonId) => {
//     navigate(
//       `/student/view-course/${courseId}/sections/${sectionId}/lessons/${lessonId}`
//     );
//     if (window.matchMedia("(max-width: 1023px)").matches) {
//       setIsSidebarOpen(false);
//     }
//   };

//   // Calculate total progress and stats
//   const totalLessons =
//     course?.courseContent?.reduce(
//       (total, section) => total + (section.lesson?.length || 0),
//       0
//     ) || 0;

//   const completedLessons =
//     course?.courseContent?.reduce(
//       (total, section) =>
//         total +
//         (section.lesson?.filter((lesson) => lesson.isCompleted)?.length || 0),
//       0
//     ) || 0;

//   return (
//     <>
//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarOpen ? "w-80" : "w-0"
//         } fixed lg:relative bg-slate-800 border-r border-slate-700 transition-all duration-300 overflow-hidden flex flex-col min-h-screen lg:h-auto z-50 lg:z-auto`}
//       >
//         {/* Header */}
//         <div className="p-6 border-b border-slate-700">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-bold text-slate-100 ">
//               {course?.title}
//             </h2>
//             <button
//               onClick={() => setIsSidebarOpen(false)}
//               className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
//             >
//               <X size={20} className="text-slate-400" />
//             </button>
//           </div>

//           {/* Progress Bar */}
//           <div className="flex items-center gap-2">
//             {isSidebarOpen && (
//               <div className="space-y-3 animate-fade-in w-full">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-slate-300 font-medium">Progress</span>
//                   <span className="font-semibold text-blue-400">
//                     {course?.progressPercentage}%
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
//                       style={{ width: `${course?.progressPercentage}%` }}
//                     />
//                   </div>
//                 </div>
//                 <div className="text-xs text-slate-400 flex justify-between">
//                   <span>
//                     {completedLessons} of {totalLessons} lessons
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Sections List */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
//           {course?.courseContent?.map((section, idx) => (
//             <div key={section._id}>
//               {/* Section Header */}
//               <button
//                 onClick={() => toggleSection(idx)}
//                 className="w-full flex items-center justify-between p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left"
//               >
//                 <div className="flex-1 min-w-0">
//                   <h3 className="font-semibold text-slate-100 text-sm truncate">
//                     {section.sectionName}
//                   </h3>
//                   <p className="text-xs text-slate-400 truncate">
//                     {section.lesson?.length} lectures
//                   </p>
//                 </div>
//                 <ChevronDown
//                   size={20}
//                   className={`text-blue-400 transition-transform flex-shrink-0 ml-2 ${
//                     expandedSection === idx ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {/* Lessons */}
//               {expandedSection === idx && (
//                 <div className="mt-2 ml-2 space-y-1 border-l-2 border-slate-600 pl-0">
//                   {section.lesson?.map((lesson) => (
//                     <button
//                       key={lesson._id}
//                       onClick={() => handleLessonClick(section._id, lesson._id)}
//                       className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
//                         lessonId === lesson._id
//                           ? "bg-blue-500 bg-opacity-20 border border-blue-500 text-blue-400"
//                           : "text-slate-400 hover:bg-slate-700"
//                       }`}
//                     >
//                       <div className="flex items-start gap-2">
//                         <Play
//                           size={14}
//                           className={`mt-0.5 flex-shrink-0 ${
//                             lesson.isCompleted ? "text-green-400" : ""
//                           }`}
//                         />
//                         <div className="flex-1 min-w-0">
//                           <p className="font-medium truncate">{lesson.title}</p>
//                           <p className="text-xs opacity-70 flex items-center gap-1 mt-1">
//                             <Clock size={12} />
//                             {lesson.duration}
//                           </p>
//                         </div>
//                         {lesson.isCompleted && (
//                           <div className="text-green-400 text-xs font-bold flex-shrink-0">
//                             ✓
//                           </div>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Review Button */}
//         <div className="p-4 border-t border-slate-700">
//           <LoaderButton
//             onClick={() => setShowReviewModal(true)}
//             text="Add Review"
//             type="button"
//             icon={MessageSquare}
//           />
//         </div>
//       </div>

//       {/* Review Modal */}
//       {showReviewModal && (
//         <ReviewModal
//           setShowReviewModal={setShowReviewModal}
//           courseId={courseId}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />
//       )}
//     </>
//   );
// };

// export default ViewCourseSidebar;

// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronDown, Play, Clock, MessageSquare, X } from "lucide-react";
// import ReviewModal from "../../../../components/ReviewModal";
// import LoaderButton from "../../../../components/ui/LoaderButton";

// const ViewCourseSidebar = ({ isSidebarOpen, setIsSidebarOpen, course }) => {
//   const [expandedSection, setExpandedSection] = useState(0);
//   const [showReviewModal, setShowReviewModal] = useState(false);

//   const navigate = useNavigate();
//   const { lessonId, courseId } = useParams();

//   const toggleSection = (index) => {
//     setExpandedSection(expandedSection === index ? -1 : index);
//   };

//   const handleLessonClick = (sectionId, lessonId) => {
//     navigate(
//       `/student/view-course/${courseId}/sections/${sectionId}/lessons/${lessonId}`
//     );
//     if (window.matchMedia("(max-width: 1023px)").matches) {
//       setIsSidebarOpen(false);
//     }
//   };

//   // Calculate total progress and stats
//   const totalLessons =
//     course?.courseContent?.reduce(
//       (total, section) => total + (section.lesson?.length || 0),
//       0
//     ) || 0;

//   const completedLessons =
//     course?.courseContent?.reduce(
//       (total, section) =>
//         total +
//         (section.lesson?.filter((lesson) => lesson.isCompleted)?.length || 0),
//       0
//     ) || 0;

//   return (
//     <>
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar Container */}
//       <div
//         className={`${
//           isSidebarOpen ? "w-80" : "w-0"
//         } fixed lg:relative bg-slate-800 border-r border-slate-700 transition-[width] duration-300 ease-in-out h-screen lg:h-auto z-50 flex flex-col overflow-hidden`}
//       >
//         <div className="w-80 flex flex-col h-full">
//           {/* Header */}
//           <div className="p-6 border-b border-slate-700 flex-shrink-0">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-bold text-slate-100 truncate pr-4">
//                 {course?.title}
//               </h2>
//               <button
//                 onClick={() => setIsSidebarOpen(false)}
//                 className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
//               >
//                 <X size={20} className="text-slate-400" />
//               </button>
//             </div>

//             {/* Progress Bar */}
//             <div className="space-y-3 animate-fade-in w-full">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-slate-300 font-medium">Progress</span>
//                 <span className="font-semibold text-blue-400">
//                   {course?.progressPercentage}%
//                 </span>
//               </div>
//               <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
//                   style={{ width: `${course?.progressPercentage}%` }}
//                 />
//               </div>
//               <div className="text-xs text-slate-400">
//                 {completedLessons} of {totalLessons} lessons
//               </div>
//             </div>
//           </div>

//           {/* Sections List */}

//           <div className="flex-1 overflow-y-auto p-4 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-500">
//             {course?.courseContent?.map((section, idx) => (
//               <div key={section._id}>
//                 {/* Section Header */}
//                 <button
//                   onClick={() => toggleSection(idx)}
//                   className="w-full flex items-center justify-between p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left group"
//                 >
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-slate-100 text-sm truncate">
//                       {section.sectionName}
//                     </h3>
//                     <p className="text-xs text-slate-400 truncate group-hover:text-slate-300">
//                       {section.lesson?.length} lectures
//                     </p>
//                   </div>
//                   <ChevronDown
//                     size={20}
//                     className={`text-slate-400 group-hover:text-blue-400 transition-transform flex-shrink-0 ml-2 ${
//                       expandedSection === idx ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {/* Lessons */}
//                 {expandedSection === idx && (
//                   <div className="mt-2 ml-2 space-y-1 border-l-2 border-slate-700 pl-0">
//                     {section.lesson?.map((lesson) => (
//                       <button
//                         key={lesson._id}
//                         onClick={() =>
//                           handleLessonClick(section._id, lesson._id)
//                         }
//                         className={`w-full text-left p-3 rounded-lg text-sm transition-all border border-transparent ${
//                           lessonId === lesson._id
//                             ? "bg-blue-500 bg-opacity-20 border-blue-500/50 text-blue-400"
//                             : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
//                         }`}
//                       >
//                         <div className="flex items-start gap-2">
//                           <Play
//                             size={14}
//                             className={`mt-0.5 flex-shrink-0 ${
//                               lesson.isCompleted
//                                 ? "text-green-400"
//                                 : lessonId === lesson._id
//                                 ? "text-blue-400"
//                                 : "text-slate-500"
//                             }`}
//                           />
//                           <div className="flex-1 min-w-0">
//                             <p className="font-medium truncate">
//                               {lesson.title}
//                             </p>
//                             <p className="text-xs opacity-70 flex items-center gap-1 mt-1">
//                               <Clock size={12} />
//                               {lesson.duration}
//                             </p>
//                           </div>
//                           {lesson.isCompleted && (
//                             <div className="text-green-400 text-xs font-bold flex-shrink-0">
//                               ✓
//                             </div>
//                           )}
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Footer: Review Button */}
//           <div className="p-4 border-t border-slate-700 flex-shrink-0 bg-slate-800">
//             <LoaderButton
//               onClick={() => setShowReviewModal(true)}
//               text="Add Review"
//               type="button"
//               icon={MessageSquare}
//               className="w-full"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Review Modal */}
//       {showReviewModal && (
//         <ReviewModal
//           setShowReviewModal={setShowReviewModal}
//           courseId={courseId}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />
//       )}
//     </>
//   );
// };

// export default ViewCourseSidebar;

import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronDown,
  Play,
  Clock,
  MessageSquare,
  X,
  CheckCircle,
} from "lucide-react";

import ReviewModal from "../../../../components/ReviewModal";
import LoaderButton from "../../../../components/ui/LoaderButton";

const ViewCourseSidebar = ({ isSidebarOpen, setIsSidebarOpen, course }) => {
  const [expandedSection, setExpandedSection] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const navigate = useNavigate();
  const { lessonId, courseId } = useParams();

  const activeLessonRef = useRef(null);

  useEffect(() => {
    if (activeLessonRef.current) {
      activeLessonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [lessonId]);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? -1 : index);
  };

  const handleLessonClick = (sectionId, lessonId) => {
    navigate(
      `/student/view-course/${courseId}/sections/${sectionId}/lessons/${lessonId}`
    );

    if (window.matchMedia("(max-width: 1023px)").matches) {
      setIsSidebarOpen(false);
    }
  };
  const handleReviewClick = () => {
    setShowReviewModal(true);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setIsSidebarOpen(false);
    }
  };

  // Calculate total progress and stats
  const totalLessons =
    course?.courseContent?.reduce(
      (total, section) => total + (section.lesson?.length || 0),
      0
    ) || 0;

  const completedLessons =
    course?.courseContent?.reduce(
      (total, section) =>
        total +
        (section.lesson?.filter((lesson) => lesson.isCompleted)?.length || 0),
      0
    ) || 0;

  return (
    <>
      {/* Mobile Overlay  */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`${
          isSidebarOpen
            ? "w-80 translate-x-0"
            : "w-0 -translate-x-full lg:translate-x-0 lg:w-0"
        } fixed lg:relative bg-slate-800 border-r border-slate-700 transition-all duration-300 ease-in-out h-screen lg:h-auto z-50 flex flex-col overflow-hidden shadow-2xl`}
      >
        <div className="w-80 flex flex-col h-full">
          <div className="p-5 border-b border-slate-700 flex-shrink-0 bg-slate-800 sticky top-0">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-extrabold text-slate-100 pr-4 leading-snug line-clamp-2">
                {course?.title || "Course Content"}
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-slate-800 rounded-full transition-colors flex-shrink-0"
                aria-label="Close sidebar"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3 w-full">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">
                  Your Progress
                </span>
                <span className="font-semibold text-teal-400">
                  {course?.progressPercentage || 0}%
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 transition-all duration-500 ease-out"
                  style={{ width: `${course?.progressPercentage || 0}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 flex justify-between">
                <span>
                  {completedLessons} of {totalLessons} lessons completed
                </span>
              </div>
            </div>
          </div>

          {/* Sections List (Scrollable Middle) */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-2 
              [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent 
              [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full 
              hover:[&::-webkit-scrollbar-thumb]:bg-slate-600"
          >
            {course?.courseContent?.map((section, idx) => (
              <div
                key={section._id}
                className="border-b border-slate-700 last:border-b-0"
              >
                {/* Section Header (Accordion Trigger) */}
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between p-3 py-4 hover:bg-slate-800 rounded-lg transition-colors text-left group"
                  aria-expanded={expandedSection === idx}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-bold text-slate-200 text-sm">
                      {idx + 1}. {section.sectionName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {section.lesson?.length} lessons
                    </p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-slate-500 transition-transform flex-shrink-0 ${
                      expandedSection === idx ? "rotate-180 text-blue-400" : ""
                    }`}
                  />
                </button>

                {/* Lessons */}
                {expandedSection === idx && (
                  <div className="mt-1 pb-2 space-y-1">
                    {section.lesson?.map((lesson) => {
                      const isActive = lessonId === lesson._id;
                      const isCompleted = lesson.isCompleted;

                      return (
                        <button
                          key={lesson._id}
                          ref={isActive ? activeLessonRef : null}
                          onClick={() =>
                            handleLessonClick(section._id, lesson._id)
                          }
                          className={`w-full text-left p-3 rounded-lg text-sm transition-all flex items-start gap-2 ${
                            isActive
                              ? "bg-blue-500/20 border border-teal-500/50 text-blue-300 font-semibold"
                              : "text-slate-400 hover:bg-slate-800/80"
                          }`}
                        >
                          {/* Lesson Icon */}
                          <div
                            className={`pt-0.5 flex-shrink-0 ${
                              isCompleted ? "text-green-400" : "text-slate-500"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle size={16} fill="currentColor" />
                            ) : (
                              <Play size={16} />
                            )}
                          </div>

                          {/* Lesson Details */}
                          <div className="flex-1 min-w-0">
                            <p className="truncate leading-snug">
                              {lesson.title}
                            </p>
                            <p className="text-xs opacity-70 flex items-center gap-1 mt-0.5 text-slate-500">
                              <Clock size={12} />
                              {lesson.duration}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-700 flex-shrink-0 bg-slate-800 sticky bottom-0">
            <LoaderButton
              onClick={handleReviewClick}
              text="Add Review"
              type="button"
              icon={MessageSquare}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            />
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          setShowReviewModal={setShowReviewModal}
          courseId={courseId}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </>
  );
};

export default ViewCourseSidebar;
