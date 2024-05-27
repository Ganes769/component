import { Scale } from "lucide-react";
import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scaleIn: {
          "0%": { transform: "scale(0.45)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        blur: {
          "0%": { opacity: "0" },
          "40%": { opacity: "0.5" },

          "100%": { opacity: "1" },
        },
      },
      colors: {
        primaryColor: "#6861ff",
        secondaryColor: "#FFFFFF",
        customPurple: "6861ff#",
        customGray: "#b3bbc8",
        customWhite: "#ffffff",
        customRed: "#A72333",
        customShadow: "rgba(232, 217, 231, 1)",
      },
      spacing: {
        md: "8px",
        sm: "4px",
      },
      animation: {
        scaleIn: "scaleIn 0.4s ease-in-out forwards",
        blur: "blur 0.4s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
