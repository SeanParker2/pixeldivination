import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User2, Check } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import { PERSONAS, type PersonaType } from '../../types/ai';

interface PersonaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PersonaDrawer: React.FC<PersonaDrawerProps> = ({ isOpen, onClose }) => {
  const { activePersona, setPersona } = useUserStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#1E1E2E] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <User2 className="text-pixel-gold" size={20} />
                <h2 className="text-white font-bold text-lg">选择占卜师人格</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Persona List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {Object.entries(PERSONAS).map(([key, persona]) => {
                const isActive = activePersona === key;
                return (
                  <div 
                    key={key}
                    onClick={() => {
                        setPersona(key as PersonaType);
                        onClose();
                    }}
                    className={`
                        relative overflow-hidden rounded-xl border transition-all cursor-pointer group
                        ${isActive 
                            ? 'bg-purple-500/10 border-pixel-gold shadow-[0_0_15px_rgba(251,191,36,0.2)]' 
                            : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'}
                    `}
                  >
                    <div className="p-4 relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className={`text-lg font-bold ${isActive ? 'text-pixel-gold' : 'text-white'}`}>
                                {persona.name}
                            </h3>
                            {isActive && (
                                <div className="bg-pixel-gold/20 p-1 rounded-full">
                                    <Check size={16} className="text-pixel-gold" />
                                </div>
                            )}
                        </div>
                        
                        <p className="text-sm text-gray-300 mb-2 font-pixel">
                            {persona.desc}
                        </p>
                        
                        <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {persona.prompt}
                        </div>
                    </div>

                    {/* Active Background Effect */}
                    {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-pixel-gold/5 to-transparent pointer-events-none" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
