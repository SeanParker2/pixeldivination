import React, { forwardRef } from 'react';
import type { TarotCard } from '../../stores/useDivinationStore';
import type { PartnerData } from '../starchart/PartnerInputForm';
import { AstrologyWheel } from '../starchart/AstrologyWheel';
import { X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ShareCardProps {
  activeTab?: string; // '本命盘' | '合盘' | '天象'
  report?: string | null;
  partnerData?: PartnerData | null;
  
  // Original props (for compatibility or removal later)
  userName?: string;
  date?: string;
  type?: 'tarot' | 'natal-chart';
  tarotCards?: TarotCard[];
  summary?: string;

  // Modal props
  isOpen?: boolean;
  onClose?: () => void;
  shareImage?: string | null;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({
  activeTab,
  report,
  partnerData,
  
  userName,
  date,
  type,
  tarotCards,
  summary,

  isOpen,
  onClose,
  shareImage
}, ref) => {
  
  // If used as a modal wrapper
  if (isOpen !== undefined) {
    return (
      <AnimatePresence>
         {isOpen && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
             onClick={onClose}
           >
             <div className="relative w-full max-w-sm" onClick={e => e.stopPropagation()}>
               <button 
                 onClick={onClose}
                 className="absolute -top-10 right-0 text-white/60 hover:text-white"
               >
                 <X size={24} />
               </button>
               
               {shareImage && (
                 <div className="space-y-4">
                   <img src={shareImage} alt="Share Card" className="w-full rounded-xl shadow-2xl border border-white/10" />
                   <div className="flex justify-center">
                      <a 
                        href={shareImage} 
                        download={`pixel-share-${new Date().getTime()}.png`}
                        className="flex items-center gap-2 bg-pixel-gold text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-pixel-gold/90 transition-colors"
                      >
                        <Download size={18} />
                        保存图片
                      </a>
                   </div>
                   <p className="text-center text-white/40 text-xs">或长按图片保存</p>
                 </div>
               )}
             </div>
           </motion.div>
         )}
       </AnimatePresence>
    );
  }

  // If used as the hidden render target
  const displayType = type || (['本命盘', '合盘', '行运盘', '天象盘'].includes(activeTab || '') ? 'astrology' : 'tarot');
  const displaySummary = summary || report || '';
  
  const getTitle = () => {
    if (displayType === 'tarot') return '塔罗指引';
    switch (activeTab) {
      case '合盘': return '双人合盘';
      case '行运盘': return '行运推演';
      case '天象盘': return '今日天象';
      default: return '本命星盘';
    }
  };

  return (
    <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
    <div 
      ref={ref}
      className="relative w-[375px] h-[667px] bg-zinc-900 overflow-hidden flex flex-col"
      style={{ 
        // Ensure consistent rendering for screenshot
        fontFamily: "'Press Start 2P', system-ui, sans-serif" 
      }}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")` 
        }} 
      />
      
      {/* Header */}
      <div className="p-6 pt-8 flex justify-between items-start z-10">
        <div>
          <div className="text-xs text-pixel-gold mb-1">PIXEL DIVINATION</div>
          <h2 className="text-xl text-white leading-tight tracking-tighter">
            {getTitle()}
          </h2>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400">{date}</div>
          <div className="text-xs text-white font-bold mt-1">{userName}</div>
        </div>
      </div>

      {/* Main Visual */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 z-10 relative">
        {displayType === 'tarot' && tarotCards && (
          <div className="w-full space-y-4">
            {/* Main Card (Middle or First) */}
            <div className="flex justify-center">
              <div className="w-32 h-48 rounded-lg border-2 border-pixel-gold shadow-[0_0_15px_rgba(255,215,0,0.3)] overflow-hidden bg-black/50">
                 <img 
                   src={tarotCards[0]?.image} 
                   alt={tarotCards[0]?.name}
                   className="w-full h-full object-cover"
                 />
              </div>
            </div>
            
            {/* Card Name */}
            <div className="text-center">
              <h3 className="text-lg text-pixel-gold mb-1">{tarotCards[0]?.name}</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">{tarotCards[0]?.nameEn}</p>
            </div>

            {/* If more cards, maybe show small thumbnails or just focus on one */}
            {tarotCards.length > 1 && (
              <div className="flex justify-center gap-2 mt-2">
                {tarotCards.slice(1).map((card, i) => (
                  <div key={i} className="w-12 h-16 opacity-60 border border-white/20 rounded overflow-hidden">
                    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {displayType === 'astrology' && (
          <div className="w-full aspect-square relative scale-90">
             <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse" />
             {/* Pass static props if needed, or just render the visual */}
             {/* Note: AstrologyWheel needs to be able to render without interactivity here */}
             <div className="pointer-events-none">
               <AstrologyWheel 
                 date={['行运盘', '天象盘'].includes(activeTab || '') ? new Date() : undefined}
               /> 
             </div>
             {activeTab === '合盘' && partnerData && (
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16 bg-black/50 px-3 py-1 rounded-full text-[10px] text-pink-300 border border-pink-500/30 backdrop-blur-sm">
                 & {partnerData.name}
               </div>
             )}
          </div>
        )}
      </div>

      {/* AI Summary / Footer */}
      <div className="p-6 pb-8 z-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 relative">
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-pixel-gold" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-pixel-gold" />
          
          <p className="text-xs text-gray-300 leading-relaxed line-clamp-4 font-sans">
            {displaySummary.replace(/[#*`]/g, '')}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-col">
             <span className="text-[10px] text-gray-500">SCAN TO PLAY</span>
             <span className="text-xs text-pixel-gold font-bold">PIXELDIVINATION.APP</span>
          </div>
          
          {/* Fake QR Code */}
          <div className="w-12 h-12 bg-white p-1">
            <div className="w-full h-full border-2 border-black relative">
               <div className="absolute top-1 left-1 w-2 h-2 bg-black" />
               <div className="absolute top-1 right-1 w-2 h-2 bg-black" />
               <div className="absolute bottom-1 left-1 w-2 h-2 bg-black" />
               <div className="absolute bottom-3 right-3 w-2 h-2 bg-black rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
});

ShareCard.displayName = 'ShareCard';
