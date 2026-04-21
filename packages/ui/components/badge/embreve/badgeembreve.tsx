"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lock, Sparkles, Clock, BellRing, X } from "lucide-react";
import { cn } from "../../button/button";

export function BadgeEmBreve({ featureName, description, expectedRelease }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) { if (popupRef.current && !popupRef.current.contains(e.target as Node)) setIsOpen(false); }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block font-sans" ref={popupRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={cn("flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight rounded border transition-all", isOpen ? "bg-[var(--color-text-primary)] text-[var(--color-background)]" : "bg-[var(--color-surface)] border-[var(--color-border)]")}>
        <Lock size={12} /> Em Breve
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[250] md:hidden backdrop-blur-sm" />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[300px] md:absolute md:top-full md:translate-y-0 md:mt-2 md:w-72 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-6 z-[300] animate-in zoom-in-95 shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[var(--color-hrz-red)]">
                <Sparkles size={18} />
                <h4 className="text-[14px] font-bold text-[var(--color-text-primary)]">Nova Camada</h4>
              </div>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">{description || "Em desenvolvimento."}</p>
              {expectedRelease && (
                <div className="flex items-center gap-2 p-2 bg-[var(--color-surface)] rounded-lg text-[12px] font-bold">
                  <Clock size={14} /> {expectedRelease}
                </div>
              )}
              <button className="w-full py-2 border border-[var(--color-border)] rounded-lg text-[12px] font-bold hover:bg-[var(--color-surface)]">Me avise</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}