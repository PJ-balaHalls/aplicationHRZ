/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        brand: "var(--brand-horazion)",
        border: "var(--border)",
        error: "var(--error)",
        success: "var(--success)"
      },
      fontFamily: {
        sans: ['Inter-Regular', 'sans-serif'],
        medium: ['Inter-Medium', 'sans-serif'],
        bold: ['Inter-Bold', 'sans-serif'],
        mono: ['SpaceMono-Regular', 'monospace'],
      }
    },
  },
  plugins: [],
}