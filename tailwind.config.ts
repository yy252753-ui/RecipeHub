import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0066ff",
          strong: "#005eeb",
          low: "#eaf2fe"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px"
      }
    }
  },
  plugins: []
};

export default config;
