import {
  Sparkles,
  Users,
  Award,
  TrendingUp,
  Zap,
  Shield,
  Heart,
  Target,
  Lightbulb,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Globe,
  Brain,
  Compass,
} from "lucide-react";
import { Link } from "react-router-dom";
import HighlightedText from "../components/ui/HighlightedText";

const colorMap = {
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    grad: "from-blue-500 to-cyan-500",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    grad: "from-cyan-500 to-blue-500",
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    grad: "from-emerald-500 to-teal-500",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    grad: "from-amber-500 to-orange-500",
  },
  indigo: {
    text: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    grad: "from-indigo-500 to-purple-500",
  },
};

function RegMark({ className }) {
  return (
    <span className={`absolute w-4 h-4 pointer-events-none ${className}`}>
      <span className="absolute top-1/2 left-0 w-4 h-px bg-cyan-400/70 -translate-y-1/2" />
      <span className="absolute left-1/2 top-0 w-px h-4 bg-cyan-400/70 -translate-x-1/2" />
    </span>
  );
}

const pageStyle = {
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(34,211,238,0.045) 0px, rgba(34,211,238,0.045) 1px, transparent 1px, transparent 40px)",
};

const heroStats = [
  { icon: Users, value: "50K+", label: "Active Learners", color: "blue" },
  { icon: Award, value: "500+", label: "Expert Courses", color: "cyan" },
  { icon: TrendingUp, value: "4.8", label: "Avg. Rating", color: "emerald" },
];

const missionCards = [
  {
    icon: Heart,
    title: "Human-First Design",
    desc: "Built with empathy for real people and their learning journeys",
    color: "blue",
  },
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    desc: "An AI doubt-solver and smart recommendations that actually help",
    color: "cyan",
  },
  {
    icon: Globe,
    title: "Learn Anywhere",
    desc: "Access your courses from any device, anytime, anywhere",
    color: "indigo",
  },
];

const impactStats = [
  { label: "Avg. Rating", value: "4.8/5", icon: Award, color: "cyan" },
  { label: "Courses Published", value: "500+", icon: Rocket, color: "blue" },
  { label: "Active Learners", value: "50K+", icon: Users, color: "emerald" },
  { label: "Instructors", value: "100+", icon: Globe, color: "indigo" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We push boundaries to build what truly matters",
    color: "blue",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Together we achieve extraordinary results",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Transparency",
    desc: "Honesty builds trust and drives real progress",
    color: "emerald",
  },
  {
    icon: Heart,
    title: "Learner-First",
    desc: "Every decision prioritizes the learner's experience",
    color: "indigo",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We deliver quality without compromise",
    color: "amber",
  },
  {
    icon: TrendingUp,
    title: "Growth Mindset",
    desc: "We continuously learn, improve, and evolve",
    color: "blue",
  },
];

