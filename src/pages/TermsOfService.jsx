import { useState } from "react";
import { termsSections } from "../data/data";
import { Info } from "lucide-react";

const TermsOfService = () => {
  const [currentSection, setCurrentSection] = useState("acceptance");
  const [readProgress, setReadProgress] = useState(0);

  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setReadProgress(progress);
  };

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-x-hidden py-24">
      <div className="container mx-auto px-4 py-12 pt-16">
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Terms of Service
          </h1>
          <div className="inline-flex items-center justify-center px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-slate-300 text-sm">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
            <p className="text-slate-300 mb-3">
              Please read these Terms of Service carefully before using our
              Learning Management System platform.
            </p>
            <p className="text-slate-400 text-sm">
              By accessing or using our platform, you agree to be bound by these
              terms. If you disagree with any part, please do not use our
              services.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-blue-300">
                  Table of Contents
                </h3>
                <div className="text-xs px-3 py-1 bg-slate-700/50 rounded-full">
                  {Math.round(readProgress)}% read
                </div>
              </div>

              <nav className="space-y-1">
                {termsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                      currentSection === section.id
                        ? "bg-blue-600/20 text-blue-300 border-l-4 border-blue-500"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>

              {/* Important Highlights */}
              <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <h4 className="font-medium mb-3 text-slate-200 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-400" />
                  Key Points
                </h4>
                <ul className="text-xs text-slate-400 space-y-2">
                  <li className="flex items-start">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                    <span>Minimum age: 13 years</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                    <span>Payments processed by Razorpay</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                    <span>Content for personal use only</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                    <span>Instructors own their content</span>
                  </li>
                </ul>
              </div>

              {/* Acceptance Button */}
              <div className="mt-6">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  I Accept These Terms
                </button>
                <p className="text-xs text-slate-500 text-center mt-2">
                  By clicking, you agree to all terms
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 md:p-8 max-h-[80vh] overflow-y-auto"
              onScroll={handleScroll}
            >
              {/* 1. Acceptance of Terms */}
              <section id="acceptance" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Acceptance of Terms
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <p>
                    Welcome to our Learning Management System (the "Platform").
                    These Terms of Service ("Terms") govern your access to and
                    use of our educational platform, including all courses,
                    content, features, and services provided.
                  </p>

                  <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                    <p className="font-medium text-slate-200 mb-2">
                      By accessing or using our Platform, you agree to:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          Be bound by these Terms and our Privacy Policy
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          Comply with all applicable laws and regulations
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Use the Platform only for lawful purposes</span>
                      </li>
                    </ul>
                  </div>

                  <p>
                    If you are using the Platform on behalf of an organization,
                    you represent that you have the authority to bind that
                    organization to these Terms.
                  </p>

                  <p>
                    We reserve the right to modify, suspend, or discontinue any
                    aspect of the Platform at any time. Continued use after
                    changes constitutes acceptance of the modified Terms.
                  </p>
                </div>
              </section>

              {/* 2. Eligibility */}
              <section id="eligibility" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">2</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Eligibility
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-blue-700/30">
                    <h3 className="text-xl font-semibold mb-3 text-blue-300">
                      Age Requirements
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            className="w-4 h-4 text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">
                            Minimum Age: 13 Years
                          </p>
                          <p className="text-sm text-slate-400">
                            You must be at least 13 years old to create an
                            account
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            className="w-4 h-4 text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">
                            Parental Consent
                          </p>
                          <p className="text-sm text-slate-400">
                            Users under 18 require parent/guardian permission
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <p>By using the Platform, you represent and warrant that:</p>

                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>You meet the minimum age requirements</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        You have the legal capacity to enter into these Terms
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Your use of the Platform does not violate any applicable
                        law
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        You are not prohibited from receiving our services under
                        applicable laws
                      </span>
                    </li>
                  </ul>

                  <p>
                    We reserve the right to refuse service, terminate accounts,
                    or remove content at our sole discretion.
                  </p>
                </div>
              </section>

              {/* 3. User Accounts */}
              <section id="user-accounts" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">3</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    User Accounts
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <p>
                    To access certain features, you must create a user account.
                    You are responsible for maintaining the confidentiality of
                    your account credentials.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        Account Responsibilities
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>Provide accurate and complete information</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Keep your password secure and confidential
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>Notify us immediately of unauthorized use</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>Maintain only one account per person</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        Account Security
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>Use strong, unique passwords</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>Log out after each session</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Enable two-factor authentication if available
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>Be cautious on public networks</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded-xl border border-orange-700/30">
                    <h4 className="font-semibold mb-2 text-orange-300">
                      Important Notice
                    </h4>
                    <p className="text-sm">
                      You are solely responsible for all activities that occur
                      under your account. We are not liable for any loss or
                      damage arising from your failure to protect your account
                      credentials.
                    </p>
                  </div>

                  <p>
                    We reserve the right to disable any account at any time if,
                    in our opinion, you have violated any provision of these
                    Terms.
                  </p>
                </div>
              </section>

              {/* 4. Instructor Accounts & Responsibilities */}
              <section id="instructor-accounts" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">4</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Instructor Accounts & Responsibilities
                  </h2>
                </div>

                <div className="space-y-6 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-purple-700/30">
                    <h3 className="text-xl font-semibold mb-4 text-purple-300">
                      Instructor Requirements
                    </h3>
                    <p className="mb-4">
                      To become an instructor, you must apply and be approved.
                      Instructors have additional responsibilities beyond
                      regular users.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-slate-200">
                          Content Standards
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2"></div>
                            <span>
                              Provide accurate and educational content
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2"></div>
                            <span>Maintain course quality and updates</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2"></div>
                            <span>Respond to student questions promptly</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-slate-200">
                          Legal Compliance
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2"></div>
                            <span>Own or have rights to all content</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2"></div>
                            <span>Comply with copyright and IP laws</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2"></div>
                            <span>Follow platform content guidelines</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-200">
                    Instructor Payments
                  </h4>
                  <p>
                    Instructors receive payment for their courses according to
                    our revenue share model. Payments are processed monthly
                    through our payment system. Instructors are responsible for:
                  </p>

                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>Providing accurate payment information</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Understanding and complying with tax obligations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>Maintaining minimum payout thresholds</span>
                    </li>
                  </ul>

                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <h4 className="font-semibold mb-2 text-blue-300">
                      Content Ownership
                    </h4>
                    <p>
                      Instructors retain ownership of the content they create.
                      By publishing on our platform, you grant us a license to
                      host, display, and distribute your content to students who
                      enroll in your courses.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Course Access & Usage */}
              <section id="course-access" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">5</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Course Access & Usage
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-blue-300">
                      License to Access
                    </h3>
                    <p className="mb-4">
                      Upon enrollment, we grant you a limited, non-exclusive,
                      non-transferable license to access and view the course
                      content for your personal, non-commercial, educational
                      purposes.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2 text-slate-200">
                          ✅ Permitted Uses
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2"></div>
                            <span>Personal learning and education</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2"></div>
                            <span>Taking notes for personal reference</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2"></div>
                            <span>Completing course assignments</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-200">
                          ❌ Prohibited Uses
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                            <span>Commercial redistribution</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                            <span>Sharing account access</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                            <span>Creating derivative works</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-200">
                    Access Period
                  </h4>
                  <p>
                    You have lifetime access to courses you have enrolled in,
                    unless:
                  </p>

                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        The course is removed by the instructor or platform
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Your account is terminated for violation of terms
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>The platform ceases operations</span>
                    </li>
                  </ul>

                  <div className="p-4 bg-slate-900/50 rounded-xl border border-blue-700/30">
                    <h4 className="font-semibold mb-2 text-blue-300">
                      Digital Products Only
                    </h4>
                    <p className="text-sm">
                      All courses and content on our platform are digital
                      products. No physical goods are shipped. Access is
                      provided immediately upon enrollment or purchase
                      completion.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. Payments, Pricing & Taxes */}
              <section id="payments" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">6</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Payments, Pricing & Taxes
                  </h2>
                </div>

                <div className="space-y-6 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-green-700/30">
                    <h3 className="text-xl font-semibold mb-4 text-green-300">
                      Payment Processing
                    </h3>

                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-100">
                          Razorpay Payment Gateway
                        </h4>
                        <p className="text-slate-400">
                          All payments are securely processed through Razorpay
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            className="w-4 h-4 text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">
                            Secure Payment Processing
                          </p>
                          <p className="text-sm text-slate-400">
                            Razorpay is PCI-DSS compliant and uses bank-level
                            security
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            className="w-4 h-4 text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">
                            No Sensitive Data Storage
                          </p>
                          <p className="text-sm text-slate-400">
                            We do not store card numbers, UPI details, or
                            banking information
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-200">
                    Pricing
                  </h4>
                  <p>
                    Course prices are set by instructors and displayed in Indian
                    Rupees (₹) or other local currencies. Prices may change at
                    any time, but price changes will not affect existing
                    enrollments.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-2 text-blue-300">
                        Currency & Taxes
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            All prices include applicable taxes unless stated
                            otherwise
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            International users may see prices converted to
                            local currency
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Additional bank or payment processor fees may apply
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-2 text-blue-300">
                        Payment Terms
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Payment is required before course access is granted
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            All payments are final unless refunds apply
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Failed payments may result in access suspension
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 7. Refund & Cancellation Policy */}
              <section id="refund-policy" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">7</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Refund & Cancellation Policy
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-yellow-700/30">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-300">
                      30-Day Money-Back Guarantee
                    </h3>

                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-yellow-400 font-bold">30</span>
                        </div>
                        <span className="font-medium text-slate-200">
                          Days Refund Window
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 ml-11">
                        You may request a refund within 30 days of purchase if
                        you are not satisfied with the course.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          Refund requests must be submitted through our support
                          system
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          Refunds are processed to the original payment method
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></div>
                        <span>Processing time: 7-14 business days</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-200">
                    Refund Eligibility
                  </h4>
                  <p>To be eligible for a refund, you must:</p>

                  <ul className="space-y-2 ml-4 mb-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Submit your request within 30 days of purchase
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Have completed less than 50% of the course content
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>Provide a valid reason for dissatisfaction</span>
                    </li>
                  </ul>

                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <h4 className="font-semibold mb-2 text-blue-300">
                      Non-Refundable Situations
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                        <span>Requests submitted after 30 days</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                        <span>More than 50% of course content completed</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                        <span>Certificate already issued</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                        <span>Abuse or violation of terms</span>
                      </li>
                    </ul>
                  </div>

                  <p>
                    For detailed refund procedures and exceptions, please refer
                    to our complete Refund Policy available on our website.
                  </p>
                </div>
              </section>

              {/* 8. Intellectual Property Rights */}
              <section id="intellectual-property" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">8</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Intellectual Property Rights
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-blue-300">
                      Ownership Rights
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2 text-slate-200">
                          Platform Content
                        </h4>
                        <p className="text-sm">
                          All platform software, design, graphics, text, and
                          other content (excluding user-generated content) are
                          owned by us or our licensors and are protected by
                          copyright and other intellectual property laws.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-200">
                          Instructor Content
                        </h4>
                        <p className="text-sm">
                          Course content (videos, materials, assignments)
                          created by instructors remains their intellectual
                          property. Instructors grant students a license to
                          access and use the content for personal educational
                          purposes.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-slate-200">
                          Student Content
                        </h4>
                        <p className="text-sm">
                          Assignments, projects, and other content created by
                          students remain their intellectual property. Students
                          grant the platform and instructors a license to
                          evaluate and provide feedback on their work.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-200">
                    License Restrictions
                  </h4>
                  <p>You may not:</p>

                  <ul className="space-y-2 ml-4 mb-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Copy, reproduce, or distribute course content without
                        permission
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Reverse engineer or decompile platform software
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3"></div>
                      <span>Use platform content for commercial purposes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3"></div>
                      <span>Remove or alter copyright notices</span>
                    </li>
                  </ul>

                  <div className="p-4 bg-slate-900/50 rounded-xl border border-blue-700/30">
                    <h4 className="font-semibold mb-2 text-blue-300">
                      Copyright Complaints
                    </h4>
                    <p className="text-sm">
                      We respect intellectual property rights. If you believe
                      your copyright has been infringed, please contact us with
                      details. We will investigate and take appropriate action.
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. User-Generated Content */}
              <section id="user-content" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">9</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    User-Generated Content
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <p>
                    Our platform allows users to create and share content,
                    including course reviews, discussion posts, assignments, and
                    profile information.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        Your Responsibility
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>Only share content you have rights to</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Ensure content is appropriate and respectful
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Do not share personal information of others
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>Comply with all applicable laws</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        License to Platform
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            You grant us a license to display your content
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            License is worldwide, non-exclusive, royalty-free
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Purpose is to operate and improve the platform
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>You can delete your content at any time</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded-xl border border-orange-700/30">
                    <h4 className="font-semibold mb-2 text-orange-300">
                      Content Monitoring
                    </h4>
                    <p className="text-sm">
                      We reserve the right to monitor, review, and remove any
                      user-generated content that violates these Terms or is
                      otherwise objectionable. However, we are not obligated to
                      monitor all content.
                    </p>
                  </div>

                  <p>
                    You are solely responsible for the content you create and
                    share on the platform. We do not endorse any user-generated
                    content and disclaim all liability related to such content.
                  </p>
                </div>
              </section>

              {/* 10. Prohibited Activities */}
              <section id="prohibited-activities" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">10</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Prohibited Activities
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-red-700/30">
                    <h3 className="text-xl font-semibold mb-4 text-red-300">
                      Strictly Prohibited
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2 text-slate-200">
                            Account Violations
                          </h4>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Creating multiple accounts</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Sharing account credentials</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Impersonating others</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Using others' accounts</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 text-slate-200">
                            Content Violations
                          </h4>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Uploading malicious software</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Sharing copyrighted material</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Posting inappropriate content</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2 text-slate-200">
                            Platform Abuse
                          </h4>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Attempting to hack or disrupt service</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Scraping or data mining</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Circumventing payment systems</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Automated account creation</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 text-slate-200">
                            Legal Violations
                          </h4>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Harassment or threats</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Illegal activities</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2"></div>
                              <span>Spamming other users</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p>
                    Violation of these prohibitions may result in immediate
                    account suspension or termination, legal action, and
                    reporting to appropriate authorities.
                  </p>

                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <h4 className="font-semibold mb-2 text-blue-300">
                      Reporting Violations
                    </h4>
                    <p className="text-sm">
                      If you encounter any prohibited activities or content,
                      please report it immediately through our reporting system
                      or contact our support team.
                    </p>
                  </div>
                </div>
              </section>

              {/* 11. Termination & Suspension of Accounts */}
              <section id="termination" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">11</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Termination & Suspension of Accounts
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        By You
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>You may delete your account at any time</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Account deletion is permanent and irreversible
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Some data may be retained as required by law
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Active subscriptions may continue until cancelled
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        By Platform
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            We may suspend or terminate accounts for violations
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>Termination may be without prior notice</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>No refunds for terminated accounts</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                          <span>
                            Appeals may be submitted to our support team
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-200">
                    Effects of Termination
                  </h4>
                  <p>Upon termination of your account:</p>

                  <ul className="space-y-2 ml-4 mb-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Your right to use the platform immediately ceases
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>You lose access to all courses and content</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>Any certificates earned may become invalid</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>We may delete or anonymize your data</span>
                    </li>
                  </ul>

                  <div className="p-4 bg-slate-900/50 rounded-xl border border-blue-700/30">
                    <h4 className="font-semibold mb-2 text-blue-300">
                      Data Retention After Termination
                    </h4>
                    <p className="text-sm">
                      Some information may be retained as required by law, for
                      legal disputes, or for platform security purposes. This
                      may include transaction records, violation reports, and
                      other necessary data.
                    </p>
                  </div>
                </div>
              </section>

              {/* 12. Disclaimer of Warranties */}
              <section id="warranties" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">12</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Disclaimer of Warranties
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-orange-700/30">
                    <h3 className="text-xl font-semibold mb-4 text-orange-300">
                      Important Disclaimer
                    </h3>
                    <p className="mb-4">
                      The platform and all content are provided on an "as is"
                      and "as available" basis without any warranties of any
                      kind, either express or implied.
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            className="w-4 h-4 text-orange-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">
                            No Guarantee of Results
                          </p>
                          <p className="text-sm text-slate-400">
                            We do not guarantee any specific educational or
                            career outcomes
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            className="w-4 h-4 text-orange-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">
                            Content Accuracy
                          </p>
                          <p className="text-sm text-slate-400">
                            We do not warrant the accuracy or completeness of
                            course content
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p>
                    We disclaim all warranties, including but not limited to:
                  </p>

                  <ul className="space-y-2 ml-4 mb-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Warranties of merchantability or fitness for a
                        particular purpose
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Warranties that the platform will be uninterrupted or
                        error-free
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>Warranties that defects will be corrected</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Warranties regarding the security of the platform
                      </span>
                    </li>
                  </ul>

                  <p>
                    Some jurisdictions do not allow the exclusion of certain
                    warranties, so some of these exclusions may not apply to
                    you.
                  </p>
                </div>
              </section>

              {/* 13. Limitation of Liability */}
              <section id="liability" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">13</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Limitation of Liability
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-red-700/30">
                    <h3 className="text-xl font-semibold mb-4 text-red-300">
                      Important Limitation
                    </h3>
                    <p className="mb-4">
                      To the maximum extent permitted by law, we shall not be
                      liable for any indirect, incidental, special,
                      consequential, or punitive damages, or any loss of profits
                      or revenues.
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500/20 rounded flex items-center justify-center mr-3">
                          <svg
                            className="w-3 h-3 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <span className="font-medium text-slate-200">
                          No liability for business losses
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500/20 rounded flex items-center justify-center mr-3">
                          <svg
                            className="w-3 h-3 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <span className="font-medium text-slate-200">
                          No liability for lost data or opportunities
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500/20 rounded flex items-center justify-center mr-3">
                          <svg
                            className="w-3 h-3 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <span className="font-medium text-slate-200">
                          No liability for third-party actions
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-200">
                    Direct Damages Cap
                  </h4>
                  <p>
                    Our total liability to you for any claims arising from or
                    related to these Terms or your use of the platform shall not
                    exceed the greater of:
                  </p>

                  <ul className="space-y-2 ml-4 mb-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        The amount you have paid us in the last 12 months, or
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>One hundred US dollars ($100)</span>
                    </li>
                  </ul>

                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <h4 className="font-semibold mb-2 text-blue-300">
                      Exceptions
                    </h4>
                    <p className="text-sm">
                      This limitation of liability does not apply to damages
                      resulting from our gross negligence, willful misconduct,
                      or death or personal injury caused by our negligence.
                    </p>
                  </div>

                  <p>
                    Some jurisdictions do not allow the limitation of liability,
                    so some of these limitations may not apply to you.
                  </p>
                </div>
              </section>

              {/* 14. Indemnification */}
              <section id="indemnification" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">14</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Indemnification
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-blue-300">
                      Your Responsibility
                    </h3>
                    <p>
                      You agree to indemnify, defend, and hold harmless our
                      company, its officers, directors, employees, agents, and
                      affiliates from and against any and all claims,
                      liabilities, damages, losses, costs, and expenses.
                    </p>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-200">
                    Covered Claims
                  </h4>
                  <p>This indemnification covers claims arising from:</p>

                  <ul className="space-y-2 ml-4 mb-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>Your use or misuse of the platform</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>Your violation of these Terms</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        Your violation of any law or third-party rights
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>Your user-generated content</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>Your interactions with other users</span>
                    </li>
                  </ul>

                  <div className="p-4 bg-slate-900/50 rounded-xl border border-blue-700/30">
                    <h4 className="font-semibold mb-2 text-blue-300">
                      Our Rights
                    </h4>
                    <p className="text-sm">
                      We reserve the right to assume the exclusive defense and
                      control of any matter subject to indemnification by you.
                      You agree to cooperate with our defense of such claims.
                    </p>
                  </div>
                </div>
              </section>

              {/* 15. Governing Law & Jurisdiction */}
              <section id="governing-law" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">15</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Governing Law & Jurisdiction
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        Governing Law
                      </h4>
                      <p className="text-sm">
                        These Terms shall be governed by and construed in
                        accordance with the laws of India, without regard to its
                        conflict of law principles.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        Jurisdiction
                      </h4>
                      <p className="text-sm">
                        Any legal action or proceeding arising under these Terms
                        will be brought exclusively in the courts located in
                        Bengaluru, Karnataka, India, and you consent to personal
                        jurisdiction in such courts.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <h4 className="font-semibold mb-2 text-blue-300">
                      International Users
                    </h4>
                    <p className="text-sm">
                      The platform is controlled and operated from India. We
                      make no representation that the platform is appropriate or
                      available for use in other locations. If you access the
                      platform from outside India, you do so at your own risk
                      and are responsible for compliance with local laws.
                    </p>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-200">
                    Dispute Resolution
                  </h4>
                  <p>
                    Before filing any legal action, we encourage you to contact
                    us to attempt to resolve the dispute informally. If informal
                    resolution fails, disputes shall be resolved through binding
                    arbitration or in court as specified above.
                  </p>
                </div>
              </section>

              {/* 16. Changes to Terms */}
              <section id="changes" className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">16</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Changes to Terms
                  </h2>
                </div>

                <div className="space-y-4 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-purple-700/30">
                    <h3 className="text-xl font-semibold mb-4 text-purple-300">
                      Right to Modify
                    </h3>
                    <p className="mb-4">
                      We reserve the right to modify these Terms at any time. We
                      will notify you of significant changes through:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-purple-500/20 rounded flex items-center justify-center mr-3">
                            <svg
                              className="w-3 h-3 text-purple-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <span className="text-sm">Email notification</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-purple-500/20 rounded flex items-center justify-center mr-3">
                            <svg
                              className="w-3 h-3 text-purple-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                              />
                            </svg>
                          </div>
                          <span className="text-sm">Platform notification</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-purple-500/20 rounded flex items-center justify-center mr-3">
                            <svg
                              className="w-3 h-3 text-purple-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <span className="text-sm">Updated Terms page</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-purple-500/20 rounded flex items-center justify-center mr-3">
                            <svg
                              className="w-3 h-3 text-purple-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <span className="text-sm">
                            Prominent notice on platform
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-200">
                    Effective Date
                  </h4>
                  <p>
                    Changes will become effective upon posting. The "Last
                    Updated" date at the top of these Terms will indicate when
                    changes were last made.
                  </p>

                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <h4 className="font-semibold mb-2 text-blue-300">
                      Your Continued Use
                    </h4>
                    <p className="text-sm">
                      Your continued use of the platform after changes
                      constitutes acceptance of the modified Terms. If you
                      disagree with the changes, you must stop using the
                      platform and may terminate your account.
                    </p>
                  </div>

                  <p>
                    We recommend that you review these Terms periodically to
                    stay informed about any changes.
                  </p>
                </div>
              </section>

              {/* 17. Contact Information */}
              <section id="contact">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold">17</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300 pt-1">
                    Contact Information
                  </h2>
                </div>

                <div className="space-y-6 text-slate-300 ml-12">
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-blue-700/30">
                    <h3 className="text-xl font-semibold mb-4 text-blue-300">
                      Platform Contact
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-200 mb-2">
                            Legal & Terms Inquiries
                          </h4>
                          <p className="text-sm">Email: studyhubedu.online</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-200 mb-2">
                            General Support
                          </h4>
                          <p className="text-sm">Email: studyhubedu.online</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-200 mb-2">
                            Response Time
                          </h4>
                          <p className="text-sm">
                            We aim to respond within 7-10 business days
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-200 mb-2">
                            Instructor Support
                          </h4>
                          <p className="text-sm">
                            Email: instructorstudyhubedu.online
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-200 mb-2">
                            Copyright Claims
                          </h4>
                          <p className="text-sm">
                            Email: copyright@studyhubedu.online.com
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-200 mb-2">
                            Business Hours
                          </h4>
                          <p className="text-sm">
                            Monday-Friday, 9 AM - 6 PM IST
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-200">
                    Contacting Us
                  </h4>
                  <p>
                    When contacting us regarding these Terms, please include:
                  </p>

                  <ul className="space-y-2 ml-4 mb-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>Your full name and registered email address</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>The specific section of the Terms in question</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        A clear description of your concern or question
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>Any relevant account or transaction details</span>
                    </li>
                  </ul>

                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <h4 className="font-semibold mb-2 text-blue-300">
                      Electronic Communications
                    </h4>
                    <p className="text-sm">
                      By using the platform, you consent to receive electronic
                      communications from us, including notices, agreements,
                      disclosures, and other communications. These
                      communications may be delivered by email or displayed on
                      the platform.
                    </p>
                  </div>

                  <p className="mt-6 text-center text-slate-400">
                    These Terms of Service were last updated on{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    .
                  </p>
                </div>
              </section>

              {/* Final Acceptance Section */}
              <div className="mt-12 pt-8 border-t border-slate-700/50">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-slate-100">
                    Thank you for reading our Terms of Service
                  </h3>
                  <p className="text-slate-400 mb-6">
                    By using our platform, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200">
                      I Accept These Terms
                    </button>
                    <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition-all duration-200">
                      Download PDF Version
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-4">
                    You may print or save a copy of these Terms for your records
                  </p>
                </div>
              </div>
            </div>
          </div>
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

export default TermsOfService;
