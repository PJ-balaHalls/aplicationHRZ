"use client";
import { useHorizonClarity } from "../../../providers/horizon-provider";
import { Button } from "../../button/button"; // <-- CORRIGIDO: Dois níveis para cima

export function TypographySettings() {
  const { textSize, setTextSize, dyslexiaMode, setDyslexiaMode } = useHorizonClarity();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between p-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md">
        <span className="text-[12px] font-medium text-[var(--color-text-primary)]">Tamanho da Fonte</span>
        <div className="flex gap-1">
          {["small", "normal", "large"].map((s) => (
            <Button
              key={s}
              variant={textSize === s ? "secondary" : "ghost"}
              onClick={() => setTextSize(s as any)}
              className="h-7 w-7 p-0 text-[12px] capitalize"
            >
              {s === "normal" ? "A" : s === "small" ? "a" : "A+"}
            </Button>
          ))}
        </div>
      </div>

      <Button
        variant={dyslexiaMode ? "secondary" : "outline"}
        onClick={() => setDyslexiaMode(!dyslexiaMode)}
        className="w-full justify-between h-9 px-3 text-[12px]"
      >
        Modo Dislexia (Espaçamento)
        <span className="text-[9px] uppercase tracking-wider opacity-60">
          {dyslexiaMode ? "ATIVO" : "INATIVO"}
        </span>
      </Button>
    </div>
  );
}