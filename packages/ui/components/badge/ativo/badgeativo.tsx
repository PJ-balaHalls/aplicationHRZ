"use client";

import React from "react";
import { Check } from "lucide-react";
import { AtivoBadgeProps } from "./type";

// [FE-HZ] Interface - Ativo (Silencioso por padrão)
export function BadgeAtivo({ featureName, forceVisible = false }: AtivoBadgeProps) {
  // O Minimalismo Funcional exige redução de ruído. Recursos operacionais não precisam gritar que estão funcionando.
  if (!forceVisible) return null;

  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium text-[var(--color-text-secondary)] bg-transparent border border-[var(--color-border)] rounded-md select-none opacity-50">
      <Check size={12} className="text-green-600" />
      <span>{featureName} (Ativo)</span>
    </div>
  );
}