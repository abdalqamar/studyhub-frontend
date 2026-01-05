// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import CourseDetails from "./components/CourseDetails";
// import Curriculum from "./components/Curriculum";
// import Preview from "./components/Preview";
// import { Check, ChevronLeft, ChevronRight } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useParams } from "react-router-dom";
// import { createCourse } from "../../../../features/courses/courseThunk";
// import RenderProgress from "./components/RenderProgress";

// const CourseCreation = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const location = useLocation();
//   const { courseId } = useParams();
//   const isEditMode = Boolean(courseId);

//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     step1: {
//       courseName: "",
//       courseDescription: "",
//       category: "",
//       price: 0,
//       tags: "",
//       instructions: "",
//       thumbnail: null,
//       benefits: "",
//     },
//     step2: {
//       sections: [],
//     },
//   });

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     watch,
//     setValue,
//     trigger,
//     getValues,
//   } = useForm({
//     defaultValues: formData.step1,
//   });

//   const updateFormData = (step, data) => {
//     setFormData((prev) => ({
//       ...prev,
//       [step]: data,
//     }));
//   };

//   const nextStep = async () => {
//     let isValid = false;

//     if (currentStep === 1) {
//       isValid = await trigger([
//         "courseName",
//         "courseDescription",
//         "category",
//         "price",
//         "tags",
//         "instructions",
//         "thumbnail",
//         "benefits",
//       ]);

//       if (isValid) {
//         updateFormData("step1", getValues());
//       }
//     } else if (currentStep === 2) {
//       const sections = getValues("sections") || [];
//       isValid =
//         sections.length > 0 &&
//         sections.every(
//           (section) =>
//             section.sectionTitle &&
//             section.lectures &&
//             section.lectures.length > 0
//         );

//       if (isValid) {
//         updateFormData("step2", { sections });
//       }
//     }

//     if (isValid) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep((prev) => prev - 1);
//   };

//   const goToStep = (step) => {
//     setCurrentStep(step);
//   };

//   const onSubmit = (data) => {
//     const finalData = {
//       ...formData.step1,
//       ...formData.step2,
//       status: "pending",
//     };
//     dispatch(createCourse(finalData));
//     console.log("Submitting course:", finalData);
//   };

//   const steps = [
//     { number: 1, title: "Course Details" },
//     { number: 2, title: "Curriculum" },
//     { number: 3, title: "Preview & Submit" },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-900 text-slate-100">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-white">
//           {!isEditMode ? "Create New Course" : "Edit Course"}
//         </h1>
//         <p className="text-slate-400 mt-2">Build your course step by step</p>
//       </div>

//       <RenderProgress steps={steps} currentStep={currentStep} />

//       {/* Form Steps */}
//       <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {currentStep === 1 && (
//             <CourseDetails
//               register={register}
//               errors={errors}
//               control={control}
//               setValue={setValue}
//               updateFormData={updateFormData}
//               formData={formData.step1}
//             />
//           )}

//           {currentStep === 2 && (
//             <Curriculum
//               register={register}
//               control={control}
//               errors={errors}
//               setValue={setValue}
//               getValues={getValues}
//               updateFormData={updateFormData}
//               formData={formData.step2}
//             />
//           )}

//           {currentStep === 3 && (
//             <Preview formData={formData} onEditStep={goToStep} />
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
//             <div>
//               {currentStep > 1 && (
//                 <button
//                   type="button"
//                   onClick={prevStep}
//                   className="flex items-center justify-center gap-1 text-slate-300 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-600 hover:border-slate-500"
//                 >
//                   <ChevronLeft />
//                   Back
//                 </button>
//               )}
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3">
//               {currentStep === 3 && (
//                 <button
//                   type="button"
//                   onClick={() => goToStep(1)}
//                   className="flex items-center justify-center gap-2 border border-slate-600 hover:bg-slate-700 text-slate-300 text-sm font-medium px-3 py-2 rounded-lg transition-colors w-full sm:w-auto"
//                 >
//                   <ChevronLeft size={16} className="relative top-[1px]" />
//                   Edit Course
//                 </button>
//               )}

