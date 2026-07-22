import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProfile } from "../hooks/useProfile";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import FormInput from "@/shared/ui/FormInput";
import type { User } from "@/types";

interface ProfileInfoSectionProps {
  user: User;
  isEditing: boolean;
  toggleEdit: () => void;
}

interface ProfileInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
}

const ProfileInfoSection = ({
  user,
  isEditing,
  toggleEdit,
}: ProfileInfoSectionProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profileImage);

  const { updateProfileMutation, updatePhotoMutation } = useProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileInfoFormData>();

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  //  Upload Photo
  const handleUpdatePhoto = () => {
    if (!selectedFile) return errorToast("Please select a photo.");

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    updatePhotoMutation.mutate(formData, {
      onSuccess: () => {
        successToast("Profile photo updated!");
        toggleEdit();
      },
      onError: (err) => {
        errorToast(err?.response?.data?.message || "Failed to update photo");
      },
    });
  };

  // Update Profile Info
  const onSubmit = (data: ProfileInfoFormData) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        successToast("Profile updated");
        toggleEdit();
      },
      onError: (err) => {
        errorToast(err?.response?.data?.message || "Failed to update profile");
      },
    });
  };

  return (
    <>
      <section className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

        {/* Image Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-border"
          />

          {isEditing && (
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-300 file:px-3 file:py-2 
                file:rounded-md file:border-0 file:bg-surface 
                file:text-gray-200 hover:file:bg-[#2a2a2a]"
              />

              <button
                onClick={handleUpdatePhoto}
                type="button"
                disabled={!selectedFile || updatePhotoMutation.isPending}
                className="bg-gold hover:bg-gold-dim px-4 py-2 rounded-md disabled:opacity-60"
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
            className="bg-gold hover:opacity-90 text-bg font-semibold px-4 py-2 rounded-lg disabled:opacity-60 mt-4 transition-opacity"
          >
            {updateProfileMutation.isPending ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </section>
    </>
  );
};

export default ProfileInfoSection;
