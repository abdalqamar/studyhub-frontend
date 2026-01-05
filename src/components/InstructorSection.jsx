// import { instructors } from "../data/data.js";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import InstructorCard from "./ui/InstructorCard.jsx";
// import "swiper/css";
// import "swiper/css/pagination";
// import HighlightedText from "./ui/HighlightedText.jsx";

// const InstructorSection = () => (
//   <section className="relative py-24 px-6 lg:px-8 bg-slate-900/30">
//     <div className="max-w-7xl mx-auto">
//       <div className="text-center mb-16">
//         <h2 className="text-5xl font-bold mb-6">
//           {/* <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Meet Your Instructor
//           </span> */}

//           <HighlightedText
//             text="Meet Your Instructor"
//             theme="pink"
//             // className="inline-block ml-2"
//           />
//         </h2>
//         <p className="text-xl text-slate-400">
//           Learn from industry experts with real-world experience and proven
//           track records
//         </p>
//       </div>

//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={24}
//         slidesPerView={1}
//         autoplay={{
//           delay: 3500,
//           disableOnInteraction: false,
//           pauseOnMouseEnter: true,
//         }}
//         className="!pb-10"
//       >
//         {instructors.map((ins, i) => (
//           <SwiperSlide key={i}>
//             <InstructorCard instructor={ins} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   </section>
// );

// export default InstructorSection;

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { instructors } from "../data/data";
import HighlightedText from "./ui/HighlightedText";

const InstructorSection = () => {
  const [currentInstructor, setCurrentInstructor] = useState(0);

  const currentData = instructors[currentInstructor];

  const handlePrev = () => {
    setCurrentInstructor((prev) =>
      prev === 0 ? instructors.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentInstructor((prev) =>
      prev === instructors.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="min-h-screen py-20 px-6  relative overflow-hidden">
      {/* Header */}
      <div className="mb-16 mx-auto max-w-7xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <HighlightedText text="Meet Our Instructors" theme="pink" />
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              Learn from industry experts dedicated to guiding you through every
              step of your coding journey at StudyHub.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 ">
        {/* Instructor Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-cyan-600/40"></div>

                {/* Instructor Image */}
                <img
                  src={currentData?.image}
                  alt={currentData.name}
                  className="w-full h-full object-cover mix-blend-overlay"
                />

                {/* Decorative Circle */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-50"></div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {currentData.name}
              </h3>
              <p className="text-slate-400 text-lg mb-6">{currentData.title}</p>

              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  {currentData.description}{" "}
                  <span className="text-white font-bold">
                    {currentData.subscribers}
                  </span>
                  .{" "}
                  {currentData.education.replace(
                    "{students}",
                    <span className="text-white font-bold">
                      {currentData.students}
                    </span>
                  )}{" "}
                  <span className="text-white font-bold">
                    {currentData.companies[0]}
                  </span>{" "}
                  and{" "}
                  <span className="text-white font-bold">
                    {currentData.companies[1]}
                  </span>
                  .
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 mt-8">
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="text-2xl font-bold text-white mb-1">
                    {currentData.students}
                  </div>
                  <div className="text-slate-400 text-sm">
                    Students Mentored
                  </div>
                </div>
              </div>

              {/* Companies */}
              <div className="flex gap-3 mt-6">
                {currentData.companies.map((company, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30 text-blue-400 text-sm font-medium"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {instructors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentInstructor(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentInstructor
                  ? "w-8 bg-blue-500"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
