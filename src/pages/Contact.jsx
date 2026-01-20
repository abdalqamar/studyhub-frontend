import HighlightedText from "../components/ui/HighlightedText";
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-hidden">
      {/* Hero Section  */}
      <section className="relative overflow-hidden pt-20 sm:pt-28 pb-16 sm:pb-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#3b82f620,_transparent_50%)]" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Badge */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">
                Let's Connect
              </span>
            </div>
          </div>

          {/* Hero Text */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4 sm:mb-6">
              <span className="text-white">Ready to</span>
              <br />
              <HighlightedText text="Get Started?" />
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
              Our team is here to help you succeed. Reach out and let's build
              something amazing together.
            </p>
          </div>

          {/* Contact Cards - IMPROVED */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Mail,
                title: "Email Us",
                value: "studyhubinfo@gmail.com",
                desc: "We respond within 24 hours",
                gradient: "from-blue-500 to-cyan-500",
                bgColor: "bg-blue-500/10",
              },
              {
                icon: Phone,
                title: "Call Us",
                value: "+91 7091315565",
                desc: "Available 24/7 for support",
                gradient: "from-cyan-500 to-blue-500",
                bgColor: "bg-cyan-500/10",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                value: "India, Jharkhand",
                desc: "Serving teams worldwide",
                gradient: "from-purple-500 to-cyan-500",
                bgColor: "bg-purple-500/10",
              },
            ].map((contact, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/50 transition-all duration-300"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}
                />

                <div className="relative space-y-3">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 rounded-xl ${contact.bgColor} group-hover:scale-105 transition-transform`}
                  >
                    <contact.icon className="w-6 h-6 text-blue-400" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white">
                    {contact.title}
                  </h3>

                  {/* Value */}
                  <p
                    className={`text-sm font-semibold bg-gradient-to-r ${contact.gradient} bg-clip-text text-transparent break-words`}
                  >
                    {contact.value}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-400">{contact.desc}</p>

                  {/* Accent line */}
                  <div
                    className={`h-1 w-12 bg-gradient-to-r ${contact.gradient} rounded-full opacity-50`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section  */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form - Takes 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                  <Send className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300 font-medium">
                    Send Message
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                  Drop us a line
                </h2>
                <p className="text-slate-400">
                  Fill out the form and our team will get back to you within 24
                  hours.
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800/50 bg-slate-900/50 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition backdrop-blur-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800/50 bg-slate-900/50 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition backdrop-blur-sm"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800/50 bg-slate-900/50 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition backdrop-blur-sm"
                    placeholder="Your Company (Optional)"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Subject *
                  </label>
                  <div className="relative">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-800/50 bg-slate-900/50 text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer backdrop-blur-sm"
                    >
                      <option value="" disabled className="bg-slate-900">
                        Select a subject
                      </option>
                      <option value="sales" className="bg-slate-900">
                        Sales Inquiry
                      </option>
                      <option value="support" className="bg-slate-900">
                        Technical Support
                      </option>
                      <option value="partnership" className="bg-slate-900">
                        Partnership
                      </option>
                      <option value="feedback" className="bg-slate-900">
                        Feedback
                      </option>
                      <option value="other" className="bg-slate-900">
                        Other
                      </option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800/50 bg-slate-900/50 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition resize-none backdrop-blur-sm"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="group relative w-full px-6 py-4 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-100 group-hover:opacity-90 transition" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-xl transition" />
                  <span className="relative flex items-center justify-center gap-2 text-white">
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </span>
                </button>

                {/* Success Message */}
                {submitted && (
                  <div className="p-4 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 flex items-center gap-3 animate-in fade-in">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      Message sent successfully! We'll be in touch soon.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar Info  */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Response */}
              <div className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-blue-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Quick Response
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Our support team typically responds within 24 hours during
                      business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-cyan-500/30 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                    <Clock className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Office Hours
                    </h3>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Monday - Friday</span>
                    <span className="text-slate-300 font-medium">
                      9 AM - 6 PM IST
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Saturday</span>
                    <span className="text-slate-300 font-medium">
                      10 AM - 4 PM IST
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Sunday</span>
                    <span className="text-slate-300 font-medium">Closed</span>
                  </div>
                </div>
              </div>

              {/* Support Channels */}
              <div className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-purple-500/30 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                    <Headphones className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Support Channels
                    </h3>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-slate-300 font-medium">
                        Email Support
                      </p>
                      <p className="text-xs text-slate-500">
                        support@studyhubedu.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <div>
                      <p className="text-slate-300 font-medium">
                        Phone Support
                      </p>
                      <p className="text-xs text-slate-500">+91 7091315565</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fun Stat */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <div className="text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-3xl font-black text-white mb-1">50K+</p>
                  <p className="text-sm text-slate-400">
                    Happy customers worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section  */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-24 bg-slate-950/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e40af08,_transparent_70%)]" />

        <div className="max-w-5xl mx-auto px-6  relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">FAQ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Common Questions
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Find quick answers to frequently asked questions
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                q: "What's your pricing?",
                a: "We offer flexible pricing plans for teams of all sizes. Contact our sales team for a custom quote.",
              },
              {
                q: "Do you offer free trials?",
                a: "Yes! We provide a 14-day free trial with full access. No credit card required.",
              },
              {
                q: "Minimum contract length?",
                a: "We offer both month-to-month and annual plans. Choose what works best for you.",
              },
              {
                q: "What support is included?",
                a: "All plans include email support. Premium plans get priority support and account managers.",
              },
              {
                q: "Can I import existing data?",
                a: "Absolutely! Our team can help you migrate data from your current LMS seamlessly.",
              },
              {
                q: "On-premise deployment?",
                a: "Yes, we offer both cloud and on-premise solutions. Contact sales for details.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-blue-500/30 hover:bg-slate-900/50 transition-all"
              >
                <h3 className="font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
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

      {/* CTA Section  */}
      <section className="relative border-t border-slate-800/50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full mb-8">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">
              Need More Help?
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="text-white">Can't find what</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              you're looking for?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Check out our comprehensive help center and documentation for
            detailed guides.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 font-semibold rounded-xl overflow-hidden transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-100 group-hover:opacity-90 transition" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-xl transition" />
              <span className="relative text-white flex items-center justify-center gap-2">
                Visit Help Center
              </span>
            </button>

            <button className="px-8 py-4 font-semibold rounded-xl border border-slate-700/50 bg-slate-900/30 text-slate-100 hover:border-cyan-500/50 hover:bg-slate-900/50 transition-all">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
