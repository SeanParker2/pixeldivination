import React from 'react';

interface ProductCardProps {
  title: string;
  category: string;
  buff: string;
  price: string;
  imageUrl: string;
  hasAudio?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  category,
  buff,
  price,
  imageUrl,
  hasAudio
}) => {
  return (
    <div className="flex gap-4 p-3 bg-slate-800/60 border border-white/10 rounded-xl relative overflow-hidden active:scale-[0.98] active:bg-slate-700/80 transition-all group">
        {/* Thumb */}
        <div className="w-[100px] h-[100px] shrink-0 rounded-lg bg-black border border-white/10 relative overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzMzMiLz48L3N2Zz4=';
                }}
            />
            {hasAudio && (
                <div className="absolute bottom-1.5 right-1.5 w-6 h-6 bg-black/60 border border-white/50 rounded-full flex items-center justify-center text-white text-[10px] backdrop-blur-[2px]">
                    ▶
                </div>
            )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
            <div className="text-lg leading-[1.2] text-white font-pixel line-clamp-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]">
                {title}
            </div>
            
            <div className="flex gap-1.5 mt-1.5">
                <span className="text-xs px-1.5 py-0.5 rounded border border-[#475569] text-[#94a3b8] bg-white/[0.02]">
                    {category}
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded border border-[#fbbf24]/30 text-[#fbbf24] bg-[#fbbf24]/5">
                    {buff}
                </span>
            </div>

            <div className="flex justify-between items-end mt-2">
                <span className="text-xl text-[#f43f5e] drop-shadow-[0_0_8px_rgba(244,63,94,0.4)] tracking-wider font-pixel">
                    ¥ {price}
                </span>
                <div className="w-8 h-8 bg-[#fbbf24] text-black rounded-full flex items-center justify-center text-xl shadow-[0_0_10px_rgba(251,191,36,0.4)] cursor-pointer hover:bg-white transition-colors">
                    +
                </div>
            </div>
        </div>
    </div>
  );
};
