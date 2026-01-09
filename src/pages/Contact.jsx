import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader, ChevronDown } from "lucide-react";
import HighlightedText from "../components/ui/HighlightedText";

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
      {/* Header */}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-20">
        {/* Title + Subtitle */}
        <div className="flex flex-col items-center text-center px-4 max-w-md mx-auto mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold  ">
            <HighlightedText text="Get in Touch" theme="blue" />
          </h1>

          <p className="text-slate-400 mt-2 text-base sm:text-lg">
            We'd love to hear from you. Reach out to our team.
          </p>
        </div>

        {/* Background Shapes */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#3b82f644,_transparent_70%)] pointer-events-none" />
        <div className="absolute top-24 left-0 w-56 h-56 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        {/* Hero Text */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight leading-tight">
              Let's Connect and{" "}
              <HighlightedText text="Collaborate" theme="blue" />
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto px-2">
              Whether you have questions, need support, or want to partner with
              us, our team is ready to help you succeed with studyhubedu.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-12 md:mb-16">
            {[
              {
                icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Email",
                value: "studyhubinfo@gmail.com",
                desc: "We respond within 24 hours",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Phone",
                value: "+91 7091315565",
                desc: "Available 24/7 for support",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Location",
                value: "India, Jharkhand",
                desc: "Serving teams worldwide",
                gradient: "from-purple-500 to-cyan-500",
              },
            ].map((contact, i) => (
              <div
                key={i}
                className="group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${contact.gradient} opacity-0 group-hover:opacity-5 rounded-xl sm:rounded-2xl transition-opacity duration-300`}
                />
                <div className="relative space-y-2.5 sm:space-y-3">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r ${contact.gradient} p-2 sm:p-2.5 text-white group-hover:shadow-lg group-hover:scale-105 transition-all duration-300`}
                  >
                    {contact.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-100">
                    {contact.title}
                  </h3>
                  <p className="text-blue-400 font-medium text-sm sm:text-base break-words">
                    {contact.value}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {contact.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="border-t border-slate-800/50 py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-blue-400 mb-2">
                Send us a Message
              </h2>
              <p className="text-slate-400">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800/50 bg-slate-900/30 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800/50 bg-slate-900/30 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition"
                  placeholder="john@company.com"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800/50 bg-slate-900/30 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition"
                  placeholder="Your Company"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-700/50 bg-slate-800/50 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 appearance-none cursor-pointer hover:bg-slate-800/70 backdrop-blur-sm"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-slate-900 text-slate-400"
                    >
                      Select a subject
                    </option>
                    <option
                      value="sales"
                      className="bg-slate-900 text-slate-100 py-2"
                    >
                      Sales Inquiry
                    </option>
                    <option
                      value="support"
                      className="bg-slate-900 text-slate-100 py-2"
                    >
                      Technical Support
                    </option>
                    <option
                      value="partnership"
                      className="bg-slate-900 text-slate-100 py-2"
                    >
                      Partnership
                    </option>
                    <option
                      value="feedback"
                      className="bg-slate-900 text-slate-100 py-2"
                    >
                      Feedback
                    </option>
                    <option
                      value="other"
                      className="bg-slate-900 text-slate-100 py-2"
                    >
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
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800/50 bg-slate-900/30 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="group relative w-full px-6 py-3 font-semibold rounded-xl overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-100 group-hover:opacity-90 transition" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-lg transition" />
                <span className="relative flex items-center justify-center gap-2 text-white">
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </span>
              </button>

              {/* Success Message */}
              {submitted && (
                <div className="p-4 rounded-xl border border-green-500/50 bg-green-500/10 text-green-300 text-center text-sm font-medium animate-in fade-in">
                  ✓ Message sent successfully! We'll be in touch soon.
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Info */}
          <div className="space-y-8">
            {/* Response Time */}
            <div className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-blue-500/50 transition">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Quick Response Time
              </h3>
              <p className="text-slate-300">
                Our support team typically responds within 24 hours. For urgent
                matters, give us a call at{" "}
                <span className="text-cyan-400 font-medium">
                  +1 (555) 123-4567
                </span>
                .
              </p>
            </div>

            {/* Office Hours */}
            <div className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-cyan-500/50 transition">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Office Hours
              </h3>
              <div className="space-y-2 text-slate-300 text-sm">
                <p>
                  <span className="text-slate-400">Monday - Friday:</span> 9:00
                  AM - 6:00 PM PST
                </p>
                <p>
                  <span className="text-slate-400">Saturday:</span> 10:00 AM -
                  4:00 PM PST
                </p>
                <p>
                  <span className="text-slate-400">Sunday:</span> Closed
                </p>
              </div>
            </div>

            {/* Departments */}
            <div className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-purple-500/50 transition">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">
                Contact Departments
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-100 font-medium">Sales</p>
                  <p className="text-slate-400">sales@studyhubedu.com</p>
                </div>
                <div>
                  <p className="text-slate-100 font-medium">Support</p>
                  <p className="text-slate-400">support@studyhubedu.com</p>
                </div>
                <div>
                  <p className="text-slate-100 font-medium">Partnerships</p>
                  <p className="text-slate-400">partners@studyhubedu.com</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-slate-700 transition">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {["LinkedIn", "Twitter", "Facebook", "Instagram"].map(
                  (social, i) => (
                    <button
                      key={i}
                      className="w-10 h-10 rounded-lg border border-slate-800/50 bg-slate-900/50 hover:border-blue-500/50 hover:bg-slate-900 transition flex items-center justify-center text-slate-400 hover:text-blue-400"
                    >
                      {social[0]}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-slate-800/50 py-24 bg-slate-950/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-400 mb-4">
              Common Questions
            </h2>
            <p className="text-slate-400">
              Find answers to frequently asked questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "What's your pricing?",
                a: "We offer flexible pricing plans for teams of all sizes. Contact our sales team for a custom quote based on your needs.",
              },
              {
                q: "Do you offer free trials?",
                a: "Yes! We provide a 14-day free trial with full access to all features. No credit card required.",
              },
              {
                q: "Is there a minimum contract length?",
                a: "We offer month-to-month or annual plans. Choose what works best for your organization.",
              },
              {
                q: "What kind of support is included?",
                a: "All plans include email support. Premium plans include priority support and dedicated account managers.",
              },
              {
                q: "Can I import my existing data?",
                a: "Absolutely! Our migration team can help you transfer data from your current LMS seamlessly.",
              },
              {
                q: "Do you offer on-premise deployment?",
                a: "Yes, we offer both cloud and on-premise solutions. Contact our sales team for details.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-cyan-500/50 transition"
              >
                <h3 className="font-semibold text-slate-100 mb-2 group-hover:text-cyan-400 transition">
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="border-t border-slate-800/50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cyan-400 mb-4">
              Our Offices
            </h2>
            <p className="text-slate-400">
              Visit us or connect with our global team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                city: "San Francisco",
                address: "123 Market St, San Francisco, CA 94105",
                phone: "+1 (415) 555-0123",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                city: "London",
                address: "456 Oxford St, London, UK W1C 1AP",
                phone: "+44 (20) 1234 5678",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                city: "Singapore",
                address: "789 Marina Bay, Singapore 018971",
                phone: "+65 6123 4567",
                gradient: "from-purple-500 to-cyan-500",
              },
            ].map((office, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:border-slate-700 transition"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${office.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition pointer-events-none`}
                />
                <div className="relative">
                  <h3
                    className={`text-xl font-bold bg-gradient-to-r ${office.gradient} bg-clip-text text-transparent mb-3`}
                  >
                    {office.city}
                  </h3>
                  <div className="space-y-3 text-sm text-slate-300">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span>{office.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{office.phone}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-800/50 py-24 bg-slate-950/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-4 tracking-tight">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Check out our comprehensive help center and documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-3 font-semibold rounded-xl overflow-hidden transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-100 group-hover:opacity-90 transition" />
              <span className="relative text-white">Visit Help Center</span>
            </button>
            <button className="px-8 py-3 font-semibold rounded-xl border border-slate-800/50 text-slate-100 hover:border-cyan-500/50 hover:bg-slate-900/50 transition">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
