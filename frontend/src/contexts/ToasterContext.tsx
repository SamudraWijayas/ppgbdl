"use client";

import { createContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

export type ToasterType = "success" | "error" | "info" | "warning";

export interface ToasterState {
  type: ToasterType;
  message: string;
}

interface ToasterContextProps {
  setToaster: (value: ToasterState) => void;
}

export const ToasterContext = createContext<ToasterContextProps>({
  setToaster: () => {},
});

export default function ToasterProvider({ children }: { children: ReactNode }) {
  const [toaster, setToasterState] = useState<ToasterState>({
    type: "info",
    message: "",
  });
  const [visible, setVisible] = useState(false);

  const setToaster = useCallback((value: ToasterState) => {
    setToasterState(value);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  const getIcon = () => {
    switch (toaster.type) {
      case "success":
        return <CheckCircle2 className="text-green-500" size={22} />;
      case "error":
        return <XCircle className="text-red-500" size={22} />;
      case "warning":
        return <AlertTriangle className="text-yellow-500" size={22} />;
      default:
        return <Info className="text-blue-500" size={22} />;
    }
  };

  return (
    <ToasterContext.Provider value={{ setToaster }}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg bg-white border border-gray-200 z-999999"
          >
            {getIcon()}
            <p className="text-gray-800 font-medium">{toaster.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </ToasterContext.Provider>
  );
}
