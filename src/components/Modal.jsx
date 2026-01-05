import { Play, X } from "lucide-react";

const Modal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-slate-900 rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col items-center text-center">
        <div className="flex items-center justify-center bg-yellow-100 rounded-full w-16 h-16 mb-4">
          <svg
            className="w-8 h-8 text-yellow-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-white">
          {modalData?.title}
        </h2>
        <p className="text-gray-400 mb-6">{modalData?.message}</p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={modalData?.onClose}
            className="px-6 py-2 bg-gray-700 text-gray-200 rounded-lg font-medium hover:bg-gray-600 transition"
          >
            {modalData?.cancelText || "Cancel"}
          </button>
          <button
            onClick={() => {
              modalData?.onConfirm?.();
              modalData?.onClose?.();
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            {modalData?.confirmText || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
