"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

// Utilitário interno para mesclar classes Tailwind sem conflitos (Obrigatório no UI)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

// [FE-HZ] Botão Primitivo Horizon Clarity
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-lg";
    
    const variants = {
      primary: "bg-[var(--color-hrz-red)] text-white hover:opacity-90",
      secondary: "bg-[var(--color-text-primary)] text-[var(--color-background)] hover:opacity-90",
      outline: "border border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]",
      ghost: "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]",
    };

    const sizes = {
      sm: "h-8 px-3 text-[12px]",
      md: "h-10 px-4 py-2 text-[14px]",
      lg: "h-12 px-6 py-3 text-[16px]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";