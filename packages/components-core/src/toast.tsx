import React from "react";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  return (
    <div className={`toast toast-${type}`} onClick={onClose}>
      {message}
    </div>
  );
};
