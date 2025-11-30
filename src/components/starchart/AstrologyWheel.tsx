import React from 'react';

export const AstrologyWheel: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-6 relative">
      <div className="relative w-[90%] max-w-xs aspect-square">
        {/* Placeholder Image with Spin Animation */}
        <img 
          src="/images/starchart/chart_placeholder.png" 
          alt="Astrology Chart" 
          className="w-full h-full object-contain animate-[spin_60s_linear_infinite]"
          onError={(e) => {
            // Fallback SVG if image is missing
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+CiAgICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjE5MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDQ0IiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTUwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPGxpbmUgeDE9IjIwMCIgeTE9IjEwIiB4Mj0iMjAwIiB5Mj0iMzkwIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPGxpbmUgeDE9IjEwIiB5MT0iMjAwIiB4Mj0iMzkwIiB5Mj0iMjAwIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPHRleHQgeD0iMjAwIiB5PSIyMDUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBsYWNlaG9sZGVyPC90ZXh0Pgo8L3N2Zz4=';
          }}
        />
        
        {/* Center decorative point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
      </div>
    </div>
  );
};
