import { Play, X } from "lucide-react";
const VideoModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">
            Platform Demo - See How It Works
          </h3>
          <button
            onClick={modalData?.onClose}
            className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 text-2xl leading-none"
          >
            <X />
          </button>
        </div>
        <div className="aspect-video bg-slate-800 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <Play className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <p className="text-slate-400">
              Platform demo video would play here
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Interactive dashboard, progress tracking, live sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
