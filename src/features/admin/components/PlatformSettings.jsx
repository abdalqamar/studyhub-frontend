import { useState } from "react";

const PlatformSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    platformName: "StudyHub",
    platformDescription: "Online Learning Platform",
    contactEmail: "support@studyhub.com",
    supportPhone: "+1-555-0123",
    defaultLanguage: "en",
    timezone: "UTC",

    // Payment Settings
    currency: "INR",
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
    smtpHost: "smtp.studyhub.com",
    smtpPort: 587,
    smtpUsername: "noreply@studyhub.com",
    smtpPassword: "********",
    fromEmail: "noreply@studyhub.com",
    fromName: "StudyHub Platform",
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
        <h2 className="font-display font-bold text-2xl text-text-1">
          Platform Settings
        </h2>
        <button
          onClick={() => handleSaveSettings("all")}
          className="bg-teal hover:opacity-90 text-bg px-6 py-2 rounded-lg font-semibold text-sm transition-opacity"
        >
          Save All Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="lg:w-64 bg-surface rounded-[14px] border border-border p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 text-sm ${
                  activeTab === tab.id
                    ? "bg-gold-soft text-gold"
                    : "text-text-2 hover:bg-surface-2"
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

const inputClass =
  "bg-surface-2 border border-border-strong rounded-lg px-4 py-2 text-text-1 w-full focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent";
const labelClass = "block text-sm font-medium text-text-2 mb-2";
const checkboxClass =
  "rounded border-border-strong bg-surface-2 text-gold focus:ring-gold";
const saveBtnClass =
  "bg-gold hover:opacity-90 text-bg px-6 py-2 rounded-lg font-semibold text-sm transition-opacity";
const sectionClass = "bg-surface rounded-[14px] p-6 border border-border";
const sectionTitleClass = "font-display font-bold text-xl text-text-1 mb-6";

