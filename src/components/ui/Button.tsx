import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-pixel font-bold uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pixel-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:translate-y-[2px] active:shadow-none";
    
    const variants = {
      primary: "bg-pixel-gold text-pixel-black border-2 border-pixel-black shadow-pixel hover:bg-yellow-400",
      secondary: "bg-pixel-card text-white border-2 border-pixel-border shadow-pixel hover:bg-pixel-border",
      outline: "bg-transparent text-white border-2 border-pixel-secondary hover:bg-pixel-card",
      ghost: "bg-transparent text-pixel-secondary hover:text-white hover:bg-white/10 active:translate-y-0",
      danger: "bg-pixel-error text-white border-2 border-pixel-black shadow-pixel hover:bg-red-600",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
