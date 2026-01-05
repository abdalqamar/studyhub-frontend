import { useState } from "react";
import { ChevronDown } from "lucide-react";
import HiglitedText from "../components/ui/HighlightedText";
const About = () => {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-20 ">
        <h1
          className="text-4xl sm:text-5xl font-black tracking-tight 
  bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent 
  text-center mb-12 leading-tight "
        >
          About StudyHub
        </h1>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#3b82f644,_transparent_70%)] pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              We help teams turn <HiglitedText text={"Learning"} />
              into a daily habit.
            </h2>
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              StudyHub is a modern Learning Management System built for
              fast-moving organizations that want to scale their teams smarter.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {[
                "Cloud-native & secure",
                "Built for HR & L&D teams",
                "Loved by learners",
              ].map((b, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/40 backdrop-blur text-sm font-medium hover:border-blue-500/50 transition"
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-10 pt-8">
              {[
                { value: "150k+", label: "Active Learners" },
                { value: "480+", label: "Organizations" },
                { value: "92%", label: "Completion Rate" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold text-blue-400">{s.value}</p>
                  <p className="text-sm text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="About StudyHub"
              className="relative rounded-3xl shadow-2xl border border-slate-800 w-full object-cover h-96"
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="border-t border-slate-800/50 py-24 bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group order-2 md:order-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur opacity-20 group-hover:opacity-30 transition" />
            <img
              src="https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Who we are"
              className="relative rounded-3xl shadow-2xl border border-slate-800 w-full h-96 object-cover"
            />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-blue-400">
              Who We Are
            </h2>
            <p className="text-slate-300 leading-relaxed">
              We're a team of innovators, designers, and educators committed to
              reshaping the modern learning experience. Our mission is to create
              beautifully simple, effective, and scalable learning solutions.
            </p>
            <ul className="space-y-3 text-slate-300">
              {[
                "Human-centered design crafted for real learners",
                "Smart automation that eliminates repetitive work",
                "Insightful analytics that empower better decisions",
                "Fast, seamless team onboarding and upskilling",
                "Mobile-first experience for learning on the go",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="border-t border-slate-800/50 py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-cyan-400">
              Our Mission
            </h2>
            <p className="text-slate-300 leading-relaxed">
              We empower every learner and organization with the tools,
              guidance, and motivation to grow. Learning should feel inspiring,
              seamless, and accessible to everyone.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Human-first", desc: "Designed for real people" },
                { title: "Data-aware", desc: "Insightful analytics" },
                { title: "Always-on", desc: "Learning anywhere" },
              ].map((v, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-800/50 bg-slate-900/30 hover:border-cyan-500/50 transition"
                >
                  <p className="font-semibold text-cyan-400">{v.title}</p>
                  <p className="text-sm text-slate-400">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur opacity-20 group-hover:opacity-30 transition" />
            <img
              src="https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Our Mission"
              className="relative rounded-3xl shadow-2xl border border-slate-800 w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="border-t border-slate-800/50 py-24 bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-400 mb-4">
              Impact in Numbers
            </h2>
            <p className="text-slate-400">
              Our commitment to delivering meaningful learning worldwide
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Ramp Time",
                value: "-37%",
                color: "from-blue-500 to-cyan-500",
              },
              {
                label: "Engagement",
                value: "4.8/5",
                color: "from-cyan-500 to-blue-500",
              },
              {
                label: "Time Saved",
                value: "120h",
                color: "from-blue-500 to-purple-500",
              },
              {
                label: "Countries",
                value: "32",
                color: "from-purple-500 to-cyan-500",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-slate-700 transition"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-5 rounded-2xl transition`}
                />
                <div className="relative">
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
                    {s.label}
                  </p>
                  <p
                    className={`text-4xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-3`}
                  >
                    {s.value}
                  </p>
                  <div
                    className={`h-1 w-12 bg-gradient-to-r ${s.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="border-t border-slate-800/50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cyan-400 mb-4">
              Meet Our Team
            </h2>
            <p className="text-slate-400">
              Passionate creators, engineers, and educators building the future
              of learning
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {["PD", "ENG", "CS", "OPS"].map((tag, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-blue-500/50 hover:bg-slate-900/60 transition"
              >
                <div className="w-full h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl mb-4 flex items-center justify-center text-2xl font-bold text-blue-400 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition">
                  {tag}
                </div>
                <h3 className="font-semibold text-slate-100 mb-1">
                  {tag} Team
                </h3>
                <p className="text-xs text-slate-400">
                  Delivering excellence and continuous improvement in everything
                  we build.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-12 border-t border-slate-800/50">
            <h3 className="text-2xl font-bold text-blue-400 text-center mb-8">
              Leadership
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Abdal Qamar",
                  role: "Founder & CEO",
                  desc: "Leading the vision to create the most intuitive and impactful learning platform",
                },
                {
                  name: "Ishtiyaque Ahmad",
                  role: "Head of Product",
                  desc: "Designing beautiful and meaningful learning experiences through creativity",
                },
              ].map((leader, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-cyan-500/50 transition flex items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex-shrink-0 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition overflow-hidden">
                    <img
                      src={
                        "https://res.cloudinary.com/du7xquzsm/image/upload/v1764320764/Abdal_Instructor_lkrvjh.png"
                      }
                      alt="image"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-100">
                      {leader.name}
                    </p>
                    <p className="text-xs text-blue-400 mb-1">{leader.role}</p>
                    <p className="text-xs text-slate-400">{leader.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-t border-slate-800/50 py-24 bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-400 mb-16">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Innovation",
                desc: "We push boundaries to build what matters",
              },
              { title: "Collaboration", desc: "Together we achieve more" },
              {
                title: "Transparency",
                desc: "Honesty drives trust and progress",
              },
              {
                title: "User-First",
                desc: "Every decision prioritizes the learner",
              },
              {
                title: "Excellence",
                desc: "We deliver quality without compromise",
              },
              {
                title: "Growth Mindset",
                desc: "We learn, improve, and evolve",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-cyan-500/50 hover:bg-slate-900/60 transition"
              >
                <h4 className="font-semibold text-slate-100 mb-2 group-hover:text-cyan-400 transition">
                  {v.title}
                </h4>
                <p className="text-sm text-slate-400">{v.desc}</p>
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

      {/* FAQ */}
      <section className="border-t border-slate-800/50 py-24 bg-slate-950/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-400 mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is StudyHub easy to use?",
                a: "Absolutely! We've designed StudyHub with simplicity in mind. The intuitive interface requires minimal training, and most teams are up and running within hours.",
              },
              {
                q: "Can it scale with my organization?",
                a: "Yes. StudyHub is built to scale seamlessly from small teams to large enterprises. Our cloud infrastructure handles millions of learners globally.",
              },
              {
                q: "What kind of support do you provide?",
                a: "We offer 24/7 dedicated support, comprehensive onboarding, training resources, and a thriving community of users and experts.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-slate-800/50 rounded-xl overflow-hidden bg-slate-900/30 hover:border-slate-700 transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-900/50 transition"
                >
                  <p className="font-semibold text-slate-100 text-left">
                    {item.q}
                  </p>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-400 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-400 border-t border-slate-800/50 animate-in fade-in">
                    {item.a}
                  </div>
                )}
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
