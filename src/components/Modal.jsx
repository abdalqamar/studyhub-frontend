import {
  AlertTriangle,
  Trash2,
  CheckCircle,
  Info,
  XCircle,
  X,
} from "lucide-react";

const Modal = ({ modalData }) => {
  if (!modalData) return null;

  // Determine icon and colors based on type
  const getIconConfig = () => {
    switch (modalData?.type) {
      case "delete":
        return {
          icon: <Trash2 className="w-8 h-8 text-red-500" />,
          bgColor: "bg-red-100",
          buttonColor: "bg-red-600 hover:bg-red-700",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
          bgColor: "bg-yellow-100",
          buttonColor: "bg-yellow-600 hover:bg-yellow-700",
        };
      case "success":
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-500" />,
          bgColor: "bg-green-100",
          buttonColor: "bg-green-600 hover:bg-green-700",
        };
      case "info":
        return {
          icon: <Info className="w-8 h-8 text-blue-500" />,
          bgColor: "bg-blue-100",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
        };
      case "danger":
        return {
          icon: <XCircle className="w-8 h-8 text-red-500" />,
          bgColor: "bg-red-100",
          buttonColor: "bg-red-600 hover:bg-red-700",
        };
      default:
        return {
          icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
          bgColor: "bg-yellow-100",
          buttonColor: "bg-yellow-600 hover:bg-yellow-700",
        };
    }
  };

  const { icon, bgColor, buttonColor } = getIconConfig();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 flex flex-col items-center text-center animate-in zoom-in-95 duration-200 border border-slate-700">
        {/* Close button */}
        <button
          onClick={modalData?.onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div
          className={`flex items-center justify-center ${bgColor} rounded-full w-16 h-16 mb-4 shadow-lg`}
        >
          {icon}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-white">
          {modalData?.title}
        </h2>

        {/* Message */}
        <p className="text-gray-400 mb-6 leading-relaxed">
          {modalData?.message}
        </p>

        {/* Additional Info (Optional) */}
        {modalData?.details && (
          <div className="w-full bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
            <p className="text-sm text-slate-300">{modalData.details}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={modalData?.onClose}
            className="flex-1 px-6 py-3 bg-slate-700 text-slate-200 rounded-lg font-medium hover:bg-slate-600 transition-all duration-200 border border-slate-600"
          >
            {modalData?.cancelText || "Cancel"}
          </button>
          <button
            onClick={() => {
              modalData?.onConfirm?.();
              modalData?.onClose?.();
            }}
            className={`flex-1 px-6 py-3 ${buttonColor} text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl`}
          >
            {modalData?.confirmText || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
