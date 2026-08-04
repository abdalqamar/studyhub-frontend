import { useState } from "react";
import { Edit3, View } from "lucide-react";

import ProfileInfoSection from "@/features/profile/components/ProfileInfoSection";
import PersonalDetails from "@/features/profile/components/PersonalDetails";
import PasswordSection from "@/features/profile/components/PasswordSection";
import { useProfile } from "@/features/profile/hooks/useProfile";
import SkeletonLoader from "@/shared/ui/SkeletonLoader";

const ProfileSettings = () => {
  const { profileQuery } = useProfile();
  const { data: user, isLoading } = profileQuery;
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);

  if (isLoading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen text-gray-100 p-6 mx-auto max-w-5xl space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <button
          onClick={toggleEdit}
          className="flex gap-x-2 text-gold hover:text-gold text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-800/30 transition-colors border border-gold/30 hover:border-gold/50"
        >
          {isEditing ? <View size={18} /> : <Edit3 size={18} />}
          {isEditing ? "View" : "Edit"}
        </button>
      </div>

      <ProfileInfoSection
        user={user}
        isEditing={isEditing}
        toggleEdit={toggleEdit}
      />

      <PersonalDetails
        user={user}
        isEditing={isEditing}
        toggleEdit={toggleEdit}
      />

      <PasswordSection isEditing={isEditing} toggleEdit={toggleEdit} />
    </div>
  );
};

export default ProfileSettings;
