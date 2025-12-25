import React, { useEffect } from "react";
import FocusLock from "react-focus-lock";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Dialog = ({ open, onClose, title, children }: DialogProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <FocusLock returnFocus>
        <div
          className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg w-full max-w-lg p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Dialog"
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-900"
          >
            <X size={18} />
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold mb-4">{title}</h2>

          {/* Content */}
          {children}
        </div>
      </FocusLock>
    </div>
  );
};

export default Dialog;
