import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../utils";

function Modal({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton =  true,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("pointerdown", handleClickOutside);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed text-white inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className={cn(
          "relative bg-dark rounded-xl shadow-2xl w-full max-w-lg max-h-full transform transition-all border",
          className
        )}
      >
        {/* Close Button (Optional) */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1 rounded-md bg-black/40 hover:bg-black/60 transition-colors"
          >
            <svg
              xmlns="http:www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        {/* Content */}
        <div className={cn("p-6", !showCloseButton && "p-0")}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
