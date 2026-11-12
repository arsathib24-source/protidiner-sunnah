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
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        islamic: {
          forest: {
            DEFAULT: "#123F35",
            light: "#184E42",
            dark: "#0C2922",
          },
          deep: {
            DEFAULT: "#1B5547",
            light: "#236B59",
            dark: "#144035",
          },
          gold: {
            DEFAULT: "#D9BD7A",
            light: "#E5CF98",
            dark: "#B89B55",
            subtle: "#F5ECD7",
          },
          ivory: {
            DEFAULT: "#F7F1E5",
            light: "#FCFAF6",
            dark: "#EAE0CC",
          },
          charcoal: {
            DEFAULT: "#26332F",
            light: "#344540",
            dark: "#18211E",
          },
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
      },
      fontFamily: {
        bengali: ["Hind Siliguri", "Noto Serif Bengali", "sans-serif"],
        arabic: ["Amiri", "Noto Naskh Arabic", "serif"],
        english: ["Inter", "Cinzel", "sans-serif"],
      },
      boxShadow: {
        islamic: "0 4px 20px -2px rgba(18, 63, 53, 0.08)",
        "islamic-lg": "0 10px 30px -5px rgba(18, 63, 53, 0.15)",
        "gold-glow": "0 0 15px rgba(217, 189, 122, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
