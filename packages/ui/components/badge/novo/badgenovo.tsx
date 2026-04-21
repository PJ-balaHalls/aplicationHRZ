"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { cn } from "../../button/button";

export function BadgeNovo({ featureName, description }: { featureName: string; description: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) { 
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) setIsOpen(false); 
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block font-sans" ref={popupRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={cn(
          "flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight border transition-all",
          isOpen ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105" : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
        )}
      >
        <Sparkles size={12} />
        Novo
      </button>

      {isOpen && (
        <>
          {/* Overlay exclusivo para Mobile para forçar foco no centro */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-[250] md:hidden" />
          
          <div className={cn(
            "z-[300] animate-in fade-in zoom-in-95 duration-200 shadow-2xl border border-[var(--color-border)] bg-[var(--color-background)] rounded-2xl p-6",
            // Lógica Mobile: Centro da tela | Lógica Desktop: Abaixo do botão
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[320px]",
            "md:absolute md:top-full md:left-1/2 md:mt-2 md:translate-y-0 md:w-[280px]"
          )}>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Sparkles size={20} className="text-emerald-600" />
                </div>
                <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-[var(--color-text-secondary)]">
                  <X size={18} />
                </button>
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] tracking-tight">{featureName}</h4>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mt-1">{description}</p>
              </div>
              <button className="w-full mt-2 py-2 bg-[var(--color-text-primary)] text-[var(--color-background)] text-[12px] font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Experimentar Agora <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}