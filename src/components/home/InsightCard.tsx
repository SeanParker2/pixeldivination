import React from 'react';
import { Music } from 'lucide-react';

interface InsightCardProps {
  onClick?: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ onClick }) => {
  return (
    <div className="px-4 mt-4">
      <div 
        onClick={onClick}
        className="bg-pixel-card border border-pixel-border rounded-lg p-4 flex gap-4 items-center relative overflow-hidden cursor-pointer hover:border-pixel-gold/50 transition-colors group h-[140px]"
      >
        {/* Left Image Box */}
        <div className="w-[110px] h-[90px] shrink-0 relative z-10">
             <img 
                src="/images/home/card_big_illustration.png" 
                alt="Insight Illustration" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ij48L2NpcmNsZT48cG9seWxpbmUgcG9pbnRzPSIyMSAxNSAxNiAxMCA1IDIxIj48L3BvbHlsaW5lPjwvc3ZnPg==';
                }}
            />
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-between h-full py-2 z-10">
          <div>
            <h3 className="text-[#e4ded7] font-medium text-lg leading-tight mb-2 group-hover:text-pixel-gold transition-colors">
              洞悉命理奥秘,<br/>揭开命运潜藏密码
            </h3>
            <p className="text-[#e4ded7] text-xs line-clamp-2 opacity-70">
              人生起伏似谜，命理学从出生信息剖析运势走向...
            </p>
          </div>
          
          <div className="flex justify-start mt-2">
            <div className="flex items-center gap-1">
               {/* Music Icon + Count */}
               <div className="w-3.5 h-3.5 flex items-center justify-center">
                 <Music size={12} className="text-[#e4ded7]" />
               </div>
               <span className="text-[#e4ded7] text-xs font-medium">999+</span>
            </div>
          </div>
        </div>
        
        {/* Background Image / Gradient fallback */}
        <div className="absolute inset-0 bg-[#1E1E2E]/50 z-0" />
      </div>
    </div>
  );
};
