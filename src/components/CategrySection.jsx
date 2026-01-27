import { TrendingUp, ArrowRight, Star, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useCategories.js";
import HighlightedText from "./ui/HighlightedText.jsx";

const CategrySection = () => {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return <div>Loading Categories.. </div>;
  }

  return (
    <section className="py-16 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm mb-4">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 font-medium">
              Most In-Demand Skills
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            Choose Your{" "}
            <HighlightedText
              text="Learning Path"
              theme="green"
              className="inline-block ml-2"
            />
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Master the skills that top companies are hiring for. Start your
            journey today.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div
                className={`relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:border-slate-600 hover:shadow-2xl bg-gradient-to-br h-[450px] flex flex-col justify-between ${categories.gradient}`}
              >
                {/* Trending Badge */}
                {category.trending && (
                  <div className="absolute top-3 right-3 z-10 group-hover:animate-bounce">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      HOT
                    </div>
                  </div>
                )}

                <div className="relative h-40 overflow-hidden ">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60`}
                  ></div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-400 text-xs mb-4 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-slate-700/40 rounded-lg p-2 text-center">
                      <div className="text-white font-bold text-sm">
                        {category.courses}
                      </div>
                      <div className="text-slate-400 text-[10px]">Courses</div>
                    </div>
                    <div className="bg-slate-700/40 rounded-lg p-2 text-center">
                      <div className="text-cyan-400 font-bold text-sm">
                        {category.students}
                      </div>
                      <div className="text-slate-400 text-[10px]">Students</div>
                    </div>
                    <div className="bg-slate-700/40 rounded-lg p-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-yellow-400 font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs">{category.avgRating}</span>
                      </div>
                      <div className="text-slate-400 text-[10px]">Rating</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={`/student/courses?page=1&category=${category._id}`}>
                    <button className="w-full flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors group-hover:scale-105">
                      Explore Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.accentColor} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4 text-sm">
            Can't decide? Take our 2-minute skill assessment
          </p>
          <Link to={"/login"}>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center gap-2 mx-auto">
              <Compass className="w-5 h-5" />
              Find My Perfect Path
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategrySection;
