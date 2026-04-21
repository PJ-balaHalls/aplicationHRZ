"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../button/button';

export interface Option {
  value: string;
  label: string;
}

interface HorizonSelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  error?: string;
}

export function HorizonSelect({ label, options, value, onChange, placeholder = "Selecione...", error }: HorizonSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-2 block">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between bg-surface/30 border border-border/60 px-4 py-3.5 rounded-xl text-base font-medium text-left transition-all outline-none",
          isOpen ? "bg-background border-brand ring-1 ring-brand/20" : "hover:border-border/80",
          error && "border-danger/50 focus:border-danger focus:ring-danger/20",
          selectedOption ? "text-text-primary" : "text-text-secondary/40"
        )}
      >
        <span className="block truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={18} className={cn("text-text-secondary transition-transform duration-300", isOpen && "rotate-180 text-brand")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-background border border-border/60 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* O space-y-1 garante que as opções nunca fiquem esmagadas umas nas outras */}
          <ul className="max-h-60 overflow-y-auto no-scrollbar py-2 space-y-1">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-4 py-3 text-[14px] font-medium cursor-pointer transition-all mx-2 rounded-lg flex items-center",
                    isSelected 
                      ? "bg-brand/10 text-brand font-bold" 
                      : "text-text-secondary hover:bg-surface hover:text-text-primary"
                  )}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && (
        <p className="text-[10px] text-danger font-bold uppercase mt-1">{error}</p>
      )}
    </div>
  );
}