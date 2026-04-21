import React, { createContext, useContext, useState, ReactNode } from 'react';
import { tokens } from '../theme/tokens';

type ThemeType = 'light' | 'dark' | 'horazion';

interface AccessibilityContextData {
  theme: typeof tokens.light;
  themeName: ThemeType;
  fontSizeScale: number; // 1.0, 1.1, 1.2 (Espelhando TypographySettings)
  setTheme: (t: ThemeType) => void;
  setFontScale: (s: number) => void;
}

const AccessibilityContext = createContext<AccessibilityContextData>({} as AccessibilityContextData);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeType>('light');
  const [fontSizeScale, setFontSizeScale] = useState(1);

  const value = {
    theme: tokens[themeName],
    themeName,
    fontSizeScale,
    setTheme: setThemeName,
    setFontScale: setFontSizeScale,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);