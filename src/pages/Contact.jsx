import HighlightedText from "../components/ui/HighlightedText";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader,
  ChevronDown,
  Clock,
  Zap,
  MessageCircle,
  Globe,
  Sparkles,
  CheckCircle2,
  Headphones,
  Users,
} from "lucide-react";

const colorMap = {
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    grad: "from-blue-500 to-cyan-500",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    grad: "from-cyan-500 to-blue-500",
  },
  indigo: {
    text: "text-indigo-400",
    bg: "bg-indigo-500/10",
    grad: "from-indigo-500 to-purple-500",
  },
};

const SUPPORT_EMAIL = "studyhubinfo@gmail.com";
const SUPPORT_PHONE = "+91 7091315565";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    value: SUPPORT_EMAIL,
    desc: "We respond within 24 hours",
    color: "blue",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: SUPPORT_PHONE,
    desc: "Mon–Sat, 9 AM – 6 PM IST",
    color: "cyan",
  },
  {
    icon: MapPin,
    title: "Based In",
    value: "Jharkhand, India",
    desc: "Serving learners online, everywhere",
    color: "indigo",
  },
];

const faqs = [
  {
    q: "Are courses free or paid?",
    a: "Most courses are free. A few advanced paths have a small one-time fee — pricing is always shown before you enroll, no surprises.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes — every course you complete gives you a certificate you can add to your resume or LinkedIn.",
  },
  {
    q: "How long do I have access to a course?",
    a: "Lifetime access. Once you enroll, the course is yours — including any future updates to the content.",
  },
  {
    q: "Can I get help if I'm stuck on a problem?",
    a: "Yes — use the AI Doubt Solver inside any course for instant help, or post in the course discussion for human answers.",
  },
  {
    q: "What if a course isn't what I expected?",
    a: "Reach out within 7 days of enrolling and we'll sort it out — refund or course swap, your call.",
  },
  {
    q: "Do you offer instructor accounts?",
    a: "Yes — apply through the instructor application page and our team will review your submission.",
  },
];

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50" style={pageStyle}>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span className="font-['JetBrains_Mono'] text-xs tracking-wide uppercase text-cyan-300">
                Let's Connect
              </span>
            </div>

            <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
              <span className="text-white">Ready to</span>
              <br />
              <HighlightedText text="Get Started?" />
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Have a question about a course, your account, or anything else?
              We're here to help.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {contactMethods.map((c, i) => {
              const colors = colorMap[c.color];
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="relative p-5 rounded-2xl border border-slate-700/50 bg-slate-900/30 hover:border-slate-600 transition-all"
                >
                  <div
                    className={`inline-flex p-2.5 rounded-xl ${colors.bg} mb-3`}
                  >
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {c.title}
                  </h3>
                  <p
                    className={`text-sm font-semibold ${colors.text} break-words mb-1`}
                  >
                    {c.value}
                  </p>
                  <p className="text-xs text-slate-400">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative border-t border-slate-800/50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span className="font-['JetBrains_Mono'] text-xs tracking-wide uppercase text-cyan-300">
                    Send Message
                  </span>
                </div>
                <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-white mb-2">
                  Drop us a line
                </h2>
                <p className="text-slate-400 text-sm">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-['JetBrains_Mono'] text-[10.5px] uppercase tracking-wide text-slate-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-700/50 bg-slate-900/40 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-['JetBrains_Mono'] text-[10.5px] uppercase tracking-wide text-slate-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-700/50 bg-slate-900/40 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono'] text-[10.5px] uppercase tracking-wide text-slate-400 mb-2">
                    Subject *
                  </label>
                  <div className="relative">
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-lg border border-slate-700/50 bg-slate-900/40 text-white focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 appearance-none cursor-pointer transition-all"
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="course">Course Question</option>
                      <option value="account">Account / Billing</option>
                      <option value="technical">Technical Issue</option>
                      <option value="instructor">Become an Instructor</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono'] text-[10.5px] uppercase tracking-wide text-slate-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-700/50 bg-slate-900/40 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 resize-none transition-all"
                    placeholder="Tell us more..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-5 py-2.5 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {submitted && (
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-300 flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      Message sent! We'll be in touch soon.
                    </span>
                  </div>
                )}
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">
              <div className="p-5 rounded-2xl border border-slate-700/50 bg-slate-900/30 hover:border-cyan-500/30 transition-all">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-cyan-500/10 rounded-xl">
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1.5">
                      Quick Response
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      We typically reply within 24 hours on business days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-700/50 bg-slate-900/30 hover:border-blue-500/30 transition-all">
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="p-2.5 bg-blue-500/10 rounded-xl">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white">Office Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mon – Fri</span>
                    <span className="text-slate-300">9 AM – 6 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saturday</span>
                    <span className="text-slate-300">10 AM – 4 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sunday</span>
                    <span className="text-slate-300">Closed</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-700/50 bg-slate-900/30 hover:border-indigo-500/30 transition-all">
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl">
                    <Headphones className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-white">Support Channels</h3>
                </div>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
                    <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <p className="text-slate-300 text-xs truncate">
                      {SUPPORT_EMAIL}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
                    <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <p className="text-slate-300 text-xs">{SUPPORT_PHONE}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-center">
                <Users className="w-7 h-7 text-cyan-400 mx-auto mb-2.5" />
                <p className="text-2xl font-bold text-white mb-1">50K+</p>
                <p className="text-sm text-slate-400">
                  Learners we get to help
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-['JetBrains_Mono'] text-xs tracking-wide uppercase text-cyan-300">
                FAQ
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl text-white mb-3">
              Common questions
            </h2>
            <p className="text-slate-400">
              Quick answers — for anything else, just reach out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="group p-5 rounded-2xl border border-slate-700/50 bg-slate-900/30 hover:border-cyan-500/30 transition-all"
              >
                <h3 className="font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cta Section */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="font-['JetBrains_Mono'] text-xs tracking-wide uppercase text-cyan-300">
              Need More Help?
            </span>
          </div>

          <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl mb-4 leading-tight">
            <span className="text-white">Can't find what</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              you're looking for?
            </span>
          </h2>

          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Check out the Help Center for detailed guides and answers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/help"
              className="px-7 py-2.5 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-blue-500/20 transition-all"
            >
              Visit Help Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
