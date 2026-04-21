"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "black" | "gray" | "autism";
type TextSize = "normal" | "small" | "large";

interface HorizonContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  dyslexiaMode: boolean;
  setDyslexiaMode: (active: boolean) => void;
  daltonismMode: boolean;
  setDaltonismMode: (active: boolean) => void;
}

const HorizonContext = createContext<HorizonContextProps | undefined>(undefined);

export function HorizonProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [textSize, setTextSize] = useState<TextSize>("normal");
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [daltonismMode, setDaltonismMode] = useState(false);

  // Sincronização com a DOM (Data Attributes)
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-text-size", textSize);
    root.setAttribute("data-dyslexia", String(dyslexiaMode));
    root.setAttribute("data-daltonism", String(daltonismMode));
    
    // WIP: Sincronizar com Horazion Account (Supabase) via API futuramente.
  }, [theme, textSize, dyslexiaMode, daltonismMode]);

  return (
    <HorizonContext.Provider
      value={{
        theme,
        setTheme,
        textSize,
        setTextSize,
        dyslexiaMode,
        setDyslexiaMode,
        daltonismMode,
        setDaltonismMode,
      }}
    >
      {children}
    </HorizonContext.Provider>
  );
}

export function useHorizonClarity() {
  const context = useContext(HorizonContext);
  if (!context) {
    throw new Error("useHorizonClarity deve ser usado dentro de um HorizonProvider");
  }
  return context;
}