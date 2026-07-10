import { Save, X, Loader } from "lucide-react";

const LessonFormActions = ({ onCancel, isUploading, isEditing }) => (
  <div className="flex items-center gap-3">
    <button
      type="submit"
      disabled={isUploading}
      className="px-4 py-2 bg-gold text-bg rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
    >
      {isUploading ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
      {isEditing ? "Update lesson" : "Create lesson"}
    </button>
    <button
      type="button"
      onClick={onCancel}
      disabled={isUploading}
      className="px-4 py-2 bg-surface-2 text-text-2 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
    >
      <X size={16} /> Cancel
    </button>
  </div>
);

export default LessonFormActions;
