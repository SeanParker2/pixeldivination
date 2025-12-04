import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-xs font-bold text-pixel-secondary uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-none border-2 border-pixel-border bg-pixel-dark px-3 py-2 text-sm text-white ring-offset-pixel-midnight file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/30 focus-visible:outline-none focus-visible:border-pixel-gold focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors font-pixel",
            error && "border-pixel-error focus-visible:border-pixel-error",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-pixel-error font-pixel mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
