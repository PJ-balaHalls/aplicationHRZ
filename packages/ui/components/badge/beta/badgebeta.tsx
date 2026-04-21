"use client";

import React, { useState, useEffect, useRef } from "react";
import { Beaker, AlertCircle, CheckCircle2 } from "lucide-react";
import { BetaBadgeProps } from "./type";
import { handleBetaInteraction, submitBetaFeedback } from "./action";
import { Button } from "../../button/button";

export function BadgeBeta({ featureName }: BetaBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) setIsOpen(false);
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) handleBetaInteraction(featureName);
  };

  return (
    <div className="relative inline-block font-sans" ref={popupRef}>
      <button
        onClick={handleOpen}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-semibold rounded-md border transition-all focus:outline-none
          ${isOpen ? 'bg-[var(--color-text-primary)] text-[var(--color-background)] border-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-text-secondary)]'}`}
      >
        <Beaker size={14} className={isOpen ? "text-[var(--color-background)]" : "text-[var(--color-hrz-purple)]"} />
        <span>Beta</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-[calc(100vw-2rem)] max-w-[320px] bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-[var(--color-hrz-purple)] shrink-0 mt-0.5" size={20} />
            <div className="flex-1 min-w-0">
              <h4 className="text-[14px] font-bold text-[var(--color-text-primary)] mb-1">Fase de Maturação</h4>
              <p className="text-[12px] text-[var(--color-text-secondary)] mb-4">
                A estrutura <strong>{featureName}</strong> está em validação.
              </p>
              {!submitted ? (
                <div className="flex flex-col gap-3">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Diagnóstico de falha..."
                    className="w-full text-[13px] p-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] resize-none focus:outline-none focus:border-[var(--color-text-primary)] text-[var(--color-text-primary)]"
                    rows={2}
                  />
                  <Button size="sm" onClick={() => { submitBetaFeedback(featureName, feedback, false); setSubmitted(true); }} className="w-full bg-[var(--color-hrz-purple)] hover:bg-[var(--color-hrz-purple)]/90">
                    Registrar Feedback
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-primary)] font-medium bg-[var(--color-surface)] p-3 rounded-md border border-[var(--color-border)]">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>Auditoria registada.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}