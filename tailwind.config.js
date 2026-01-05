/** @type {import('tailwindcss').Config} */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        transparent: "#ffffff00",

        // Primary & Secondary Text Colors
        "primary-text": "#60a5fa",
        "secondary-text": "#64748b",

        // Button Colors

        "btn-primary": "#1D4ED8", // Primary button background
        "btn-primary-hover": "#2563EB", // Primary button hover state

        "btn-secondary-bg": "#64748b", // Secondary button bg
        "btn-secondary-hover": "rgba(59, 130, 246, 0.1)", // hover shade for secondary

        // Border colors
        "border-glass": "rgba(255,255,255,0.1)",
        "border-subtle": "rgba(255, 255, 255, 0.04)",
        // Extended Brand Colors
        cyan: {
          100: "#0052CC",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        teal: {
          300: "#81e6d9",
          400: "#4fd1c5",
          500: "#38b2ac",
          600: "#319795",
        },
        blue: {
          900: "#0f172a",
          950: "#020617",
        },
        slate: {
          300: "#94a3b8",
          400: "#64748b",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        emerald: {
          500: "#10b981",
          600: "#059669",
        },
        surface: {
          glass: "rgba(15, 18, 25, 0.85)",
          bg: "#020617",
          card: "#111318",
          elevated: "#1a1d23",
        },

        // Extended Colors

        "pure-greys": {
          5: "#F9F9F9",
          25: "#E2E2E2",
          50: "#CCCCCC",
          100: "#B5B5B5",
          200: "#9E9E9E",
          300: "#888888",
          400: "#717171",
          500: "#5B5B5B",
          600: "#444444",
          700: "#2D2D2D",
          800: "#171717",
          900: "#141414",
        },
      },
      boxShadow: {
        "cyan-glow": "0 4px 15px rgba(6, 182, 212, 0.4)",
        "teal-glow": "0 4px 15px rgba(56, 178, 172, 0.4)",
        "focus-ring-cyan": "0 0 0 3px rgba(34, 211, 238, 0.5)",
      },
      outline: {
        cyan: ["2px solid rgba(34, 211, 238, 0.75)", "3px"],
      },
      ringColor: {
        cyan: "#22d3ee",
        teal: "#4fd1c5",
      },
      ringWidth: {
        3: "3px",
      },
      borderColor: (theme) => ({
        ...theme("colors"),
        cyan: "#22d3ee",
        teal: "#4fd1c5",
      }),
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   darkMode: "class",
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ["Inter", "system-ui", "sans-serif"],
//       },
//       colors: {
//         // Custom surface colors
//         "surface-glass": "rgba(15, 18, 25, 0.85)",
//         "surface-bg": "#020617",
//         "surface-card": "#111318",
//         "surface-elevated": "#1a1d23",

// // Border colors
// "border-glass": "rgba(255, 255, 255, 0.06)",
// "border-subtle": "rgba(255, 255, 255, 0.04)",

//         // Brand colors
//         "brand-primary": "#6b30e3",
//         "brand-secondary": "#8b5cf6",
//         "brand-tertiary": "#06b6d4",

//         // Accent colors
//         "accent-orange": "#ff7b00",
//         // Text Colors
//         "text-primary": "#22d3ee", // Cyan-400 shade - main readable text color for headings, important text
//         "text-secondary": "#64748b", // Slate-400 shade - for secondary text, muted descriptions, labels

//         // Button Colors
//         "btn-primary-bg": "#06b6d4", // Cyan-500 shade - Primary button background
//         "btn-primary-bg-hover": "#0891b2", // Cyan-600 shade - Primary button hover state
//         "btn-primary-text": "#ffffff", // Button text white for primary button

//         "btn-secondary-bg": "#64748b", // Slate-400 shade - Secondary button bg
//         "btn-secondary-bg-hover": "#4b5563", // Slate-600 hover shade for secondary button
//         "btn-secondary-text": "#ffffff", // Button text white for secondary button

//         // Status colors
//         success: "#34d399",
//         warning: "#fbbf24",
//         error: "#f87171",
//         info: "#60a5fa",

//         // Interactive states
//         "hover-overlay": "rgba(124, 58, 237, 0.08)",
//         "focus-ring": "rgba(79, 70, 229, 0.3)",
//         "selection-bg": "rgba(79, 70, 229, 0.1)",
//       },

//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "accent-gradient":
//           "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #0ea5e9 100%)",
//         "orange-gradient": "linear-gradient(135deg, #ff7b00 0%, #f97316 100%)",
//         "blue-cyan-gradient": "linear-gradient(to right, #2563eb, #06b6d4)", // from-blue-600 to-cyan-600
//         "branding-text": "linear-gradient(to right, #60a5fa, #22d3ee, #a78bfa)",
//       },
//     },
//   },
//   plugins: [],
// };
