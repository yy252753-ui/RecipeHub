"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ToastType = "default" | "success" | "error";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  toast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "default") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {toasts.length > 0 && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col-reverse items-center gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`pointer-events-auto whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-xl ${
                t.type === "error"
                  ? "bg-red-600"
                  : t.type === "success"
                    ? "bg-emerald-600"
                    : "bg-[var(--color-background-neutral-inverse)]"
              }`}
            >
              {t.message}
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}
