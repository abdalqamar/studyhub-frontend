import { useState } from "react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const [newPost, setNewPost] = useState("");

  const discussions = [
    {
      id: 1,
      title: "Help with React useState hook not updating immediately",
      author: "Sarah Chen",
      course: "React Masterclass 2024",
      replies: 12,
      views: 145,
      lastActivity: "2 hours ago",
      tags: ["react", "hooks", "help"],
      solved: false,
    },
    {
      id: 2,
      title: "Best practices for Node.js error handling",
      author: "Mike Rodriguez",
      course: "Node.js Backend Development",
      replies: 8,
      views: 98,
      lastActivity: "5 hours ago",
      tags: ["nodejs", "backend", "best-practices"],
      solved: true,
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox - when to use which?",
      author: "Emily Watson",
      course: "UI/UX Design Principles",
      replies: 15,
      views: 203,
      lastActivity: "1 day ago",
      tags: ["css", "layout", "design"],
      solved: true,
    },
    {
      id: 4,
      title: "Python pandas performance optimization tips",
      author: "David Kim",
      course: "Python for Data Analysis",
      replies: 6,
      views: 87,
      lastActivity: "2 days ago",
      tags: ["python", "pandas", "performance"],
      solved: false,
    },
  ];

  const studyGroups = [
    {
      id: 1,
      name: "React Study Group",
      course: "React Masterclass 2024",
      members: 23,
      nextSession: "Tomorrow, 7:00 PM",
      active: true,
    },
    {
      id: 2,
      name: "Node.js Coding Sessions",
      course: "Node.js Backend Development",
      members: 18,
      nextSession: "Friday, 6:30 PM",
      active: true,
    },
    {
      id: 3,
      name: "Data Science Study Circle",
      course: "Python for Data Analysis",
      members: 15,
      nextSession: "No session scheduled",
      active: false,
    },
  ];

  const topContributors = [
    { name: "Alex Johnson", points: 245, role: "Mentor" },
    { name: "Maria Garcia", points: 189, role: "Pro" },
    { name: "Tom Wilson", points: 167, role: "Pro" },
    { name: "Sarah Chen", points: 142, role: "Active" },
    { name: "Mike Rodriguez", points: 128, role: "Active" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Community</h1>
        <p className="text-slate-400 mt-2">
          Connect with fellow learners and get help
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Discussions */}
        <div className="lg:col-span-3">
          {/* Create Post */}
          <div className="bg-slate-800 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Start a Discussion
            </h3>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="What's your question or topic?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Post
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-slate-800 rounded-xl p-4 mb-6">
            <div className="flex space-x-2">
              {["discussions", "study-groups", "resources"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {tab.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "discussions" && (
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-white text-lg mb-2">
                        {discussion.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span>By {discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.course}</span>
                      </div>
                    </div>
                    {discussion.solved && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Solved
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {discussion.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span>{discussion.replies} replies</span>
                      <span>{discussion.views} views</span>
                      <span>{discussion.lastActivity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "study-groups" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyGroups.map((group) => (
                <div
                  key={group.id}
                  className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-white text-lg">
                      {group.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        group.active
                          ? "bg-green-500 text-white"
                          : "bg-slate-600 text-slate-300"
                      }`}
                    >
                      {group.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{group.course}</p>
                  <div className="flex justify-between items-center text-sm text-slate-400">
                    <span>{group.members} members</span>
                    <span>{group.nextSession}</span>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    Join Group
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Top Contributors */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="font-bold text-white text-lg mb-4">
              Top Contributors
            </h3>
            <div className="space-y-3">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-medium">
                      {contributor.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">
                        {contributor.name}
                      </div>
                      <div className="text-slate-400 text-xs">
                        {contributor.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-yellow-400 text-sm font-medium">
                    {contributor.points}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="font-bold text-white text-lg mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-sm transition-colors">
                Ask a Question
              </button>
              <button className="w-full text-left bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-sm transition-colors">
                Create Study Group
              </button>
              <button className="w-full text-left bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-sm transition-colors">
                Share Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
