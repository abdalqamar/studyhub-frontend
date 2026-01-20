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

import HiglitedText from "../components/ui/HighlightedText";
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-hidden">
      {/* Hero section */}
      <section className="relative overflow-hidden pt-[80px] sm:pt-24 pb-16 sm:pb-24">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#3b82f620,_transparent_50%)]" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="max-w-7xl mx-auto px-6 sm:px-6  relative z-10">
          {/* Badge */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">
                About StudyHub
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              {/* Main Heading */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
                  <span className="text-white">Empowering</span>
                  <br />
                  <HiglitedText text="Every Learner" />
                  <br />
                  <span className="text-white">to Succeed</span>
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
              </div>

              {/* Description */}
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl">
                We're on a mission to democratize quality education. StudyHub
                combines cutting-edge technology with expert instruction to
                create transformative learning experiences.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Shield, text: "Enterprise Grade" },
                  { icon: Zap, text: "AI-Powered" },
                  { icon: Heart, text: "Community First" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm hover:border-blue-500/50 transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4">
                {[
                  {
                    icon: Users,
                    value: "150K+",
                    label: "Active Learners",
                    color: "blue",
                  },
                  {
                    icon: Award,
                    value: "500+",
                    label: "Expert Courses",
                    color: "cyan",
                  },
                  {
                    icon: TrendingUp,
                    value: "95%",
                    label: "Success Rate",
                    color: "emerald",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/30 transition-all hover:transform hover:scale-105"
                  >
                    <stat.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 text-${stat.color}-400`}
                    />
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-first lg:order-last">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />

              {/* Main image container */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-50 group-hover:opacity-75 blur transition-all duration-300" />

                <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
                  <img
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Students learning together"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover opacity-90"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                  {/* Floating card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 sm:p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-emerald-400 text-sm font-semibold">
                        LIVE NOW
                      </span>
                    </div>
                    <p className="text-white font-semibold text-sm sm:text-base mb-1">
                      2,847 students learning right now
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      Join the fastest growing learning community
                    </p>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section  */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-40 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image Side */}
            <div className="relative group order-2 lg:order-1">
              {/* Animated border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />

              <div className="relative rounded-3xl overflow-hidden border border-slate-800/50 bg-slate-900/50">
                <img
                  src="https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Who we are"
                  className="w-full h-72 sm:h-96 object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

                {/* Floating badge */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-lg">
                  <p className="text-white text-sm font-semibold">Since 2019</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full" />
              <div className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-full" />
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Icon badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <Compass className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">
                  Who We Are
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                <span className="text-white">Innovators in</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Modern Learning
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                We're a passionate team of innovators, designers, and educators
                reshaping how the world learns. Our mission is to create
                beautifully simple, effective, and scalable learning solutions
                that inspire growth.
              </p>

              {/* Feature list with icons */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    icon: CheckCircle2,
                    text: "Human-centered design for real learners",
                  },
                  { icon: Zap, text: "Smart automation that saves time" },
                  {
                    icon: TrendingUp,
                    text: "Insightful analytics for better decisions",
                  },
                  { icon: Rocket, text: "Fast, seamless team onboarding" },
                  { icon: Globe, text: "Mobile-first learning experience" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 group hover:translate-x-2 transition-transform"
                  >
                    <div className="mt-0.5 p-1 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <item.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-24 bg-slate-950/50">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1e40af10,_transparent_70%)]" />

        <div className="max-w-6xl mx-auto px-6 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-6">
              {/* Icon badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <Target className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300 font-medium">
                  Our Mission
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                <span className="text-white">Empowering</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Every Learner
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                We believe learning should be inspiring, seamless, and
                accessible to everyone. Our platform empowers learners and
                organizations with the tools, guidance, and motivation needed to
                achieve their full potential.
              </p>

              {/* Mission cards */}
              <div className="grid gap-4 pt-4">
                {[
                  {
                    icon: Heart,
                    title: "Human-First Design",
                    desc: "Built with empathy for real people and their learning journeys",
                    gradient: "from-blue-500/10 to-cyan-500/10",
                  },
                  {
                    icon: Brain,
                    title: "AI-Powered Intelligence",
                    desc: "Smart insights and personalized recommendations that work",
                    gradient: "from-cyan-500/10 to-blue-500/10",
                  },
                  {
                    icon: Globe,
                    title: "Learn Anywhere",
                    desc: "Access your courses from any device, anytime, anywhere",
                    gradient: "from-blue-500/10 to-purple-500/10",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`group relative p-5 rounded-xl border border-slate-800/50 bg-gradient-to-r ${item.gradient} backdrop-blur-sm hover:border-cyan-500/30 transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                        <item.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">
                          {item.title}
                        </p>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />

              <div className="relative rounded-3xl overflow-hidden border border-slate-800/50 bg-slate-900/50">
                <img
                  src="https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our Mission"
                  className="w-full h-72 sm:h-96 object-cover"
                />

                {/* Stats overlay */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                  {[
                    { label: "Countries", value: "32+" },
                    { label: "Success", value: "95%" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-lg p-3"
                    >
                      <p className="text-xs text-slate-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-xl font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -z-10 -top-6 -right-6 w-40 h-40 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats  */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">
                Real Impact
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Transforming Learning
              </span>
              <br />
              <span className="text-white">Worldwide</span>
            </h2>

            <p className="text-slate-400 max-w-2xl mx-auto">
              Measurable results that demonstrate our commitment to excellence
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                label: "Faster Onboarding",
                value: "-37%",
                icon: Rocket,
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                label: "User Rating",
                value: "4.8/5",
                icon: Award,
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                label: "Time Saved",
                value: "120h",
                icon: Zap,
                gradient: "from-blue-500 to-purple-500",
              },
              {
                label: "Global Reach",
                value: "32",
                icon: Globe,
                gradient: "from-purple-500 to-cyan-500",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/50 transition-all overflow-hidden"
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.gradient} bg-opacity-10 mb-4`}
                  >
                    <stat.icon className="w-5 h-5 text-blue-400" />
                  </div>

                  {/* Value */}
                  <p
                    className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}
                  </p>

                  {/* Label */}
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">
                    {stat.label}
                  </p>

                  {/* Accent line */}
                  <div
                    className={`mt-3 h-1 w-12 bg-gradient-to-r ${stat.gradient} rounded-full opacity-50`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-24 bg-slate-950/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#3b82f610,_transparent_50%)]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <Lightbulb className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">
                What Drives Us
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Our Core Values
              </span>
            </h2>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
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
                color: "blue",
              },
              {
                icon: Heart,
                title: "User-First",
                desc: "Every decision prioritizes the learner experience",
                color: "cyan",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "We deliver quality without any compromise",
                color: "blue",
              },
              {
                icon: TrendingUp,
                title: "Growth Mindset",
                desc: "We continuously learn, improve, and evolve",
                color: "cyan",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-blue-500/30 hover:bg-slate-900/50 transition-all"
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${value.color}-500/0 to-${value.color}-500/0 group-hover:from-${value.color}-500/5 group-hover:to-transparent rounded-2xl transition-all`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 rounded-xl bg-${value.color}-500/10 group-hover:bg-${value.color}-500/20 transition-colors mb-4`}
                  >
                    <value.icon className={`w-6 h-6 text-${value.color}-400`} />
                  </div>

                  {/* Content */}
                  <h4 className="font-bold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {value.desc}
                  </p>

                  {/* Arrow icon on hover */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-slate-800/50 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-cyan-400 mb-16">
            Our Journey
          </h2>
          <div className="space-y-8 relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500" />
            {[
              {
                year: "2019",
                event: "Started with a small team and a big vision",
              },
              { year: "2020", event: "Reached 1,000+ active learners" },
              { year: "2022", event: "Launched AI-powered personalization" },
              { year: "2024", event: "Expanded to 50+ enterprise partners" },
            ].map((item, i) => (
              <div key={i} className="pl-20 relative">
                <div className="absolute left-0 top-2 w-12 h-12 rounded-full border-4 border-slate-950 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center" />
                <div className="p-4 rounded-xl border border-slate-800/50 bg-slate-900/30 hover:border-slate-700 transition">
                  <p className="font-bold text-blue-400">{item.year}</p>
                  <p className="text-slate-300">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-800/50 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Ready to transform your team's learning?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations that are already using StudyHub to
            build better teams.
          </p>
          <button className="group relative px-8 py-4 text-lg font-semibold">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl opacity-100 group-hover:opacity-90 transition" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition" />
            <span className="relative text-white">Get Started Free</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