const timeline = [
  { year: "2019", event: "Started with a small team and a big vision" },
  { year: "2020", event: "Reached our first 1,000 learners" },
  { year: "2022", event: "Launched the AI Doubt Solver" },
  { year: "2024", event: "Crossed 500 published courses" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50" style={pageStyle}>
      {/*  HERO  */}
      <section className="relative pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="font-['JetBrains_Mono'] text-xs tracking-wide uppercase text-cyan-300">
                  About StudyHub
                </span>
              </div>

              <div>
                <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
                  <span className="text-white">Empowering</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Every Learner
                  </span>
                  <br />
                  <span className="text-white">to Succeed</span>
                </h1>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                We're on a mission to make quality, project-based education
                accessible to anyone with the will to learn — no enterprise
                contract required.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Zap, text: "AI-Powered Help" },
                  { icon: Rocket, text: "Project-Based" },
                  { icon: Heart, text: "Community First" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900/40 border border-slate-700/50 rounded-lg hover:border-cyan-500/40 transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                {heroStats.map((stat, i) => {
                  const c = colorMap[stat.color];
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/30 transition-colors"
                    >
                      <Icon className={`w-5 h-5 mb-2 ${c.text}`} />
                      <p className="text-2xl font-bold text-white mb-0.5">
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-400">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="relative border border-slate-700/50 rounded-2xl bg-slate-900/40 overflow-hidden">
                <RegMark className="-top-2 -left-2" />
                <RegMark className="-top-2 -right-2" />

                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-700/50">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-['JetBrains_Mono'] text-[11px] text-slate-500">
                    platform.activity
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="relative w-2 h-2 inline-block">
                      <span className="absolute inset-0 rounded-full bg-emerald-400" />
                      <span className="absolute -inset-1 rounded-full border border-emerald-400/50 animate-ping" />
                    </span>
                    <span className="font-['JetBrains_Mono'] text-xs text-emerald-400 tracking-wide">
                      LIVE NOW
                    </span>
                  </div>

                  <p className="font-['Space_Grotesk'] font-bold text-xl text-white mb-1">
                    2,847 learners online
                  </p>
                  <p className="text-sm text-slate-400 mb-6">
                    Across 500+ courses, right now
                  </p>

                  <div className="space-y-2.5 border-t border-slate-700/50 pt-4">
                    <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Completed — React Fundamentals, Module 4</span>
                    </div>
                    <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[11px] text-slate-400">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>Started — SQL for Working Analysts</span>
                    </div>
                    <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[11px] text-slate-400">
                      <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>Certificate earned — UI/UX with Figma</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute -z-10 -bottom-6 -left-6 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-slate-800/50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span className="font-['JetBrains_Mono'] text-xs tracking-wide uppercase text-cyan-300">
                  Who We Are
                </span>
              </div>

              <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl leading-tight">
                <span className="text-white">Innovators in</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Modern Learning
                </span>
              </h2>

              <p className="text-slate-300 leading-relaxed">
                We're a small team reshaping how people learn to code and build
                — beautifully simple, project-driven courses that actually end
                in something you can show.
              </p>

              <div className="space-y-3 pt-1">
                {[
                  {
                    icon: CheckCircle2,
                    text: "Human-centered design for real learners",
                  },
                  { icon: Zap, text: "An AI doubt-solver that saves you time" },
                  {
                    icon: TrendingUp,
                    text: "Clear progress tracking, not vague badges",
                  },
                  { icon: Globe, text: "Mobile-first — learn from anywhere" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 group hover:translate-x-1 transition-transform"
                  >
                    <div className="mt-0.5 p-1 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                      <item.icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-1">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="font-['JetBrains_Mono'] text-xs tracking-wide uppercase text-blue-300">
                  Our Mission
                </span>
              </div>

              {missionCards.map((item, i) => {
                const c = colorMap[item.color];
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className={`group relative p-5 rounded-xl border border-slate-700/50 bg-slate-900/30 hover:${c.border} transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 ${c.bg} rounded-lg flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${c.text}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">
                          {item.title}
                        </p>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-5">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="font-['JetBrains_Mono'] text-xs tracking-wide uppercase text-cyan-300">
                The Numbers
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl text-white">
              Where we stand today
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {impactStats.map((stat, i) => {
              const c = colorMap[stat.color];
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="relative p-6 rounded-2xl border border-slate-700/50 bg-slate-900/30 hover:border-slate-600 transition-all"
                >
                  <div className={`inline-flex p-2 rounded-lg ${c.bg} mb-4`}>
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <p className={`text-3xl font-bold ${c.text} mb-1`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <div
                    className={`mt-3 h-1 w-10 bg-gradient-to-r ${c.grad} rounded-full opacity-60`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/*  VALUES  */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-5">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span className="font-['JetBrains_Mono'] text-xs tracking-wide uppercase text-cyan-300">
                What Drives Us
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl text-white">
              Our core values
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value, i) => {
              const c = colorMap[value.color];
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl border border-slate-700/50 bg-slate-900/30 hover:border-cyan-500/30 transition-all"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl ${c.bg} group-hover:scale-105 transition-transform mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${c.text}`} />
                  </div>
                  <h4 className="font-bold text-lg text-white mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {value.desc}
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className={`w-4 h-4 ${c.text}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/*  TIMELINE  */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl text-center text-white mb-12">
            Our journey
          </h2>
          <div className="space-y-6 relative">
            <div className="absolute left-[23px] top-2 bottom-2 w-px bg-slate-700/50" />
            {timeline.map((item, i) => (
              <div key={i} className="pl-16 relative">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full border-2 border-cyan-400/60 bg-slate-950 flex items-center justify-center font-['JetBrains_Mono'] text-[10px] text-cyan-400">
                  {item.year.slice(2)}
                </div>
                <div className="p-4 rounded-xl border border-slate-700/50 bg-slate-900/30 hover:border-slate-600 transition">
                  <p className="font-['JetBrains_Mono'] text-xs text-cyan-400 mb-1">
                    {item.year}
                  </p>
                  <p className="text-slate-300">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  CTA  */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Ready to start learning?
            </span>
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Join thousands of learners building real skills, one project at a
            time.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-blue-500/20 transition-all"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
