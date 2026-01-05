import { useState } from "react";
import Announcements from "./components/Announcements";
import CourseReviewNotifications from "./components/CourseReviewNotifications";

const AdminNotifications = () => {
  const [activeTab, setActiveTab] = useState("announcements");
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
