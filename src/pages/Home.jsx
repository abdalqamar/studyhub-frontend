import { useState } from "react";
import { Link } from "react-router-dom";
import { partners, statsData, features } from "../data/data.js";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import VideoModal from "../components/ui/VideoModal";
import CategorySection from "../components/CategrySection.jsx";
import InstructorSection from "../components/InstructorSection.jsx";
import SuccessStory from "../components/SuccessStory.jsx";
import CTASection from "../components/CTASection.jsx";
import HiglitedText from "../components/ui/HighlightedText.jsx";
import HighlightedText from "../components/ui/HighlightedText.jsx";

const Home = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [liveStudents, setLiveStudents] = useState(1247);

  return (
    <div className="min-h-screen bg-surface-bg text-white relative overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-cyan-600/40"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10 mb-12 sm:mb-16">
            {/* Badge */}
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-[#1e293b] rounded-full mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-cyan-400" />
              <span className="text-xs sm:text-sm text-slate-300">
                Join 50K+ learners transforming their careers
              </span>
            </div>

            {/* Heading - Mobile optimized */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight px-2">
              <span className="text-white block">Master Every</span>
              <HiglitedText text="Skill That Matters" theme="blue" />
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Transform your career with AI-powered courses designed by industry
              leaders. From beginner to expert, forge your path to success.
            </p>

            {/* CTA Buttons - Mobile stacked */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-2">
              <Link
                to={"/login"}
                className="bg-btn-primary hover:to-btn-primary-hover
               px-6 sm:px-7 py-3 sm:py-4 rounded-xl font-semibold text-white text-sm sm:text-base
               transition-all transform hover:scale-105 shadow-xl shadow-blue-500/25
               flex items-center justify-center gap-2 min-h-[52px] sm:h-14"
              >
                Start Learning Free
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              {/* Secondary CTA */}
              <button
                onClick={() => {
                  setShowVideoModal({
                    text1: "Delete this Section?",
                    text2: "All the lectures in this section will be deleted",
                    onClose: () => setShowVideoModal(false),
                  });
                }}
                className="flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-primary-text hover:text-blue-300 border border-blue-500/30 hover:bg-btn-secondary-hover transition-all min-h-[52px] sm:h-14 shadow-md hover:shadow-cyan-500/10"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-cyan-gradient rounded-full flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Live Indicator - Mobile optimized */}
          <div className="text-center px-2">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-800/50 backdrop-blur-xl border border-[#1E40AF] rounded-full">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-xs sm:text-sm font-semibold">
                  LIVE
                </span>
              </div>
              <span className="text-slate-300 text-xs sm:text-sm">
                {liveStudents.toLocaleString()} students learning
              </span>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {showVideoModal && <VideoModal modalData={showVideoModal} />}
      </section>

      {/* 2. Trust & Stats Section */}
      <section className="relative py-16 px-6 lg:px-8 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {statsData.map((stat, id) => {
              const Icon = stat.icon;
              return (
                <div key={id} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600/50 to-cyan-600/50 backdrop-blur-xl border border-blue-500/30 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Trust Partners */}
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full
bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-border-glass mb-8"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-200 font-medium">
                Trusted by teams at top companies worldwide
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {partners.map((partner, id) => (
                <div
                  key={id}
                  className="w-full h-24 group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-400/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 px-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 w-12 object-contain"
                    />
                    <span className="text-slate-400 group-hover:text-white text-sm font-medium tracking-wide transition-colors">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Feature Grid (Selling Points) */}
      <section className="py-20 px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Why Learners <HighlightedText text="Choose us" theme="yellow" />
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to go from zero to hired — at prices that make
              sense.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:hover:border-blue-500/50 hover:scale-[1.02] transition-all duration-300 text-center"
                style={{
                  animation: `fade-up 0.5s ease-out ${index * 100}ms both`,
                }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform w-16 h-16 flex items-center justify-center mx-auto bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full text-white">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
                {/* subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CategorySection />
      <InstructorSection />
      <SuccessStory />

      <CTASection />
    </div>
  );
};

export default Home;
