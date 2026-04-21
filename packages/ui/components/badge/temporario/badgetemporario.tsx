"use client";

import React, { useState, useEffect, useRef } from "react";
import { Timer, Hourglass } from "lucide-react";
import { TemporarioBadgeProps } from "./type";
import { handleTemporarioInteraction } from "./action";

// [FE-HZ] Interface - Temporário
export function BadgeTemporario({ featureName, expiryDate, description }: TemporarioBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) { if (popupRef.current && !popupRef.current.contains(e.target as Node)) setIsOpen(false); }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const onInteract = () => { setIsOpen(!isOpen); if (!isOpen) handleTemporarioInteraction(featureName); };

  return (
    <div className="relative inline-block font-sans" ref={popupRef}>
      <button onClick={onInteract} className={`flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-semibold rounded-md border transition-all focus:outline-none ${isOpen ? 'bg-[var(--color-text-primary)] text-[var(--color-background)] border-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-text-secondary)]'}`}>
        <Timer size={14} className={isOpen ? "text-[var(--color-background)]" : "text-amber-500"} />
        <span>Sazonal</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-[calc(100vw-2rem)] max-w-[280px] bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Hourglass size={18} className="text-amber-500" />
              <h4 className="text-[14px] font-bold text-[var(--color-text-primary)]">Acesso Limitado</h4>
            </div>
            <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
              <strong>{featureName}:</strong> {description || "Esta função coleta dados preliminares e será removida em breve."}
            </p>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-2.5 text-center mt-1">
              <span className="block text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-0.5">Expira a</span>
              <span className="block text-[14px] font-bold text-[var(--color-text-primary)]">{expiryDate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}