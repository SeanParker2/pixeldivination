import React from 'react';
import { motion } from 'framer-motion';
import type { LenormandCardData } from '../../data/lenormand';

interface LenormandCardProps {
  card: LenormandCardData;
  isFlipped: boolean;
  onClick?: () => void;
  className?: string;
}

export const LenormandCard: React.FC<LenormandCardProps> = ({ card, isFlipped, onClick, className = "" }) => {
  const Icon = card.icon;

  return (
    <div className={`relative perspective-1000 cursor-pointer ${className}`} onClick={onClick}>
      <motion.div
        className="w-full aspect-[2/3] relative preserve-3d"
        animate={{ rotateY: isFlipped ? 0 : 180 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face (The Content) - Shows when rotateY is 0 */}
        <div 
            className="absolute inset-0 rounded-xl border-2 border-pixel-black bg-pixel-beige shadow-pixel-sm flex flex-col items-center justify-between p-2 overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
        >
            {/* Corner Number */}
            <div className="w-full flex justify-between items-start px-1">
                <span className="font-pixel text-sm text-pixel-brown/80">{card.id}</span>
                <span className="font-pixel text-sm text-pixel-brown/80 rotate-180">{card.id}</span>
            </div>

            {/* Icon */}
            <div className="flex-1 flex items-center justify-center text-pixel-brown">
                <Icon size={42} strokeWidth={1.5} />
            </div>

            {/* Name */}
            <div className="w-full text-center pb-2">
                <span className="font-pixel text-base text-pixel-black font-bold tracking-widest">{card.name}</span>
            </div>
            
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none mix-blend-multiply" />
        </div>

        {/* Back Face (The Cover) - Shows when rotateY is 180 */}
        <div 
            className="absolute inset-0 rounded-xl border-2 border-pixel-black bg-pixel-brown shadow-pixel-sm flex items-center justify-center overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
            <div className="w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent" />
            <div className="absolute w-16 h-16 border-4 border-pixel-beige/30 rotate-45" />
            <div className="absolute w-12 h-12 border-2 border-pixel-beige/50 rotate-45" />
        </div>
      </motion.div>
    </div>
  );
};
