import PlatformSettings from "../components/PlatformSettings";

const SystemSettings = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">System Settings</h1>
        <p className="text-text-2 mt-2">
          Manage platform configuration and preferences
        </p>
      </div>
      <PlatformSettings />
    </div>
  );
};

export default SystemSettings;
