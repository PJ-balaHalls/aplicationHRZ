"use client";

import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../button/button';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full font-sans">
        {label && (
          <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-2 block">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full appearance-none bg-transparent border border-[var(--color-border)]/40 rounded-xl px-4 py-3.5 text-[12px] font-medium text-[var(--color-text-primary)] hover:border-[var(--color-border)]/80 focus:bg-[var(--color-background)] focus:border-[var(--color-hrz-red)] focus:ring-1 focus:ring-[var(--color-hrz-red)]/20 outline-none transition-all cursor-pointer",
              error && "border-[var(--color-hrz-red)]/50 focus:border-[var(--color-hrz-red)] focus:ring-[var(--color-hrz-red)]/20",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-secondary)]/60">
            <ChevronDown size={14} strokeWidth={2} />
          </div>
        </div>
        {error && (
          <p className="text-[10px] text-[var(--color-hrz-red)] font-bold uppercase mt-1.5">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';