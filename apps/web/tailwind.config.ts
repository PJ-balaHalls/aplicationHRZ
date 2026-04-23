import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        border: "var(--color-border)",
        brand: "var(--color-brand)",
        "hrz-red": "#B6192E",
        "hrz-purple": "#2A0039",
        "hrz-blue": "#0A2540",
        "hrz-grey": "#8C8C8C",
      },
      fontSize: {
        micro: "0.75rem",
        label: "0.875rem",
        base: "1rem",
        highlight: "1.125rem",
        sub: "1.25rem",
        title2: "1.5rem",
        title1: "2rem",
        page: "2.5rem",
        hero: "3.5rem",
      }
    },
  },
  plugins: [],
};

export default config;