import toast from "react-hot-toast";
import { X, CheckCircle, AlertTriangle, CircleX } from "lucide-react";

const TOAST_ID = "global-toast"; // one toast at a time

// Success Toast
export const successToast = (msg) => {
  toast.dismiss(); // remove old toast

  toast.custom(
    (t) => (
      <div
        className={`p-4 rounded-xl border border-green-500/40 bg-green-500/10
          text-green-300 text-sm font-medium shadow-lg backdrop-blur-md
          animate-in fade-in slide-in-from-top-2 flex items-center gap-4
          ${t.visible ? "opacity-100" : "opacity-0"} transition`}
      >
        <CheckCircle className="text-green-400" size={20} />

        <span className="flex-1">{msg}</span>

        <button
          className="text-green-300 hover:text-green-100"
          onClick={() => toast.dismiss(TOAST_ID)}
        >
          <X size={18} />
        </button>
      </div>
    ),
    { id: TOAST_ID, duration: 4000 }
  );
};

// Error Toast
export const errorToast = (msg) => {
  toast.dismiss();

  toast.custom(
    (t) => (
      <div
        className={`p-4 rounded-xl border border-red-500/40 bg-red-500/10
          text-red-300 text-sm font-medium shadow-lg backdrop-blur-md
          animate-in fade-in slide-in-from-top-2 flex items-center gap-4
          ${t.visible ? "opacity-100" : "opacity-0"} transition`}
      >
        <CircleX className="text-red-400" size={20} />

        <span className="flex-1">{msg}</span>

        <button
          className="text-red-300 hover:text-red-100"
          onClick={() => toast.dismiss(TOAST_ID)}
        >
          <X size={18} />
        </button>
      </div>
    ),
    { id: TOAST_ID, duration: 4000 }
  );
};

// Warning Toast
export const warningToast = (msg) => {
  toast.dismiss();

  toast.custom(
    (t) => (
      <div
        className={`p-4 rounded-xl border border-yellow-500/40 bg-yellow-500/10
          text-yellow-300 text-sm font-medium shadow-lg backdrop-blur-md 
          animate-in fade-in slide-in-from-top-2 flex items-center gap-4
          ${t.visible ? "opacity-100" : "opacity-0"} transition`}
      >
        <AlertTriangle className="text-yellow-400" size={20} />

        <span className="flex-1">{msg}</span>

        <button
          className="text-yellow-200 hover:text-yellow-50"
          onClick={() => toast.dismiss(TOAST_ID)}
        >
          <X size={18} />
        </button>
      </div>
    ),
    { id: TOAST_ID, duration: 4000 }
  );
};
