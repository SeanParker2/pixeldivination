import React from 'react';
import { CirclePlay } from 'lucide-react';

interface ProductCardProps {
  title: string;
  category: string;
  buff: string;
  price: string;
  imageUrl: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  category,
  buff,
  price,
  imageUrl
}) => {
  return (
    <div className="flex w-full bg-transparent p-4 border-b border-white/5 hover:bg-white/5 transition-colors group">
      {/* Left: Image */}
      <div className="relative w-24 h-24 flex-shrink-0 mr-4">
        <div className="w-full h-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlByb2R1Y3Q8L3RleHQ+PC9zdmc+';
            }}
          />
        </div>
        
        {/* Play Button Overlay */}
        <div className="absolute bottom-1 right-1 text-white/80 group-hover:text-white transition-colors">
          <CirclePlay size={20} fill="rgba(0,0,0,0.5)" />
        </div>
      </div>

      {/* Right: Info */}
      <div className="flex flex-col justify-between flex-1 py-1">
        <h3 className="text-white text-base font-medium leading-tight line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-col gap-1 mt-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/5 px-1.5 py-0.5 rounded text-[10px] text-gray-400 border border-white/5">
              品类: {category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white/5 px-1.5 py-0.5 rounded text-[10px] text-gray-400 border border-white/5">
              加成: {buff}
            </span>
          </div>
        </div>

        <div className="mt-2 text-[#FF4D4F] text-lg font-bold font-sans">
           ¥ {price}
        </div>
      </div>
    </div>
  );
};
