"use client";
import { useHorizonClarity } from "../../../providers/horizon-provider";
import { Button } from "../../button/button"; // <-- CORRIGIDO: Dois níveis para cima

export function ThemeSettings() {
  const { theme, setTheme } = useHorizonClarity();
  const themes = [
    { id: "light", label: "Claro", color: "#FFFFFF" },
    { id: "black", label: "Black", color: "#121212" },
    { id: "gray", label: "Cinza", color: "#F5F5F5" },
    { id: "autism", label: "Autismo", color: "#FDFDFD" },
  ];

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {themes.map((t) => (
        <Button
          key={t.id}
          variant={theme === t.id ? "secondary" : "outline"}
          onClick={() => setTheme(t.id as any)}
          className="justify-start gap-2 h-8 px-2.5 text-[11px]"
        >
          <span className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0" style={{ backgroundColor: t.color }} />
          {t.label}
        </Button>
      ))}
    </div>
  );
}