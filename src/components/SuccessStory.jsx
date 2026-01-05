import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import HighlightedText from "./ui/HighlightedText";
import { testimonials } from "../data/data.js";

const SuccessStory = () => {
  const column1 = testimonials.slice(0, 3);
  const column2 = testimonials.slice(3, 6);
  const column3 = testimonials.slice(6, 9);

  const TestimonialCard = ({ testimonial }) => (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <h3 className="text-white font-semibold">{testimonial.name}</h3>
          <p className="text-slate-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-slate-300 leading-relaxed text-sm">
        {testimonial.text}
      </p>
    </div>
  );
  return (
    <section className="min-h-screen py-20 px-4 bg-slate-900 overflow-hidden relative flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What our Student Says
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg">
            Get inspired by real stories from our students — their growth
            reflects the transformative learning experience at StudyHub.
          </p>
        </div>

        {/* Swiper Sliders - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Gradient overlays */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-900 via-slate-900/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pointer-events-none z-10" />

          {/* Column 1 - Auto scroll up */}
          <div className="h-[600px] overflow-hidden">
            <Swiper
              direction="vertical"
              slidesPerView="auto"
              spaceBetween={24}
              loop={true}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              speed={800}
              modules={[Autoplay]}
              className="h-full"
            >
              {[...column1, ...column1, ...column1].map(
                (testimonial, index) => (
                  <SwiperSlide key={`col1-${index}`} className="!h-auto">
                    <TestimonialCard testimonial={testimonial} />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>

          {/* Column 2 - Auto scroll down (reverse) */}
          <div className="h-[600px] overflow-hidden hidden md:block">
            <Swiper
              direction="vertical"
              slidesPerView="auto"
              spaceBetween={24}
              loop={true}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              speed={800}
              modules={[Autoplay]}
              className="h-full"
            >
              {[...column2, ...column2, ...column2].map(
                (testimonial, index) => (
                  <SwiperSlide key={`col2-${index}`} className="!h-auto">
                    <TestimonialCard testimonial={testimonial} />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>

          {/* Column 3 - Auto scroll up */}
          <div className="h-[600px] overflow-hidden hidden md:block">
            <Swiper
              direction="vertical"
              slidesPerView="auto"
              spaceBetween={24}
              loop={true}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              speed={800}
              modules={[Autoplay]}
              className="h-full"
            >
              {[...column3, ...column3, ...column3].map(
                (testimonial, index) => (
                  <SwiperSlide key={`col3-${index}`} className="!h-auto">
                    <TestimonialCard testimonial={testimonial} />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;