//               {currentStep < 3 ? (
//                 <button
//                   type="button"
//                   onClick={nextStep}
//                   className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white  text-sm font-medium px-3 py-2 rounded-lg transition-colors w-full sm:w-auto"
//                 >
//                   {!isEditMode ? "Next" : "next"}
//                   <ChevronRight />
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
//                 >
//                   Submit Course
//                   <Check size={18} className="relative top-[1px]" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CourseCreation;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  setStep,
  resetCourseState,
} from "../../../../features/courses/courseSlice";
import CourseDetails from "./components/CourseDetails";
import Curriculum from "./components/Curriculum";
import PreviewAndSubmit from "./components/PreviewAndSubmit";
import RenderProgress from "./components/RenderProgress";
import { fetchCourseById } from "../../../../features/courses/courseThunk";
import toast from "react-hot-toast";

const CourseCreation = () => {
  const { step, course, loading } = useSelector((state) => state.course);
  console.log("course from", course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams(); // For edit mode

  const [isEditMode, setIsEditMode] = useState(false);

  // Define steps for RenderProgress
  const steps = [
    { number: 1, title: "Course Details" },
    { number: 2, title: "Curriculum" },
    { number: 3, title: "Preview & Submit" },
  ];

  // Check if we're in edit mode and fetch course data
  useEffect(() => {
    const initializeCourse = async () => {
      if (courseId) {
        setIsEditMode(true);
        try {
          const result = await dispatch(fetchCourseById(courseId)).unwrap();
          if (result) {
            dispatch(setCourse(result));
          }
        } catch (error) {
          console.error("Failed to fetch course details:", error);
        } finally {
          toast.error("error while fetching course");
        }
      }
    };

    initializeCourse();
  }, [courseId, dispatch, navigate]);

  // Handle step navigation
  const handleNextStep = () => {
    if (step < 3) {
      dispatch(setStep(step + 1));
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      dispatch(setStep(step - 1));
    } else {
      // If on first step, go back to courses list
      handleCancel();
    }
  };

  // Handle cancellation
  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? Any unsaved changes will be lost."
      )
    ) {
      dispatch(resetCourseState());
      navigate("/dashboard/my-courses");
    }
  };

  // Render current step content
  const renderStepContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-4 text-slate-300">Loading course data...</p>
        </div>
      );
    }

    switch (step) {
      case 1:
        return <CourseDetails isEdit={isEditMode} onNext={handleNextStep} />;
      case 2:
        return <Curriculum onBack={handlePrevStep} onNext={handleNextStep} />;
      case 3:
        return <PreviewAndSubmit onBack={handlePrevStep} />;
      default:
        return <CourseDetails isEdit={isEditMode} onNext={handleNextStep} />;
    }
  };

  // Render navigation buttons based on current step
  const renderNavigation = () => {
    if (step === 3) return null; // Preview step handles its own navigation

    return (
      <div className="flex justify-between items-center pt-6 border-t border-slate-700">
        <button
          type="button"
          onClick={handlePrevStep}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
        >
          {step === 1 ? "Cancel" : "Back"}
        </button>

        {step === 1 && (
          <button
            type="button"
            onClick={handleNextStep}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!course?._id}
          >
            Next: Curriculum →
          </button>
        )}

        {step === 2 && (
          <button
            type="button"
            onClick={handleNextStep}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next: Preview & Submit →
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-300 mt-4">Loading course data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-4xl mx-auto ">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isEditMode ? "Edit Course" : "Create New Course"}
            {course?.courseTitle && `: ${course.courseTitle}`}
          </h1>
          <p className="text-slate-400">
            {isEditMode
              ? "Update your course information and content"
              : "Build your course step by step"}
          </p>
        </div>

        {/* Progress Indicator */}
        <RenderProgress steps={steps} currentStep={step} />

        {/* Step Content */}
        <div className="mt-5 bg-slate-800 rounded-xl p-6 border border-slate-700">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        {renderNavigation()}
      </div>
    </div>
  );
};

export default CourseCreation;
