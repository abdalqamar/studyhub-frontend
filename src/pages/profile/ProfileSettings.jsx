import { useState } from "react";
import { Edit3, View } from "lucide-react";
import ProfileInfoSection from "./ProfileInfoSection";
import PersonalDetails from "./PersonalDetails";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
import PasswordSection from "./PasswordSection.jsx";
import { useProfile } from "../../hooks/useProfile.js";

// const ProfileSettings = () => {
//   const dispatch = useDispatch();
//   const { user, loading } = useSelector((state) => state.profile);
//   const [isEditing, setIsEditing] = useState(false);
//   const toggleEdit = () => setIsEditing(!isEditing);

//   if (loading) {
//     <LoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen text-gray-100 p-6 mx-auto max-w-5xl space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Account Settings</h1>
//         <button
//           onClick={toggleEdit}
//           className="flex gap-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-800/30 transition-colors border border-blue-400/30 hover:border-blue-400/50"
//         >
//           {isEditing ? <View size={18} /> : <Edit3 size={18} />}
//           {isEditing ? "View" : "Edit"}
//         </button>
//       </div>

//       <ProfileInfoSection
//         user={user}
//         isEditing={isEditing}
//         toggleEdit={toggleEdit}
//       />
//       <PersonalDetails
//         user={user}
//         isEditing={isEditing}
//         toggleEdit={toggleEdit}
//       />
//       {/* Uncomment when ready */}
//       {/* <PasswordSection isEditing={isEditing} toggleEdit={toggleEdit} /> */}
//     </div>
//   );
// };

// export default ProfileSettings;

const ProfileSettings = () => {
  const { profileQuery } = useProfile();
  const { data: user, isLoading } = profileQuery;

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen text-gray-100 p-6 mx-auto max-w-5xl space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <button
          onClick={toggleEdit}
          className="flex gap-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-800/30 transition-colors border border-blue-400/30 hover:border-blue-400/50"
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
    </div>
  );
};

export default ProfileSettings;
