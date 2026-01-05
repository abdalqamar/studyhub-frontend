import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormInput from "../../components/ui/FormInput";
import { useProfile } from "../../hooks/useProfile";

const PersonalDetails = ({ user, isEditing, toggleEdit }) => {
  const { updateProfileMutation } = useProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        dob: user.dateOfBirth || "",
        contact: user.contactNumber || "",
        gender: user.gender || "",
        bio: user.about || "",
      });
    }
  }, [user, reset]);

  // Submit handler
  const onSubmit = (data) => {
    const payload = {
      dateOfBirth: data.dob,
      contactNumber: data.contact,
      gender: data.gender,
      about: data.bio,
    };

    updateProfileMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Personal details updated successfully");

        toggleEdit();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Update failed");
      },
    });
  };

  return (
    <section className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Personal Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormInput
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            error={errors.dob}
            disabled={!isEditing}
          />

          <FormInput
            label="Contact Number"
            name="contact"
            placeholder="Enter contact number"
            register={register}
            validation={{
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Contact must be 10 digits",
              },
            }}
            error={errors.contact}
            disabled={!isEditing}
          />

          <FormInput
            label="Gender"
            name="gender"
            type="select"
            register={register}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
            disabled={!isEditing}
          />
        </div>

        <FormInput
          label="About"
          name="bio"
          type="textarea"
          register={register}
          error={errors.bio}
          disabled={!isEditing}
        />

        <button
          type="submit"
          disabled={!isEditing || updateProfileMutation.isPending}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 
                     hover:from-indigo-600 hover:to-purple-700 
                     px-4 py-2 rounded-md disabled:opacity-60"
        >
          {updateProfileMutation.isPending ? "Updating..." : "Update Details"}
        </button>
      </form>
    </section>
  );
};

export default PersonalDetails;
