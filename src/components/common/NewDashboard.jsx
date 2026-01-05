import React from "react";

// Sample Data for the Dashboard
const user = {
  name: "Alex Johnson",
  level: "Intermediate Developer",
  progress: 75,
  certifications: 3,
  hours: 120,
};

const coursesInProgress = [
  {
    id: 101,
    title: "Mastering Modern React",
    progress: 85,
    nextLesson: "Hooks & Context API",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.75 17L19.5 7.25M9.75 17l-4 4m0-4l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
  {
    id: 102,
    title: "Data Science with Python",
    progress: 42,
    nextLesson: "Pandas DataFrames",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4.354a4 4 0 110 5.292M15 15l2 2m0 0l-2 2m2-2l-2-2m-4-2H5a2 2 0 00-2 2v2a2 2 0 002 2h6v-2h-2m2-4H5a2 2 0 00-2 2v2a2 2 0 002 2h6v-2h-2m2-4H5a2 2 0 00-2 2v2a2 2 0 002 2h6v-2h-2"
        />
      </svg>
    ),
  },
  {
    id: 103,
    title: "Advanced Cloud Security",
    progress: 10,
    nextLesson: "Introduction to IAM",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

const announcements = [
  { id: 1, title: "New Course: Generative AI", date: "Dec 4", type: "New" },
  { id: 2, title: "Server Maintenance Notice", date: "Dec 3", type: "Alert" },
  {
    id: 3,
    title: "End-of-Year Certification Sale",
    date: "Nov 30",
    type: "Promo",
  },
];

const navItems = [
  {
    name: "Dashboard",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    current: true,
  },
  {
    name: "My Courses",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6.5v11.5M19 13.5v-7M5 13.5v-7M7 17.5v-7M17 17.5v-7"
        />
      </svg>
    ),
    current: false,
  },
  {
    name: "Assignments",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    current: false,
  },
  {
    name: "Certifications",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.108a12.022 12.022 0 010 10.224m-10.224 0a12.022 12.022 0 01-10.224 0M12 4.02v16m-4-8h8"
        />
      </svg>
    ),
    current: false,
  },
  {
    name: "Progress Reports",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 8v8m-4-8v8m-4-8v8M4 16h16"
        />
      </svg>
    ),
    current: false,
  },
  {
    name: "Browse Catalog",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 11H5m14 0a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0v1a1 1 0 001 1h8a1 1 0 001-1V7m0 0H5"
        />
      </svg>
    ),
    current: false,
  },
];

// Helper components for visual consistency

const StatCard = ({ title, value, unit, icon }) => (
  <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700 flex items-center space-x-3">
    <div className="text-indigo-400 p-2 bg-indigo-900/30 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-slate-100">
        {value}
        <span className="text-base font-normal text-indigo-400 ml-1">
          {unit}
        </span>
      </p>
    </div>
  </div>
);

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-slate-700 rounded-full h-2">
    <div
      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const NavItem = ({ item }) => {
  const Icon = item.icon;
  const baseClasses =
    "flex items-center space-x-3 p-3 rounded-lg transition duration-200 cursor-pointer";
  const activeClasses = item.current
    ? "bg-indigo-600 text-white shadow-lg"
    : "text-slate-300 hover:bg-slate-700 hover:text-indigo-400";

  return (
    <a href="#" className={`${baseClasses} ${activeClasses}`}>
      <Icon className="w-6 h-6" />
      <span className="font-medium">{item.name}</span>
    </a>
  );
};

