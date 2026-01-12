import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [currentSection, setCurrentSection] = useState("introduction");

  const policySections = [
    {
      id: "introduction",
      title: "1. Introduction",
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
    },
    {
      id: "payment-info",
      title: "4. Payment Information & Razorpay",
    },
    {
      id: "cookies",
      title: "5. Cookies & Tracking Technologies",
    },
    {
      id: "data-sharing",
      title: "6. Data Sharing & Third-Party Services",
    },
    {
      id: "data-security",
      title: "7. Data Security",
    },
    {
      id: "user-rights",
      title: "8. User Rights",
    },
    {
      id: "data-retention",
      title: "9. Data Retention",
    },
    {
      id: "children-privacy",
      title: "10. Children's Privacy",
    },
    {
      id: "changes",
      title: "11. Changes to This Privacy Policy",
    },
    {
      id: "contact",
      title: "12. Contact Information",
    },
  ];

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-x-hidden py-24">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-300 mb-4">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-slate-400">
            This Privacy Policy describes how we collect, use, and protect your
            personal information on our Learning Management System.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-300">
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {policySections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      currentSection === section.id
                        ? "bg-blue-600/20 text-blue-300 border-l-4 border-blue-500"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <h4 className="font-medium mb-2 text-slate-200">
                  Important Notes
                </h4>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex items-start">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-3"></div>
                    <span>We don't store payment details</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-3"></div>
                    <span>Razorpay handles transactions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-3"></div>
                    <span>Compliant with Indian data practices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  1. Introduction
                </h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Welcome to StudyHub (LMS) platform. We are committed to
                    protecting your privacy and ensuring the security of your
                    personal information. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when
                    you use our educational platform.
                  </p>
                  <p>
                    By accessing or using our platform, you consent to the
                    collection and use of your information in accordance with
                    this Privacy Policy. If you do not agree with the terms of
                    this Privacy Policy, please do not access the platform.
                  </p>
                  <p>
                    This platform serves students and instructors, providing
                    online courses, video lessons, certification programs, and
                    educational content. We are dedicated to maintaining high
                    standards of data protection and follow Indian data
                    protection practices.
                  </p>
                </div>
              </section>

              {/* Information We Collect */}
              <section id="information-collected" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  2. Information We Collect
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-200">
                      Personal Information:
                    </h3>
                    <ul className="space-y-3 text-slate-300 ml-4">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          <strong>Name:</strong> Your full name for account
                          creation and certificates
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          <strong>Email Address:</strong> For account creation,
                          communication, and notifications
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          <strong>Phone Number:</strong> Optional for account
                          verification and support
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          <strong>Profile Information:</strong> Bio, profile
                          picture, and other details you provide
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-200">
                      Account Information:
                    </h3>
                    <ul className="space-y-3 text-slate-300 ml-4">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Username and encrypted password</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Account preferences and settings</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Communication preferences</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-200">
                      Course Activity Data:
                    </h3>
                    <ul className="space-y-3 text-slate-300 ml-4">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Course enrollment and completion records</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Video viewing progress and watch history</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Quiz scores and assessment results</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Certificate issuance records</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Discussion forum participation</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-200">
                      Technical Information:
                    </h3>
                    <ul className="space-y-3 text-slate-300 ml-4">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>IP address and browser type</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Device information and operating system</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          Usage statistics and platform interaction data
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section id="how-we-use" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  3. How We Use Your Information
                </h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    We use your personal information for the following purposes:
                  </p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        <strong>Platform Operation:</strong> To create and
                        manage your account, provide course access, and enable
                        learning features
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        <strong>Course Delivery:</strong> To enroll you in
                        courses, track progress, and issue certificates upon
                        completion
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        <strong>Communication:</strong> To send important
                        updates, course notifications, and respond to your
                        inquiries
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        <strong>Improvement:</strong> To analyze platform usage
                        and enhance user experience
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        <strong>Security:</strong> To protect against
                        unauthorized access and maintain platform security
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span>
                        <strong>Legal Compliance:</strong> To comply with
                        applicable laws and regulations
                      </span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    We process your information based on legitimate business
                    interests, contract fulfillment, and your consent where
                    required.
                  </p>
                </div>
              </section>

              {/* Payment Information & Razorpay */}
              <section id="payment-info" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  4. Payment Information & Razorpay
                </h2>
                <div className="space-y-6 text-slate-300">
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-blue-700/30">
                    <h3 className="text-xl font-semibold mb-4 text-blue-300">
                      Important Security Notice
                    </h3>
                    <p className="mb-4">
                      We use <strong>Razorpay</strong> as our payment processing
                      partner. Razorpay is a PCI-DSS compliant payment gateway
                      that securely handles all payment transactions.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center mr-3 mt-1">
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span>
                          <strong>We do NOT store</strong> your credit/debit
                          card numbers, UPI details, or other sensitive payment
                          information on our servers
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center mr-3 mt-1">
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span>
                          All payment transactions are processed directly
                          through Razorpay's secure servers
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center mr-3 mt-1">
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span>
                          We only store transaction IDs and purchase information
                          for order tracking and support purposes
                        </span>
                      </div>
                    </div>
                    <p className="mt-6">
                      When you make a payment, you will be redirected to
                      Razorpay's secure payment page. Your payment details are
                      encrypted and transmitted directly to Razorpay using
                      industry-standard SSL/TLS encryption.
                    </p>
                    <p className="mt-4">
                      For more information about how Razorpay handles your data,
                      please review their Privacy Policy at{" "}
                      <a
                        href="https://razorpay.com/privacy"
                        className="text-blue-400 hover:text-blue-300 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        razorpay.com/privacy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies & Tracking Technologies */}
              <section id="cookies" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  5. Cookies & Tracking Technologies
                </h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    We use cookies and similar tracking technologies to enhance
                    your experience on our platform:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        Essential Cookies
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>Session management and login persistence</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>Platform functionality and security</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>
                            Cannot be disabled without affecting functionality
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        Analytics Cookies
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>Usage statistics and platform improvement</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>Course engagement metrics</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>Can be managed through browser settings</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="mt-6">
                    You can control cookie settings through your browser
                    preferences. However, disabling essential cookies may affect
                    your ability to use certain platform features.
                  </p>
                  <p>
                    We also use third-party analytics services (like Google
                    Analytics) to understand how users interact with our
                    platform. These services collect anonymized data about
                    platform usage.
                  </p>
                </div>
              </section>

              {/* Data Sharing & Third-Party Services */}
              <section id="data-sharing" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  6. Data Sharing & Third-Party Services
                </h2>
                <div className="space-y-6 text-slate-300">
                  <p>
                    We may share your information with third parties only in the
                    following circumstances:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-2 text-blue-300">
                        Service Providers
                      </h4>
                      <p>
                        We work with trusted third-party providers who assist in
                        platform operations:
                      </p>
                      <ul className="mt-3 space-y-2 ml-4">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>
                            <strong>Razorpay:</strong> Payment processing
                            services
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>
                            <strong>Hosting Providers:</strong> Cloud
                            infrastructure and data storage
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>
                            <strong>Communication Services:</strong> Email and
                            notification delivery
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>
                            <strong>Analytics Services:</strong> Platform usage
                            analysis
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-2 text-blue-300">
                        Legal Requirements
                      </h4>
                      <p>
                        We may disclose your information if required by law or
                        in response to:
                      </p>
                      <ul className="mt-3 space-y-2 ml-4">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>Valid legal requests or court orders</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>Government or regulatory requirements</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>
                            Protection of our rights, property, or safety
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-2 text-blue-300">
                        With Your Consent
                      </h4>
                      <p>
                        We may share information with third parties when you
                        explicitly give us permission to do so.
                      </p>
                    </div>
                  </div>

                  <p className="mt-4">
                    We ensure that all third-party service providers adhere to
                    appropriate data protection standards and use your
                    information only for the purposes we specify.
                  </p>
                </div>
              </section>

              {/* Data Security */}
              <section id="data-security" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  7. Data Security
                </h2>
                <div className="space-y-6 text-slate-300">
                  <p>
                    We implement industry-standard security measures to protect
                    your personal information from unauthorized access,
                    alteration, disclosure, or destruction.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        Technical Measures
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>SSL/TLS encryption for data transmission</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>Secure password hashing and storage</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>Regular security updates and patches</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>
                            Firewall protection and intrusion detection
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-3 text-blue-300">
                        Organizational Measures
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>Limited access to personal data</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>Employee privacy training</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>Regular security audits</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                          <span>Incident response procedures</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-900/50 rounded-xl border border-orange-700/30">
                    <h4 className="font-semibold mb-3 text-orange-300">
                      Important Security Note
                    </h4>
                    <p>
                      While we implement robust security measures, no method of
                      transmission over the internet or electronic storage is
                      100% secure. We cannot guarantee absolute security but we
                      are committed to protecting your information to the best
                      of our ability.
                    </p>
                    <p className="mt-4">
                      In the event of a data breach that affects your personal
                      information, we will notify you and appropriate
                      authorities as required by law.
                    </p>
                  </div>
                </div>
              </section>

              {/* User Rights */}
              <section id="user-rights" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  8. User Rights
                </h2>
                <div className="space-y-6 text-slate-300">
                  <p>
                    As a user of our platform, you have certain rights regarding
                    your personal information. You can exercise these rights by
                    contacting us using the information in the "Contact
                    Information" section.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-900/50 rounded-xl">
                        <h4 className="font-semibold mb-2 text-blue-300">
                          Access & Correction
                        </h4>
                        <p>
                          Right to access and update your personal information
                          in your account settings.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl">
                        <h4 className="font-semibold mb-2 text-blue-300">
                          Data Portability
                        </h4>
                        <p>
                          Right to receive your data in a structured, commonly
                          used format.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl">
                        <h4 className="font-semibold mb-2 text-blue-300">
                          Withdraw Consent
                        </h4>
                        <p>
                          Right to withdraw consent for data processing where
                          applicable.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-900/50 rounded-xl">
                        <h4 className="font-semibold mb-2 text-blue-300">
                          Deletion
                        </h4>
                        <p>
                          Right to request deletion of your personal
                          information, subject to legal requirements.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl">
                        <h4 className="font-semibold mb-2 text-blue-300">
                          Opt-Out
                        </h4>
                        <p>
                          Right to opt-out of marketing communications and
                          certain data processing.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl">
                        <h4 className="font-semibold mb-2 text-blue-300">
                          Complaints
                        </h4>
                        <p>
                          Right to lodge complaints with relevant data
                          protection authorities.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4">
                    We will respond to your requests within a reasonable
                    timeframe and may require verification of your identity
                    before processing certain requests.
                  </p>
                </div>
              </section>

              {/* Data Retention */}
              <section id="data-retention" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  9. Data Retention
                </h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    We retain your personal information only for as long as
                    necessary to fulfill the purposes outlined in this Privacy
                    Policy, unless a longer retention period is required or
                    permitted by law.
                  </p>

                  <div className="p-6 bg-slate-900/50 rounded-xl">
                    <h4 className="font-semibold mb-4 text-blue-300">
                      Retention Periods
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2 text-slate-200">
                          Active Accounts
                        </h5>
                        <p>
                          We retain data for active accounts as long as your
                          account remains active and for a reasonable period
                          thereafter for backup and audit purposes.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2 text-slate-200">
                          Course Data
                        </h5>
                        <p>
                          Course progress, completion records, and certificates
                          are retained indefinitely to maintain your educational
                          records.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2 text-slate-200">
                          Financial Records
                        </h5>
                        <p>
                          Transaction records are retained for 7+ years as
                          required by financial regulations.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2 text-slate-200">
                          Inactive Accounts
                        </h5>
                        <p>
                          Inactive accounts (no login for 3+ years) may be
                          deactivated and associated data may be anonymized or
                          deleted.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4">
                    When we no longer need your personal information, we will
                    securely delete or anonymize it so it can no longer be
                    associated with you.
                  </p>
                </div>
              </section>

              {/* Children's Privacy */}
              <section id="children-privacy" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  10. Children's Privacy
                </h2>
                <div className="space-y-4 text-slate-300">
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-purple-700/30">
                    <h3 className="text-xl font-semibold mb-4 text-purple-300">
                      Important Notice
                    </h3>
                    <p>
                      Our platform is{" "}
                      <strong>
                        not intended for children under the age of 13
                      </strong>
                      . We do not knowingly collect personal information from
                      children under 13.
                    </p>
                    <p className="mt-4">
                      If you are a parent or guardian and believe your child has
                      provided us with personal information without your
                      consent, please contact us immediately. We will take steps
                      to remove such information from our servers.
                    </p>
                    <p className="mt-4">
                      For users aged 13-18, we recommend that parents or
                      guardians review this Privacy Policy and supervise their
                      children's use of the platform.
                    </p>
                  </div>

                  <p>
                    In regions with different age thresholds for data
                    protection, we comply with applicable local laws regarding
                    children's privacy.
                  </p>
                </div>
              </section>

              {/* Changes to This Privacy Policy */}
              <section id="changes" className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  11. Changes to This Privacy Policy
                </h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    We may update this Privacy Policy from time to time to
                    reflect changes in our practices, technology, legal
                    requirements, or other factors.
                  </p>

                  <div className="p-6 bg-slate-900/50 rounded-xl">
                    <h4 className="font-semibold mb-4 text-blue-300">
                      Update Process
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          We will post the updated Privacy Policy on this page
                          with a new "Last Updated" date
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          For significant changes, we will notify you via email
                          or platform notification
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          Continued use of our platform after changes
                          constitutes acceptance of the updated policy
                        </span>
                      </li>
                    </ul>
                  </div>

                  <p>
                    We encourage you to review this Privacy Policy periodically
                    to stay informed about how we protect your information.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                  12. Contact Information
                </h2>
                <div className="space-y-6 text-slate-300">
                  <p>
                    If you have any questions, concerns, or requests regarding
                    this Privacy Policy or our data practices, please contact
                    us:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-4 text-blue-300">
                        Primary Contact
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-slate-200">
                            Data Protection Officer
                          </h5>
                          <p>Email: privacy@yourlmsplatform.com</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-slate-200">
                            General Inquiries
                          </h5>
                          <p>Email: support@yourlmsplatform.com</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-slate-200">
                            Response Time
                          </h5>
                          <p>We aim to respond within 7-10 business days</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-900/50 rounded-xl">
                      <h4 className="font-semibold mb-4 text-blue-300">
                        Platform Information
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-slate-200">
                            Platform Name
                          </h5>
                          <p>Your LMS Platform</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-slate-200">
                            Compliance
                          </h5>
                          <p>
                            Following Indian data protection practices and
                            guidelines
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-slate-200">
                            Additional Resources
                          </h5>
                          <p>Visit our Help Center for more information</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-900/50 rounded-xl border border-blue-700/30">
                    <h4 className="font-semibold mb-4 text-blue-300">
                      Making a Request
                    </h4>
                    <p>
                      When contacting us about privacy matters, please include:
                    </p>
                    <ul className="mt-3 space-y-2 ml-4">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Your full name and registered email address</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>
                          Clear description of your request or concern
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                        <span>Any relevant account or transaction details</span>
                      </li>
                    </ul>
                  </div>

                  <p className="mt-6">
                    This Privacy Policy was last updated on{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    .
                  </p>
                </div>
              </section>
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

export default PrivacyPolicy;
