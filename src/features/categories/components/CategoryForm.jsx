import FileUploader from "@/shared/components/FileUploader";
import { Save, X } from "lucide-react";

const CategoryForm = ({
  mode,
  formData,
  onFormChange,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const isEditMode = mode === "edit";

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-text-2 text-sm font-medium mb-2">
          Category Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
          className="w-full bg-surface-2 border border-border-strong rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold"
          placeholder="Enter category name"
          autoFocus
        />
      </div>

      <div>
        <label className="block text-text-2 text-sm font-medium mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            onFormChange({ ...formData, description: e.target.value })
          }
          className="w-full bg-surface-2 border border-border-strong rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold"
          rows="3"
          placeholder="Enter category description"
        />
      </div>

      <div>
        <label className="block text-text-2 text-sm font-medium mb-2">
          Category Image
        </label>
        <FileUploader
          type="image"
          onFileChange={(file) => onFormChange({ ...formData, image: file })}
          currentFile={formData.image}
          accept="image/*"
        />
        <p className="text-xs text-text-3 mt-1">
          {isEditMode
            ? "Leave empty to keep current image"
            : "Optional but recommended"}
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              {isEditMode ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              {isEditMode ? "Update" : "Save"}
            </>
          )}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 bg-surface-2 hover:bg-surface-2 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          <X className="h-5 w-5" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;
