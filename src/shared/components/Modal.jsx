import { createPortal } from "react-dom";
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
          icon: <Info className="w-8 h-8 text-gold" />,
          bgColor: "bg-blue-100",
          buttonColor: "bg-gold hover:bg-gold-dim",
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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative bg-surface rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 flex flex-col items-center text-center border border-border">
        {/* Close button */}
        <button
          onClick={modalData?.onClose}
          className="absolute top-4 right-4 text-text-2 hover:text-text-2"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div
          className={`flex items-center justify-center ${bgColor} rounded-full w-16 h-16 mb-4`}
        >
          {icon}
        </div>

        <h2 className="text-2xl font-bold mb-2 text-white">
          {modalData?.title}
        </h2>

        <p className="text-gray-400 mb-6">{modalData?.message}</p>

        {modalData?.details && (
          <div className="w-full bg-surface-2 rounded-lg p-4 mb-6 border border-border">
            <p className="text-sm text-text-2">{modalData.details}</p>
          </div>
        )}

        <div className="flex gap-3 w-full">
          <button
            onClick={modalData?.onClose}
            className="flex-1 px-6 py-3 bg-surface-2 text-text-2 rounded-lg hover:bg-surface-2"
          >
            {modalData?.cancelText || "Cancel"}
          </button>

          <button
            onClick={() => {
              modalData?.onConfirm?.();
              modalData?.onClose?.();
            }}
            className={`flex-1 px-6 py-3 ${buttonColor} text-white rounded-lg`}
          >
            {modalData?.confirmText || "Confirm"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
