import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToastStore } from '../../stores/useToastStore';

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
            className="pointer-events-auto min-w-[200px] max-w-xs flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl backdrop-blur-md border border-white/10"
            style={{
              backgroundColor: 
                toast.type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 
                toast.type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 
                'rgba(30, 41, 59, 0.9)',
            }}
          >
            {toast.type === 'success' && <CheckCircle size={18} className="text-white" />}
            {toast.type === 'error' && <AlertCircle size={18} className="text-white" />}
            {toast.type === 'info' && <Info size={18} className="text-white" />}
            
            <p className="text-sm text-white font-medium flex-1">{toast.message}</p>
            
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-white/70 hover:text-white"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
