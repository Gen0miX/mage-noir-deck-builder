import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheck, FaTimes, FaExclamation, FaInfo } from "react-icons/fa";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  children: ReactNode;
  type?: ToastType;
}

export default function Toast({ children, type }: ToastProps) {
  const [showToast, setShowToast] = useState(true);
  const duration = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const renderToastContent = () => {
    switch (type) {
      case "success":
        return (
          <div role="alert" className="alert alert-success text-base-content">
            <FaCheck size={18} className="text-base-content" />
            <span>{children}</span>
          </div>
        );
      case "error":
        return (
          <div role="alert" className="alert alert-error text-base-content">
            <FaTimes size={18} className="text-base-content" />
            <span>{children}</span>
          </div>
        );
      case "info":
        return (
          <div role="alert" className="alert alert-info text-base-content">
            <FaInfo size={18} className="text-base-content" />
            <span>{children}</span>
          </div>
        );
      case "warning":
        return (
          <div role="alert" className="alert alert-warning text-base-content">
            <FaExclamation size={18} className="text-base-content" />
            <span>{children}</span>
          </div>
        );
      default:
        return (
          <div role="alert" className="alert alert-info text-base-content">
            <FaInfo size={18} className="text-base-content" />
            <span>{children}</span>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          className="toast toast-top mt-20 "
          role="alert"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {renderToastContent()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
