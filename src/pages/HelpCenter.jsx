import { useState } from "react";
import { faqData } from "../data/data";
import { ChevronRight, ChevronUp, Search } from "lucide-react";

const HelpCenter = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-hidden py-24">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Help Center
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Find answers to common questions about our learning platform. Can't
            find what you need? Contact our support team.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-8">
            <div className="relative">
              {/* Icon */}
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />

              {/* Input */}
              <input
                type="text"
                placeholder="Search for answers..."
                aria-label="Search help articles"
                className="w-full pl-12 pr-6 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqData.map((section) => (
            <div
              key={section.id}
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-5 flex justify-between items-center hover:bg-slate-800/50 transition-colors duration-200"
              >
                <h2 className="text-lg text-left">{section.title}</h2>

                <ChevronUp
                  className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
                    openSection === section.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openSection === section.id ? "max-h-[2000px] pb-6" : "max-h-0"
                }`}
              >
                <div className="space-y-4 pt-4 border-t border-slate-700/50">
                  {section.questions.map((item, index) => (
                    <div key={index} className="group">
                      <h3 className="text-lg font-medium text-blue-300 mb-2">
                        {item.q}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">{item.a}</p>
                      {index < section.questions.length - 1 && (
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent my-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-700/30">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Our support team is here to help you with any questions or issues
              you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition-colors duration-200">
                Visit Community Forum
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Video Tutorials", icon: "🎥" },
            { title: "System Status", icon: "📊" },
            { title: "Platform Updates", icon: "🔄" },
            { title: "Instructor Guide", icon: "👨‍🏫" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors duration-200 cursor-pointer"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-medium">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default HelpCenter;
