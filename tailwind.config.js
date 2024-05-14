/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#6861ff",
        colorSecondaruy: "#FFFFFF",
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
    },
  },
  plugins: [],
};
