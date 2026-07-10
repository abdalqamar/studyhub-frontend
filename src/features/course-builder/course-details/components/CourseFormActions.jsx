import { ChevronRight, Loader } from "lucide-react";

const CourseFormActions = ({ onBack, isPending, isEditMode, isDirty }) => (
  <div className="flex justify-between pt-6 border-t border-border">
    <button
      disabled={isPending}
      type="button"
      onClick={onBack}
      className="border border-border-strong px-4 py-2 rounded-lg text-text-2 hover:text-text-1 hover:border-text-3 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isPending}
      className="px-5 py-2.5 bg-gold text-bg font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:shadow-gold-glow transition-shadow"
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <ChevronRight className="w-4 h-4" />
      )}
      {isEditMode ? (isDirty ? "Update" : "Next") : "Next"}
    </button>
  </div>
);

export default CourseFormActions;