// Main Dashboard Component
const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex bg-slate-950 font-sans">
      {/* ------------------------------------- */}
      {/* 1. Fixed Sidebar (Navigation) */}
      {/* ------------------------------------- */}
      <div className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-6 sticky top-0 h-screen">
        <div className="mb-8">
          <div className="text-3xl font-extrabold text-indigo-400 tracking-wider">
            StudyHub
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        <div className="mt-8 pt-4 border-t border-slate-800">
          <NavItem
            item={{
              name: "Settings",
              icon: (props) => (
                <svg
                  {...props}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35-.426.426-.941 1.066-1.066 2.573a1.724 1.724 0 01-2.37 2.37c-.426 1.543-2.924 1.543-3.35 0a1.724 1.724 0 01-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 01-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35.426-.426.941-1.066 1.066-2.573a1.724 1.724 0 012.37-2.37z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ),
              current: false,
            }}
          />
          <NavItem
            item={{
              name: "Logout",
              icon: (props) => (
                <svg
                  {...props}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-4a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              ),
              current: false,
            }}
          />
        </div>
      </div>

      {/* ------------------------------------- */}
      {/* 2. Main Content Area */}
      {/* ------------------------------------- */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Mobile Header (Hidden on large screens) */}
        <header className="lg:hidden flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-extrabold text-slate-100">Dashboard</h1>
          <button className="text-slate-200">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-slate-100">
            Hello,{" "}
            <span className="text-indigo-400">{user.name.split(" ")[0]}!</span>
          </h2>
          <p className="text-slate-400 mt-1">
            You are currently on the {user.level} track.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDE (Stat Cards & Courses - 8/12 width) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 2.1. Overall Progress Gauge (Moved from sidebar) */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-2xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">
                  Overall Progress
                </h3>
                <p className="text-sm text-slate-400">
                  Your average completion rate across all active modules.
                </p>
              </div>
              {/* Circular Gauge/Chart */}
              <div
                className="w-28 h-28 flex-shrink-0 mx-4 rounded-full border-4 border-slate-700 flex items-center justify-center text-2xl font-extrabold"
                style={{
                  borderColor: "#4f46e5",
                  background: `radial-gradient(closest-side, #0f172a, #0f172a), conic-gradient(#4f46e5 ${user.progress}%, #475569 0)`,
                }}
              >
                {user.progress}%
              </div>
            </div>

            {/* 2.2. Statistics Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                title="Certifications Earned"
                value={user.certifications}
                unit=""
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.108a12.022 12.022 0 010 10.224m-10.224 0a12.022 12.022 0 01-10.224 0M12 4.02v16m-4-8h8"
                    />
                  </svg>
                }
              />
              <StatCard
                title="Total Study Time"
                value={user.hours}
                unit="hrs"
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />
              <StatCard
                title="Next Skill Goal"
                value="Senior"
                unit=""
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                }
              />
            </div>

            {/* 2.3. Continue Learning / In Progress Courses */}
            <div className="bg-slate-900 p-8 rounded-xl shadow-2xl border border-slate-800">
              <h3 className="text-3xl font-bold text-slate-100 mb-6 border-b border-slate-700 pb-3">
                Active Courses
              </h3>

              <div className="space-y-6">
                {coursesInProgress.map((course) => (
                  <div
                    key={course.id}
                    className="bg-slate-800 p-4 rounded-lg flex items-center hover:bg-slate-700 transition duration-200 border-l-4 border-indigo-600"
                  >
                    <div className="text-indigo-400 mr-4">
                      {course.icon({ className: "w-6 h-6" })}
                    </div>
                    <div className="flex-1 mr-4">
                      <h4 className="text-xl font-semibold text-slate-100">
                        {course.title}
                      </h4>
                      <p className="text-sm text-slate-400">
                        Next Lesson:{" "}
                        <span className="font-medium">{course.nextLesson}</span>
                      </p>
                    </div>
                    <div className="w-32 mr-4 hidden sm:block">
                      <p className="text-xs text-slate-300 mb-1 text-right">
                        {course.progress}%
                      </p>
                      <ProgressBar progress={course.progress} />
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition duration-300 flex-shrink-0">
                      Resume
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (Recommendations & Activity - 4/12 width) */}
          <div className="lg:col-span-4 space-y-8">
            {/* 4. Activity Feed */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-2xl border border-slate-800">
              <h3 className="text-2xl font-bold text-slate-100 mb-4 border-b border-slate-700 pb-3">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className="text-sm border-l-2 border-indigo-600 pl-3"
                  >
                    <p
                      className={`font-semibold ${
                        item.type === "Alert"
                          ? "text-red-400"
                          : "text-slate-100"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.date} • {item.type}
                    </p>
                  </div>
                ))}
                <button className="text-indigo-400 hover:text-indigo-300 text-sm mt-2">
                  View All Updates →
                </button>
              </div>
            </div>

            {/* 5. Quick Links / Action Items */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-2xl border border-slate-800">
              <h3 className="text-2xl font-bold text-slate-100 mb-4 border-b border-slate-700 pb-3">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-slate-800 p-3 rounded-lg text-center hover:bg-slate-700 transition">
                  <p className="text-sm font-medium">Chat Support</p>
                </button>
                <button className="bg-slate-800 p-3 rounded-lg text-center hover:bg-slate-700 transition">
                  <p className="text-sm font-medium">My Community</p>
                </button>
                <button className="bg-slate-800 p-3 rounded-lg text-center hover:bg-slate-700 transition">
                  <p className="text-sm font-medium">Redeem Code</p>
                </button>
                <button className="bg-slate-800 p-3 rounded-lg text-center hover:bg-slate-700 transition">
                  <p className="text-sm font-medium">Feedback</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Placeholder */}
        <footer className="mt-10 pt-6 border-t border-slate-800 text-center text-sm text-slate-600">
          StudyHub LMS | Adaptive Learning Platform
        </footer>
      </div>
    </div>
  );
};

export default StudentDashboard;
