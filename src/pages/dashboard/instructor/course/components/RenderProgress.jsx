import { Check } from "lucide-react";
import React from "react";

const RenderProgress = ({ steps, currentStep }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6  border-dotted border-slate-700 mb-6">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full  transition-all border ${
                  currentStep >= step.id
                    ? "bg-blue-600  border-blue-600 text-white shadow-lg shadow-blue-500/50"
                    : " border-slate-600 text-slate-400"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`ml-3 font-medium transition-colors ${
                  currentStep >= step.id ? "text-white" : "text-slate-400"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="relative mx-4 w-16 h-0.5 bg-slate-600">
                <div
                  className={`absolute inset-0 h-full transition-all duration-300 ${
                    currentStep > step.id ? "bg-blue-600 w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                    currentStep >= step.id
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : "border-slate-600 text-slate-400"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-xs">{step.id}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs text-center font-medium transition-colors ${
                    currentStep >= step.id ? "text-white" : "text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="relative flex-shrink-0 w-8 h-0.5 bg-slate-600 mt-[-20px]">
                  <div
                    className={`absolute inset-0 h-full transition-all duration-300 ${
                      currentStep > step.id ? "bg-blue-600 w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenderProgress;

// const CourseCreationHeader = () => {
//   const step = useSelector((state) => state.course.step);

//   const steps = [
//     { id: 1, title: "Course Details" },
//     { id: 2, title: "Curriculum" },
//     { id: 3, title: "Preview & Submit" },
//   ];

//   return (
//     <div className="w-full mb-8">
//       {/* Step Circles + Connectors */}
//       <div className="relative mb-6 flex w-full items-center justify-center">
//         {steps.map((item, index) => (
//           <div className="flex items-center" key={item.id}>
//             <div
//               className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] transition-all
//                 ${
//                   step === item.id
//                     ? "border-yellow-50 bg-yellow-900 text-yellow-50"
//                     : "border-richblack-700 bg-richblack-800 text-richblack-300"
//                 }
//                 ${step > item.id && "bg-yellow-50 text-richblack-900"}`}
//             >
//               {step > item.id ? <FaCheck className="font-bold" /> : item.id}
//             </div>

//             {/* Connector line */}
//             {index !== steps.length - 1 && (
//               <div
//                 className={`mx-2 h-[2px] w-[90px] border-b-2 border-dashed transition-all
//                   ${
//                     step > item.id ? "border-yellow-50" : "border-richblack-500"
//                   }`}
//               ></div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Titles */}
//       <div className="relative flex w-full justify-between">
//         {steps.map((item) => (
//           <div
//             className="flex min-w-[130px] flex-col items-center gap-y-1"
//             key={item.id}
//           >
//             <p
//               className={`text-lg font-semibold transition-colors
//                 ${
//                   step >= item.id ? "text-richblack-600" : "text-richblack-500"
//                 }`}
//             >
//               {item.title}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseCreationHeader;
