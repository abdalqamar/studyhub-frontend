// src/pages/AdminDashboard/components/PlatformSettings.jsx
import { useState } from "react";

const PlatformSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    platformName: "LearnHub",
    platformDescription: "Online Learning Platform",
    contactEmail: "support@learnhub.com",
    supportPhone: "+1-555-0123",
    defaultLanguage: "en",
    timezone: "UTC",

    // Payment Settings
    currency: "USD",
    commissionRate: 30,
    instructorPayoutDelay: 30,
    taxRate: 0,
    enableTax: false,

    // Course Settings
    autoApproveCourses: false,
    maxCourseDuration: 50,
    minCoursePrice: 0,
    maxCoursePrice: 500,
    allowRefunds: true,
    refundPeriod: 30,

    // Security Settings
    requireEmailVerification: true,
    requirePhoneVerification: false,
    strongPasswordRequired: true,
    sessionTimeout: 60,
    maxLoginAttempts: 5,

    // Email Settings
    smtpHost: "smtp.learnhub.com",
    smtpPort: 587,
    smtpUsername: "noreply@learnhub.com",
    smtpPassword: "********",
    fromEmail: "noreply@learnhub.com",
    fromName: "LearnHub Platform",
  });

  const handleInputChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveSettings = (section) => {
    // API call to save settings
    console.log(`Saving ${section} settings:`, settings);
    // Show success message
    alert(`${section} settings saved successfully!`);
  };

  const tabs = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "payment", label: "Payment", icon: "💰" },
    { id: "course", label: "Course", icon: "📚" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "email", label: "Email", icon: "📧" },
    { id: "maintenance", label: "Maintenance", icon: "🔧" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Platform Settings</h2>
        <button
          onClick={() => handleSaveSettings("all")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Save All Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="lg:w-64 bg-slate-800 rounded-xl border border-slate-700 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === "general" && (
            <GeneralSettings
              settings={settings}
              onChange={handleInputChange}
              onSave={handleSaveSettings}
            />
          )}
          {activeTab === "payment" && (
            <PaymentSettings
              settings={settings}
              onChange={handleInputChange}
              onSave={handleSaveSettings}
            />
          )}
          {activeTab === "course" && (
            <CourseSettings
              settings={settings}
              onChange={handleInputChange}
              onSave={handleSaveSettings}
            />
          )}
          {activeTab === "security" && (
            <SecuritySettings
              settings={settings}
              onChange={handleInputChange}
              onSave={handleSaveSettings}
            />
          )}
          {activeTab === "email" && (
            <EmailSettings
              settings={settings}
              onChange={handleInputChange}
              onSave={handleSaveSettings}
            />
          )}
          {activeTab === "maintenance" && (
            <MaintenanceSettings onSave={handleSaveSettings} />
          )}
        </div>
      </div>
    </div>
  );
};

