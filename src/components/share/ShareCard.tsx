import React, { forwardRef } from 'react';
import type { TarotCard } from '../../stores/useDivinationStore';
import { AstrologyWheel } from '../starchart/AstrologyWheel';

interface ShareCardProps {
  userName: string;
  date: string;
  type: 'tarot' | 'natal-chart';
  tarotCards?: TarotCard[];
  summary: string;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({
  userName,
  date,
  type,
  tarotCards,
  summary
}, ref) => {
  return (
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
            {type === 'tarot' ? '塔罗指引' : '本命星盘'}
          </h2>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400">{date}</div>
          <div className="text-xs text-white font-bold mt-1">{userName}</div>
        </div>
      </div>

      {/* Main Visual */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 z-10 relative">
        {type === 'tarot' && tarotCards && (
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

        {type === 'natal-chart' && (
          <div className="w-full aspect-square relative scale-90">
             <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse" />
             {/* Pass static props if needed, or just render the visual */}
             {/* Note: AstrologyWheel needs to be able to render without interactivity here */}
             <div className="pointer-events-none">
               <AstrologyWheel /> 
             </div>
          </div>
        )}
      </div>

      {/* AI Summary / Footer */}
      <div className="p-6 pb-8 z-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 relative">
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-pixel-gold" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-pixel-gold" />
          
          <p className="text-xs text-gray-300 leading-relaxed line-clamp-4 font-sans">
            {summary.replace(/[#*`]/g, '')}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-col">
             <span className="text-[10px] text-gray-500">SCAN TO PLAY</span>
             <span className="text-sm text-white font-bold tracking-widest">PIXEL.AI</span>
          </div>
          <div className="w-12 h-12 bg-white p-1 rounded-sm">
             {/* Placeholder QR Code */}
             <div className="w-full h-full bg-black grid grid-cols-4 grid-rows-4 gap-0.5 p-0.5">
                <div className="bg-white col-span-2 row-span-2" />
                <div className="bg-white col-start-4" />
                <div className="bg-white row-start-3" />
                <div className="bg-white col-start-3 row-start-4" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ShareCard.displayName = 'ShareCard';
