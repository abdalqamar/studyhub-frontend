import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Save, X } from "lucide-react";
import { sectionSchema } from "../../../schemas/sectionSchema";
import { useCreateSection } from "../hooks/useCreateSection";
import { useUpdateSection } from "../hooks/useUpdateSection";

const SectionForm = ({
  courseId,
  onCancel,
  isEditing = false,
  editingSection = null,
}) => {
  const createSectionMutation = useCreateSection(courseId);
  const updateSectionMutation = useUpdateSection(courseId);
  const isSaving =
    createSectionMutation.isPending || updateSectionMutation.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sectionSchema),
    defaultValues: { sectionName: editingSection?.sectionName || "" },
  });

  const handleSave = (data) => {
    const sectionName = data.sectionName.trim();

    if (isEditing) {
      updateSectionMutation.mutate(
        { sectionId: editingSection._id, sectionName },
        { onSuccess: onCancel }
      );
    } else {
      createSectionMutation.mutate({ sectionName }, { onSuccess: onCancel });
    }
  };

  return (
    <div className="bg-surface-raised border border-gold/40 rounded-xl p-5 mb-6">
      <h3 className="font-display text-base mb-4">
        {isEditing ? "Edit section" : "New section"}
      </h3>
      <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-2 mb-2">
            Section name *
          </label>
          <input
            {...register("sectionName")}
            className="w-full bg-surface-2 border border-gold/40 text-text-1 placeholder-text-3 focus:outline-none focus:border-gold text-sm rounded-lg px-4 py-3"
            placeholder="e.g. Getting started"
            autoFocus
            disabled={isSaving}
          />
          {errors.sectionName && (
            <p className="text-danger text-sm mt-1">
              {errors.sectionName.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-gold text-bg rounded-lg text-sm font-medium disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {isEditing ? "Update section" : "Create section"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="px-4 py-2 bg-surface-2 text-text-2 rounded-lg text-sm disabled:opacity-50 flex items-center gap-2"
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SectionForm;
