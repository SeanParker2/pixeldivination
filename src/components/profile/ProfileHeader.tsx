import React from 'react';
import { Hexagon, Search } from 'lucide-react';

export const ProfileHeader: React.FC = () => {
  return (
    <div className="relative w-full h-72">
      {/* Background Image */}
      <img 
        src="/images/profile/bg_header.jpg" 
        alt="Profile Background" 
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback
          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgODAwIDQwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiM3MTgwOTYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSI0MCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvZmlsZSBCRzwvdGV4dD48L3N2Zz4=';
        }}
      />

      {/* Overlay Gradient for better visibility if needed, keeping it subtle or removing as per design */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

      {/* Top Left Icon: Settings */}
      <button className="absolute top-4 left-4 text-orange-200 hover:text-white transition-colors p-2 bg-black/10 rounded-full backdrop-blur-sm">
        <Hexagon size={24} />
      </button>

      {/* Top Right Icon: Search */}
      <button className="absolute top-4 right-4 text-orange-200 hover:text-white transition-colors p-2 bg-black/10 rounded-full backdrop-blur-sm">
        <Search size={24} />
      </button>

      {/* Overlapping Avatar */}
      <div className="absolute -bottom-10 right-6 w-24 h-24 rounded-full border-2 border-white overflow-hidden shadow-lg z-10 bg-pixel-midnight">
        <img 
            src="/images/home/avatar_user.png" 
            alt="User Avatar" 
            className="w-full h-full object-cover"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0yMCAyMWE4IDggMCAwIDAtMTYgMCI+PC9wYXRoPjwvc3ZnPg==';
            }}
        />
      </div>
    </div>
  );
};