// Sub-components for each settings section
const GeneralSettings = ({ settings, onChange, onSave }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h3 className="text-xl font-bold text-white mb-6">General Settings</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Platform Name
        </label>
        <input
          type="text"
          value={settings.platformName}
          onChange={(e) => onChange("general", "platformName", e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Contact Email
        </label>
        <input
          type="email"
          value={settings.contactEmail}
          onChange={(e) => onChange("general", "contactEmail", e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Support Phone
        </label>
        <input
          type="text"
          value={settings.supportPhone}
          onChange={(e) => onChange("general", "supportPhone", e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Default Language
        </label>
        <select
          value={settings.defaultLanguage}
          onChange={(e) =>
            onChange("general", "defaultLanguage", e.target.value)
          }
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Platform Description
        </label>
        <textarea
          value={settings.platformDescription}
          onChange={(e) =>
            onChange("general", "platformDescription", e.target.value)
          }
          rows="3"
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button
        onClick={() => onSave("general")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Save General Settings
      </button>
    </div>
  </div>
);

const PaymentSettings = ({ settings, onChange, onSave }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h3 className="text-xl font-bold text-white mb-6">Payment Settings</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Currency
        </label>
        <select
          value={settings.currency}
          onChange={(e) => onChange("payment", "currency", e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="INR">INR (₹)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Platform Commission (%)
        </label>
        <input
          type="number"
          value={settings.commissionRate}
          onChange={(e) =>
            onChange("payment", "commissionRate", parseInt(e.target.value))
          }
          min="0"
          max="100"
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Payout Delay (Days)
        </label>
        <input
          type="number"
          value={settings.instructorPayoutDelay}
          onChange={(e) =>
            onChange(
              "payment",
              "instructorPayoutDelay",
              parseInt(e.target.value)
            )
          }
          min="1"
          max="90"
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Tax Rate (%)
        </label>
        <input
          type="number"
          value={settings.taxRate}
          onChange={(e) =>
            onChange("payment", "taxRate", parseFloat(e.target.value))
          }
          min="0"
          max="50"
          step="0.1"
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="md:col-span-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.enableTax}
            onChange={(e) => onChange("payment", "enableTax", e.target.checked)}
            className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-slate-300">
            Enable Tax Calculation
          </label>
        </div>
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button
        onClick={() => onSave("payment")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Save Payment Settings
      </button>
    </div>
  </div>
);

const CourseSettings = ({ settings, onChange, onSave }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h3 className="text-xl font-bold text-white mb-6">Course Settings</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Max Course Duration (hours)
        </label>
        <input
          type="number"
          value={settings.maxCourseDuration}
          onChange={(e) =>
            onChange("course", "maxCourseDuration", parseInt(e.target.value))
          }
          min="1"
          max="500"
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Minimum Course Price ($)
        </label>
        <input
          type="number"
          value={settings.minCoursePrice}
          onChange={(e) =>
            onChange("course", "minCoursePrice", parseInt(e.target.value))
          }
          min="0"
          max="1000"
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Maximum Course Price ($)
        </label>
        <input
          type="number"
          value={settings.maxCoursePrice}
          onChange={(e) =>
            onChange("course", "maxCoursePrice", parseInt(e.target.value))
          }
          min="1"
          max="10000"
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Refund Period (Days)
        </label>
        <input
          type="number"
          value={settings.refundPeriod}
          onChange={(e) =>
            onChange("course", "refundPeriod", parseInt(e.target.value))
          }
          min="0"
          max="365"
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.autoApproveCourses}
            onChange={(e) =>
              onChange("course", "autoApproveCourses", e.target.checked)
            }
            className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-slate-300">
            Auto-approve new courses
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.allowRefunds}
            onChange={(e) =>
              onChange("course", "allowRefunds", e.target.checked)
            }
            className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-slate-300">
            Allow course refunds
          </label>
        </div>
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button
        onClick={() => onSave("course")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Save Course Settings
      </button>
    </div>
  </div>
);

const SecuritySettings = ({ settings, onChange, onSave }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h3 className="text-xl font-bold text-white mb-6">Security Settings</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) =>
            onChange("security", "sessionTimeout", parseInt(e.target.value))
          }
          min="5"
          max="1440"
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Max Login Attempts
        </label>
        <input
          type="number"
          value={settings.maxLoginAttempts}
          onChange={(e) =>
            onChange("security", "maxLoginAttempts", parseInt(e.target.value))
          }
          min="1"
          max="10"
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>

    <div className="space-y-4 mt-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={settings.requireEmailVerification}
          onChange={(e) =>
            onChange("security", "requireEmailVerification", e.target.checked)
          }
          className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
        />
        <label className="ml-2 text-sm font-medium text-slate-300">
          Require email verification for new users
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={settings.requirePhoneVerification}
          onChange={(e) =>
            onChange("security", "requirePhoneVerification", e.target.checked)
          }
          className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
        />
        <label className="ml-2 text-sm font-medium text-slate-300">
          Require phone verification
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={settings.strongPasswordRequired}
          onChange={(e) =>
            onChange("security", "strongPasswordRequired", e.target.checked)
          }
          className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
        />
        <label className="ml-2 text-sm font-medium text-slate-300">
          Require strong passwords
        </label>
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button
        onClick={() => onSave("security")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Save Security Settings
      </button>
    </div>
  </div>
);

const EmailSettings = ({ settings, onChange, onSave }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h3 className="text-xl font-bold text-white mb-6">Email Settings</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          SMTP Host
        </label>
        <input
          type="text"
          value={settings.smtpHost}
          onChange={(e) => onChange("email", "smtpHost", e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          SMTP Port
        </label>
        <input
          type="number"
          value={settings.smtpPort}
          onChange={(e) =>
            onChange("email", "smtpPort", parseInt(e.target.value))
          }
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          SMTP Username
        </label>
        <input
          type="text"
          value={settings.smtpUsername}
          onChange={(e) => onChange("email", "smtpUsername", e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          SMTP Password
        </label>
        <input
          type="password"
          value={settings.smtpPassword}
          onChange={(e) => onChange("email", "smtpPassword", e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          From Email
        </label>
        <input
          type="email"
          value={settings.fromEmail}
          onChange={(e) => onChange("email", "fromEmail", e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          From Name
        </label>
        <input
          type="text"
          value={settings.fromName}
          onChange={(e) => onChange("email", "fromName", e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button
        onClick={() => onSave("email")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Save Email Settings
      </button>
    </div>
  </div>
);

const MaintenanceSettings = ({ onSave }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <h3 className="text-xl font-bold text-white mb-6">Maintenance Settings</h3>

    <div className="space-y-6">
      <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-400 font-semibold mb-2">
          ⚠️ Maintenance Mode
        </h4>
        <p className="text-yellow-200 text-sm">
          Enable maintenance mode to temporarily take the platform offline for
          updates.
        </p>
        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            className="rounded border-slate-600 bg-slate-700 text-yellow-600 focus:ring-yellow-500"
          />
          <label className="ml-2 text-sm font-medium text-yellow-300">
            Enable Maintenance Mode
          </label>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
        <h4 className="text-blue-400 font-semibold mb-2">
          🔄 Cache Management
        </h4>
        <p className="text-blue-200 text-sm">
          Clear platform cache to refresh data and improve performance.
        </p>
        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
          Clear All Cache
        </button>
      </div>

      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
        <h4 className="text-red-400 font-semibold mb-2">🗑️ Data Management</h4>
        <p className="text-red-200 text-sm">
          Permanently delete old data and optimize database performance.
        </p>
        <button className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
          Optimize Database
        </button>
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button
        onClick={() => onSave("maintenance")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Save Maintenance Settings
      </button>
    </div>
  </div>
);

export default PlatformSettings;
