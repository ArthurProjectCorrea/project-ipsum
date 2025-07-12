import { useState, useCallback } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: string }>>([]);

  const showToast = useCallback((message: string, type: string = "info") => {
    const id = Math.random().toString(36);
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return { toasts, showToast, hideToast };
};
