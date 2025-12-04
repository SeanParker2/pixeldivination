import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToastStore } from '../../stores/useToastStore';
import { cn } from '../../lib/utils';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-20 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            layout
            className={cn(
              "pointer-events-auto min-w-[200px] max-w-xs flex items-center gap-3 px-4 py-3 border-2 shadow-pixel backdrop-blur-md font-pixel",
              {
                'bg-pixel-success border-pixel-black text-pixel-black': toast.type === 'success',
                'bg-pixel-error border-pixel-black text-white': toast.type === 'error',
                'bg-pixel-info border-pixel-black text-white': toast.type === 'info',
              }
            )}
          >
            {toast.type === 'success' && <CheckCircle size={18} className="text-pixel-black" />}
            {toast.type === 'error' && <AlertCircle size={18} className="text-white" />}
            {toast.type === 'info' && <Info size={18} className="text-white" />}
            
            <p className="text-sm font-bold flex-1 uppercase">{toast.message}</p>
            
            <button 
              onClick={() => removeToast(toast.id)}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