// Sub-components for each settings section
const GeneralSettings = ({ settings, onChange, onSave }) => (
  <div className={sectionClass}>
    <h3 className={sectionTitleClass}>General Settings</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={labelClass}>Platform Name</label>
        <input
          type="text"
          value={settings.platformName}
          onChange={(e) => onChange("general", "platformName", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Contact Email</label>
        <input
          type="email"
          value={settings.contactEmail}
          onChange={(e) => onChange("general", "contactEmail", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Support Phone</label>
        <input
          type="text"
          value={settings.supportPhone}
          onChange={(e) => onChange("general", "supportPhone", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Default Language</label>
        <select
          value={settings.defaultLanguage}
          onChange={(e) =>
            onChange("general", "defaultLanguage", e.target.value)
          }
          className={inputClass}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className={labelClass}>Platform Description</label>
        <textarea
          value={settings.platformDescription}
          onChange={(e) =>
            onChange("general", "platformDescription", e.target.value)
          }
          rows="3"
          className={inputClass}
        />
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button onClick={() => onSave("general")} className={saveBtnClass}>
        Save General Settings
      </button>
    </div>
  </div>
);

const PaymentSettings = ({ settings, onChange, onSave }) => (
  <div className={sectionClass}>
    <h3 className={sectionTitleClass}>Payment Settings</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={labelClass}>Currency</label>
        <select
          value={settings.currency}
          onChange={(e) => onChange("payment", "currency", e.target.value)}
          className={inputClass}
        >
          <option value="INR">INR (₹)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Platform Commission (%)</label>
        <input
          type="number"
          value={settings.commissionRate}
          onChange={(e) =>
            onChange("payment", "commissionRate", parseInt(e.target.value))
          }
          min="0"
          max="100"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Payout Delay (Days)</label>
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
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Tax Rate (%)</label>
        <input
          type="number"
          value={settings.taxRate}
          onChange={(e) =>
            onChange("payment", "taxRate", parseFloat(e.target.value))
          }
          min="0"
          max="50"
          step="0.1"
          className={inputClass}
        />
      </div>

      <div className="md:col-span-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.enableTax}
            onChange={(e) => onChange("payment", "enableTax", e.target.checked)}
            className={checkboxClass}
          />
          <label className="ml-2 text-sm font-medium text-text-2">
            Enable Tax Calculation
          </label>
        </div>
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button onClick={() => onSave("payment")} className={saveBtnClass}>
        Save Payment Settings
      </button>
    </div>
  </div>
);

const CourseSettings = ({ settings, onChange, onSave }) => (
  <div className={sectionClass}>
    <h3 className={sectionTitleClass}>Course Settings</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={labelClass}>Max Course Duration (hours)</label>
        <input
          type="number"
          value={settings.maxCourseDuration}
          onChange={(e) =>
            onChange("course", "maxCourseDuration", parseInt(e.target.value))
          }
          min="1"
          max="500"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Minimum Course Price (₹)</label>
        <input
          type="number"
          value={settings.minCoursePrice}
          onChange={(e) =>
            onChange("course", "minCoursePrice", parseInt(e.target.value))
          }
          min="0"
          max="1000"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Maximum Course Price (₹)</label>
        <input
          type="number"
          value={settings.maxCoursePrice}
          onChange={(e) =>
            onChange("course", "maxCoursePrice", parseInt(e.target.value))
          }
          min="1"
          max="10000"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Refund Period (Days)</label>
        <input
          type="number"
          value={settings.refundPeriod}
          onChange={(e) =>
            onChange("course", "refundPeriod", parseInt(e.target.value))
          }
          min="0"
          max="365"
          className={inputClass}
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
            className={checkboxClass}
          />
          <label className="ml-2 text-sm font-medium text-text-2">
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
            className={checkboxClass}
          />
          <label className="ml-2 text-sm font-medium text-text-2">
            Allow course refunds
          </label>
        </div>
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button onClick={() => onSave("course")} className={saveBtnClass}>
        Save Course Settings
      </button>
    </div>
  </div>
);

const SecuritySettings = ({ settings, onChange, onSave }) => (
  <div className={sectionClass}>
    <h3 className={sectionTitleClass}>Security Settings</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={labelClass}>Session Timeout (minutes)</label>
        <input
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) =>
            onChange("security", "sessionTimeout", parseInt(e.target.value))
          }
          min="5"
          max="1440"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Max Login Attempts</label>
        <input
          type="number"
          value={settings.maxLoginAttempts}
          onChange={(e) =>
            onChange("security", "maxLoginAttempts", parseInt(e.target.value))
          }
          min="1"
          max="10"
          className={inputClass}
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
          className={checkboxClass}
        />
        <label className="ml-2 text-sm font-medium text-text-2">
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
          className={checkboxClass}
        />
        <label className="ml-2 text-sm font-medium text-text-2">
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
          className={checkboxClass}
        />
        <label className="ml-2 text-sm font-medium text-text-2">
          Require strong passwords
        </label>
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button onClick={() => onSave("security")} className={saveBtnClass}>
        Save Security Settings
      </button>
    </div>
  </div>
);

const EmailSettings = ({ settings, onChange, onSave }) => (
  <div className={sectionClass}>
    <h3 className={sectionTitleClass}>Email Settings</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={labelClass}>SMTP Host</label>
        <input
          type="text"
          value={settings.smtpHost}
          onChange={(e) => onChange("email", "smtpHost", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>SMTP Port</label>
        <input
          type="number"
          value={settings.smtpPort}
          onChange={(e) =>
            onChange("email", "smtpPort", parseInt(e.target.value))
          }
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>SMTP Username</label>
        <input
          type="text"
          value={settings.smtpUsername}
          onChange={(e) => onChange("email", "smtpUsername", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>SMTP Password</label>
        <input
          type="password"
          value={settings.smtpPassword}
          onChange={(e) => onChange("email", "smtpPassword", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>From Email</label>
        <input
          type="email"
          value={settings.fromEmail}
          onChange={(e) => onChange("email", "fromEmail", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>From Name</label>
        <input
          type="text"
          value={settings.fromName}
          onChange={(e) => onChange("email", "fromName", e.target.value)}
          className={inputClass}
        />
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button onClick={() => onSave("email")} className={saveBtnClass}>
        Save Email Settings
      </button>
    </div>
  </div>
);

const MaintenanceSettings = ({ onSave }) => (
  <div className={sectionClass}>
    <h3 className={sectionTitleClass}>Maintenance Settings</h3>

    <div className="space-y-6">
      <div className="bg-gold-soft border border-gold-dim rounded-[10px] p-4">
        <h4 className="text-gold font-semibold mb-2">⚠️ Maintenance Mode</h4>
        <p className="text-text-2 text-sm">
          Enable maintenance mode to temporarily take the platform offline for
          updates.
        </p>
        <div className="flex items-center mt-3">
          <input type="checkbox" className={checkboxClass} />
          <label className="ml-2 text-sm font-medium text-text-2">
            Enable Maintenance Mode
          </label>
        </div>
      </div>

      <div className="bg-accent-blue-soft border border-accent-blue/30 rounded-[10px] p-4">
        <h4 className="text-accent-blue font-semibold mb-2">
          🔄 Cache Management
        </h4>
        <p className="text-text-2 text-sm">
          Clear platform cache to refresh data and improve performance.
        </p>
        <button className="mt-3 bg-accent-blue hover:opacity-90 text-bg px-4 py-2 rounded text-sm font-semibold transition-opacity">
          Clear All Cache
        </button>
      </div>

      <div className="bg-danger-soft border border-danger/30 rounded-[10px] p-4">
        <h4 className="text-danger font-semibold mb-2">🗑️ Data Management</h4>
        <p className="text-text-2 text-sm">
          Permanently delete old data and optimize database performance.
        </p>
        <button className="mt-3 bg-danger hover:opacity-90 text-bg px-4 py-2 rounded text-sm font-semibold transition-opacity">
          Optimize Database
        </button>
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button onClick={() => onSave("maintenance")} className={saveBtnClass}>
        Save Maintenance Settings
      </button>
    </div>
  </div>
);

export default PlatformSettings;
