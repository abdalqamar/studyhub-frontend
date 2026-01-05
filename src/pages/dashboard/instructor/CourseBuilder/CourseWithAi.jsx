import React, { useState } from "react";
import {
  Sparkles,
  X,
  Loader2,
  ChevronRight,
  ChevronDown,
  Lightbulb,
} from "lucide-react";

const CourseDetailsWithAI = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    tags: [],
    whatYouWillLearn: [""],
    requirements: "",
    instructions: "",
  });

  const [aiSuggestions, setAiSuggestions] = useState({});
  const [loadingField, setLoadingField] = useState(null);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const categories = [
    { _id: "1", name: "Web Development" },
    { _id: "2", name: "Data Science" },
    { _id: "3", name: "Mobile Development" },
    { _id: "4", name: "Design" },
  ];

  // Simulate AI suggestion generation
  const generateAISuggestion = async (field, context) => {
    setLoadingField(field);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const suggestions = {
      title: [
        "Complete React Development Bootcamp 2024",
        "Master Modern Web Development with React & Node.js",
        "Full-Stack Web Development: Zero to Hero",
      ],
      description: [
        "Learn to build professional web applications from scratch using the latest technologies. This comprehensive course covers everything from frontend design to backend development, including React, Node.js, MongoDB, and deployment strategies.",
        "Transform your career with this intensive bootcamp that teaches you in-demand skills. Master React hooks, state management, RESTful APIs, and modern development workflows used by top tech companies.",
        "A project-based learning experience where you'll build 5 real-world applications while learning best practices, testing, and professional development techniques.",
      ],
      whatYouWillLearn: [
        "Build modern, responsive web applications using React",
        "Master state management with Redux and Context API",
        "Create RESTful APIs with Node.js and Express",
        "Implement authentication and authorization",
        "Deploy applications to production environments",
      ],
      requirements: [
        "Basic understanding of HTML, CSS, and JavaScript\nA computer with internet connection\nWillingness to learn and practice coding daily",
        "Familiarity with programming concepts\nNo prior React experience needed\nEnthusiasm for web development",
        "JavaScript fundamentals (variables, functions, arrays)\nBasic command line knowledge\nA code editor (VS Code recommended)",
      ],
      instructions: [
        "Complete each section in order before moving to the next\nCode along with video tutorials\nComplete all practice exercises\nBuild the capstone project\nJoin our Discord community for support",
        "Watch lectures at your own pace\nPractice coding daily for at least 1 hour\nAsk questions in the Q&A section\nReview code examples before attempting challenges",
        "Follow the course roadmap sequentially\nTake notes on important concepts\nBuild your own projects alongside course projects\nParticipate in weekly code reviews",
      ],
    };

    setAiSuggestions((prev) => ({
      ...prev,
      [field]: suggestions[field] || [],
    }));
    setLoadingField(null);
    setShowAiPanel(true);
    setActiveField(field);
  };

  const applySuggestion = (field, suggestion) => {
    if (field === "whatYouWillLearn" && Array.isArray(suggestion)) {
      setFormData((prev) => ({ ...prev, [field]: suggestion }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: suggestion }));
    }
    setShowAiPanel(false);
  };

  const AIButton = ({ field, label, context }) => (
    <button
      type="button"
      onClick={() => generateAISuggestion(field, context)}
      disabled={loadingField === field}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      {loadingField === field ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Sparkles className="w-4 h-4" />
      )}
      {loadingField === field ? "Generating..." : `AI Suggest ${label}`}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Course Details</h1>
          <p className="text-slate-400">
            Fill in your course information with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-6">
              {/* Title */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-medium text-slate-300">
                    Course Name *
                  </label>
                  <AIButton field="title" label="Title" />
                </div>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Complete Web Development Bootcamp"
                  className="w-full p-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-medium text-slate-300">
                    Description *
                  </label>
                  <AIButton field="description" label="Description" />
                </div>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe what students will learn in this course..."
                  className="w-full p-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Price + Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="2999"
                    className="w-full p-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full p-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* What You Will Learn */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-medium text-slate-300">
                    What You Will Learn
                  </label>
                  <AIButton field="whatYouWillLearn" label="Points" />
                </div>
                <div className="space-y-2">
                  {formData.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...formData.whatYouWillLearn];
                          newItems[index] = e.target.value;
                          setFormData({
                            ...formData,
                            whatYouWillLearn: newItems,
                          });
                        }}
                        placeholder={`Learning point ${index + 1}`}
                        className="flex-1 p-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        whatYouWillLearn: [...formData.whatYouWillLearn, ""],
                      })
                    }
                    className="text-blue-400 text-sm hover:text-blue-300"
                  >
                    + Add more
                  </button>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-medium text-slate-300">
                    Requirements
                  </label>
                  <AIButton field="requirements" label="Requirements" />
                </div>
                <textarea
                  rows="3"
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  placeholder="What do students need before taking this course?"
                  className="w-full p-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Instructions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-medium text-slate-300">
                    Instructions for Students
                  </label>
                  <AIButton field="instructions" label="Instructions" />
                </div>
                <textarea
                  rows="3"
                  value={formData.instructions}
                  onChange={(e) =>
                    setFormData({ ...formData, instructions: e.target.value })
                  }
                  placeholder="How should students approach this course?"
                  className="w-full p-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-slate-700">
                <button
                  type="button"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Suggestions Panel */}
          <div className="lg:col-span-1">
            <div
              className={`bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 sticky top-8 transition-all ${
                showAiPanel ? "opacity-100" : "opacity-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold">AI Suggestions</h3>
              </div>

              {!showAiPanel ? (
                <div className="text-center py-8">
                  <Lightbulb className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">
                    Click any "AI Suggest" button to get intelligent suggestions
                    for your course
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-sm text-slate-400 mb-3">
                    Suggestions for{" "}
                    <span className="text-purple-400 font-medium">
                      {activeField}
                    </span>
                    :
                  </div>

                  {aiSuggestions[activeField]?.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => applySuggestion(activeField, suggestion)}
                      className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg hover:border-purple-500 cursor-pointer transition-all group"
                    >
                      {Array.isArray(suggestion) ? (
                        <ul className="text-sm text-slate-300 space-y-1">
                          {suggestion.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-purple-400">•</span>
                              <span className="group-hover:text-white transition">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-300 group-hover:text-white transition whitespace-pre-line">
                          {suggestion}
                        </p>
                      )}
                      <div className="mt-2 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition">
                        Click to apply →
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => setShowAiPanel(false)}
                    className="w-full mt-4 px-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-600 rounded-lg hover:border-slate-500 transition"
                  >
                    Close Suggestions
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsWithAI;
