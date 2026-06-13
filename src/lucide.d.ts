import React from 'react';
import type { SVGProps } from 'react';

declare module 'lucide-react' {
  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }
  
  export type LucideIcon = React.FC<LucideProps>;

  // Explicitly declare icons that are causing linter errors
  export const Star: LucideIcon;
  export const Music: LucideIcon;
  export const Ellipsis: LucideIcon;
  export const Disc: LucideIcon;
  export const Plus: LucideIcon;
  export const Store: LucideIcon;
  export const User: LucideIcon;
  export const Ghost: LucideIcon;
  export const House: LucideIcon;
  export const Layers: LucideIcon;
  export const Settings: LucideIcon;
  export const Hexagon: LucideIcon;
  export const Search: LucideIcon;
  export const FileText: LucideIcon;
  export const Inbox: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Heart: LucideIcon;
  export const ListFilter: LucideIcon;
  export const CirclePlay: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const Aperture: LucideIcon;
  export const Loader2: LucideIcon;
  export const X: LucideIcon;
  export const Check: LucideIcon;
}
