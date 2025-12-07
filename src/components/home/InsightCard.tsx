import React from 'react';
import { Music } from 'lucide-react';

interface InsightCardProps {
  onClick?: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ onClick }) => {
  return (
    <div 
      className="glass-card flex items-center gap-4 mx-4 mt-4 cursor-pointer group" 
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="w-20 h-20 rounded-lg border border-white/20 shadow-inner overflow-hidden shrink-0 relative bg-black/20">
         <img 
            src="/images/home/card_big_illustration.png" 
            alt="Insight" 
            className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ij48L2NpcmNsZT48cG9seWxpbmUgcG9pbnRzPSIyMSAxNSAxNiAxMCA1IDIxIj48L3BvbHlsaW5lPjwvc3ZnPg==';
            }}
        />
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-[#e2e8f0] font-medium text-lg leading-tight mb-1 group-hover:text-pixel-gold transition-colors">
          洞悉命理奥秘
        </h3>
        <p className="text-gray-400 text-xs line-clamp-2">
          人生起伏似谜，命理学从出生信息剖析运势走向...
        </p>
        
        <div className="flex items-center gap-1 mt-2 text-gray-500">
           <Music size={12} />
           <span className="text-xs">999+</span>
        </div>
      </div>
    </div>
  );
};
