import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormInput from "../../components/ui/FormInput";
import { useProfile } from "../../hooks/useProfile.js";

const ProfileInfoSection = ({ user, isEditing, toggleEdit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profileImage);

  const { updateProfileMutation, updatePhotoMutation } = useProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });

      setPreviewUrl(user.profileImage);
    }
  }, [user, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  // ⬆ Upload Photo
  const handleUpdatePhoto = () => {
    if (!selectedFile) return toast.error("Please select a photo.");

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    updatePhotoMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile photo updated!");
        toggleEdit();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to update photo");
      },
    });
  };

  // Update Profile Info
  const onSubmit = (data) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Profile updated");
        toggleEdit();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to update profile");
      },
    });
  };

  return (
    <>
      <section className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

        {/* Image Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-slate-700"
          />

          {isEditing && (
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-300 file:px-3 file:py-2 
                file:rounded-md file:border-0 file:bg-slate-900 
                file:text-gray-200 hover:file:bg-[#2a2a2a]"
              />

              <button
                onClick={handleUpdatePhoto}
                type="button"
                disabled={!selectedFile || updatePhotoMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md disabled:opacity-60"
              >
                {updatePhotoMutation.isPending
                  ? "Uploading..."
                  : "Update Photo"}
              </button>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormInput
              label="First Name"
              name="firstName"
              register={register}
              validation={{
                required: "First name is required",
                minLength: { value: 2, message: "Min 2 characters" },
              }}
              error={errors.firstName}
              placeholder="Enter first name"
              disabled={!isEditing}
            />

            <FormInput
              label="Last Name"
              name="lastName"
              register={register}
              validation={{ required: "Last name is required" }}
              error={errors.lastName}
              placeholder="Enter last name"
              disabled={!isEditing}
            />

            <FormInput
              label="Email"
              name="email"
              type="email"
              disabled
              register={register}
            />
          </div>

          <button
            type="submit"
            disabled={!isEditing || updateProfileMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md disabled:opacity-60"
          >
            {updateProfileMutation.isPending ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </section>
    </>
  );
};

export default ProfileInfoSection;
