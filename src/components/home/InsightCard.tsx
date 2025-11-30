import React from 'react';
import { Music } from 'lucide-react';

interface InsightCardProps {
  onClick?: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ onClick }) => {
  return (
    <div className="px-2 mt-4">
      <div 
        onClick={onClick}
        className="bg-pixel-card border border-pixel-border rounded-xl p-3 flex gap-4 items-center relative overflow-hidden cursor-pointer hover:border-pixel-gold/50 transition-colors group"
      >
        {/* Left Image Box */}
        <div className="w-24 h-24 bg-white/10 rounded-lg border-2 border-white/20 shrink-0 overflow-hidden">
             <img 
                src="/images/home/card_big_illustration.png" 
                alt="Insight Illustration" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ij48L2NpcmNsZT48cG9seWxpbmUgcG9pbnRzPSIyMSAxNSAxNiAxMCA1IDIxIj48L3BvbHlsaW5lPjwvc3ZnPg==';
                }}
            />
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-between h-24 py-1">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight mb-1 group-hover:text-pixel-gold transition-colors">洞悉命理奥秘, <br/>揭开命运潜藏密码</h3>
            <p className="text-pixel-secondary text-xs line-clamp-2">
              人生起伏似谜，命理学从出生信息剖析运势走向，助你把握人生脉络。
            </p>
          </div>
          
          <div className="flex justify-start mt-2">
            <div className="bg-white/10 px-2 py-1 rounded flex items-center gap-1">
              <Music size={12} className="text-white" />
              <span className="text-white text-xs font-medium">999+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
