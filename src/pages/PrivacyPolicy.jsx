import React from "react";

const sections = [
  {
    title: "1. Introduction",
    body: (
      <>
        <p>
          Welcome to StudyHub. We are committed to protecting your privacy. This
          Privacy Policy explains what information we collect, how we use it,
          and your rights regarding it. By using our platform, you agree to this
          policy.
        </p>
      </>
    ),
  },
  {
    title: "2. Information We Collect",
    body: (
      <>
        <p>We collect:</p>
        <ul className="list-disc ml-6 space-y-1 mt-2">
          <li>
            <strong>Account info:</strong> name, email, phone (optional),
            profile picture
          </li>
          <li>
            <strong>Course activity:</strong> enrollments, progress, quiz
            scores, certificates
          </li>
          <li>
            <strong>Technical data:</strong> IP address, device/browser type,
            usage logs
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    body: (
      <p>
        We use your information to operate the platform, deliver courses and
        certificates, communicate important updates, improve our services, and
        comply with legal obligations.
      </p>
    ),
  },
  {
    title: "4. Payments",
    body: (
      <p>
        Payments are processed by <strong>Razorpay</strong>, a PCI-DSS compliant
        payment gateway. We never store your card, UPI, or banking details on
        our servers — we only retain transaction IDs for order tracking and
        support. See Razorpay's policy at{" "}
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
    ),
  },
  {
    title: "5. Cookies",
    body: (
      <p>
        We use essential cookies (login sessions, security) and analytics
        cookies (usage statistics) to improve the platform. You can manage
        cookie preferences through your browser settings.
      </p>
    ),
  },
  {
    title: "6. Data Sharing",
    body: (
      <p>
        We do not sell your personal data. We share information only with
        service providers who help us operate the platform (payment processing,
        cloud hosting, email delivery), and only to the extent necessary for
        those services, or when required by law.
      </p>
    ),
  },
  {
    title: "7. Data Security",
    body: (
      <p>
        We use industry-standard measures — encryption, access controls, and
        regular audits — to protect your data. No online system is 100% secure,
        but we're committed to safeguarding your information and will notify you
        in the event of a breach affecting your data.
      </p>
    ),
  },
  {
    title: "8. Your Rights",
    body: (
      <p>
        You can access, update, or delete your account information at any time
        from your profile settings, or by contacting us. You may also request a
        copy of your data or ask us to restrict its use.
      </p>
    ),
  },
  {
    title: "9. Data Retention",
    body: (
      <p>
        We retain your data as long as your account is active. If you delete
        your account, we remove your personal information within a reasonable
        period, except where retention is required by law (e.g. transaction
        records).
      </p>
    ),
  },
  {
    title: "10. Children's Privacy",
    body: (
      <p>
        Our platform is not intended for children under 13. We do not knowingly
        collect data from children under 13. If you believe a child has provided
        us data, contact us and we will remove it.
      </p>
    ),
  },
  {
    title: "11. Changes to This Policy",
    body: (
      <p>
        We may update this policy from time to time. Material changes will be
        notified via email or a platform announcement. Continued use of the
        platform after changes means you accept the updated policy.
      </p>
    ),
  },
  {
    title: "12. Contact Us",
    body: (
      <p>
        Questions about this policy? Reach us at{" "}
        <a
          href="mailto:studyhubinfo@gmail.com"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          studyhubinfo@gmail.com
        </a>
        .
      </p>
    ),
  },
];

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 py-24">
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm">
          Last Updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-300">
              {section.title}
            </h2>
            <div className="text-slate-300 leading-relaxed">{section.body}</div>
          </section>
        ))}
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
