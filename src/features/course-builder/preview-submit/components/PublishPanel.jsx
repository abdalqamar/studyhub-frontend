import { FileText, Loader } from "lucide-react";

const PublishPanel = ({ onPublish, onBack, isPending }) => (
  <div className="bg-surface rounded-xl p-5 border border-border space-y-3">
    <h4 className="font-display text-base">Publish course</h4>
    <button
      onClick={onPublish}
      disabled={isPending}
      className="w-full bg-gold text-bg py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-gold-glow transition-shadow"
    >
      {isPending ? <Loader size={15} className="animate-spin" /> : <FileText size={15} />}
      {isPending ? "Publishing…" : "Publish course"}
    </button>
    <button
      disabled={isPending}
      onClick={onBack}
      className="w-full text-text-2 py-2.5 rounded-lg text-sm border border-border-strong disabled:opacity-50"
    >
      Back to curriculum
    </button>
  </div>
);

export default PublishPanel;
