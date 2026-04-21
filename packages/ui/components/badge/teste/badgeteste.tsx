"use client";

import React, { useState, useEffect, useRef } from "react";
import { FlaskConical } from "lucide-react";
import { TesteBadgeProps } from "./type";
import { handleTest } from "./action";

export function BadgeTeste({ featureName, testGroup }: TesteBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) { if (popupRef.current && !popupRef.current.contains(e.target as Node)) setIsOpen(false); }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const onInteract = () => { setIsOpen(!isOpen); if (!isOpen) handleTest(featureName, testGroup); };

  return (
    <div className="relative inline-block font-sans" ref={popupRef}>
      <button onClick={onInteract} className={`flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-semibold rounded-md border transition-all ${isOpen ? 'bg-[var(--color-text-primary)] text-[var(--color-background)] border-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-text-secondary)]'}`}>
        <FlaskConical size={14} className={isOpen ? "text-[var(--color-background)]" : "text-cyan-600"} />
        <span>Teste {testGroup}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-[calc(100vw-2rem)] max-w-[260px] bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
          <h4 className="text-[13px] font-bold text-[var(--color-text-primary)] mb-1">Ambiente de Laboratório</h4>
          <p className="text-[12px] text-[var(--color-text-secondary)]">Você faz parte do grupo de teste ({testGroup}) para a feature <strong>{featureName}</strong>.</p>
        </div>
      )}
    </div>
  );
}