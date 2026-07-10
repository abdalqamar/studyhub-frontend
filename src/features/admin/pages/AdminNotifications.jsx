import Announcements from "../components/Announcements";

const AdminNotifications = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          Notifications & Announcements
        </h1>
      </div>

      <Announcements />
    </div>
  );
};

export default AdminNotifications;
