/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        transparent: "#ffffff00",

        //Premium theme  driven by CSS variables in index.css
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        "surface-raised": "var(--surface-raised)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",

        gold: {
          DEFAULT: "var(--gold)",
          soft: "var(--gold-soft)",
          dim: "var(--gold-dim)",
        },
        teal: {
          DEFAULT: "var(--teal)",
          soft: "var(--teal-soft)",
        },
        "accent-blue": {
          DEFAULT: "var(--blue-app)",
          soft: "var(--blue-app-soft)",
        },
        danger: {
          DEFAULT: "var(--red)",
          soft: "var(--red-soft)",
        },

        "text-1": "var(--text-1)",
        "text-2": "var(--text-2)",
        "text-3": "var(--text-3)",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "ui-sans-serif", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },

      borderRadius: {
        DEFAULT: "14px",
        sm: "8px",
      },

      boxShadow: {
        "gold-glow": "0 8px 22px -8px rgba(212, 165, 55, 0.55)",
        "focus-ring-gold": "0 0 0 3px rgba(212, 165, 55, 0.4)",
      },

      ringColor: {
        gold: "var(--gold)",
        teal: "var(--teal)",
      },
      ringWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
