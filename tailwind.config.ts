import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#123F35",
          light: "#185346",
          dark: "#0B2720",
          foreground: "#F7F1E5",
        },
        secondary: {
          DEFAULT: "#1B5547",
          light: "#246F5D",
          dark: "#133C32",
          foreground: "#F7F1E5",
        },
        accent: {
          DEFAULT: "#D9BD7A",
          light: "#E4CF99",
          dark: "#BCA05A",
          subtle: "#F5ECD7",
          foreground: "#123F35",
        },
        background: {
          DEFAULT: "#F7F1E5",
          light: "#FDFBF7",
          dark: "#EAE0CC",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#EFE7D6",
          dark: "#182723",
        },
        text: {
          DEFAULT: "#26332F",
          muted: "#526660",
          light: "#829992",
        },
        border: "var(--border)",
      },
      fontFamily: {
        bengali: ["'Tiro Bangla'", "'Noto Sans Bengali'", "serif"],
        "bengali-heading": ["'Tiro Bangla'", "'Hind Siliguri'", "serif"],
        "bengali-body": ["'Tiro Bangla'", "'Noto Sans Bengali'", "serif"],
        arabic: ["Amiri", "serif"],
        english: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        md: "0.625rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(18, 63, 53, 0.04), 0 1px 2px -1px rgba(18, 63, 53, 0.04)",
        card: "0 4px 16px -2px rgba(18, 63, 53, 0.06), 0 2px 6px -1px rgba(18, 63, 53, 0.04)",
        "card-hover": "0 12px 28px -4px rgba(18, 63, 53, 0.12), 0 4px 12px -2px rgba(18, 63, 53, 0.06)",
        gold: "0 0 20px rgba(217, 189, 122, 0.35)",
        "gold-border": "inset 0 0 0 1px rgba(217, 189, 122, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
