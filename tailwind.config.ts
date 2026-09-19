import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ECF7F4", 100: "#D6EEE8", 200: "#A9DCD2", 300: "#78C6B8",
          400: "#43A897", 500: "#1E8C79", 600: "#0F7264", 700: "#0B5B50",
          800: "#09473F", 900: "#06332E",
        },
        ink: { 900: "#14201D", 700: "#3A4B47", 500: "#6B7B75", 300: "#A8B4AF" },
        cream: { DEFAULT: "#FAF8F3", 200: "#F3EFE6" },
        income: { DEFAULT: "#1F8A4C", soft: "#E7F5EC" },
        expense: { DEFAULT: "#C6462E", soft: "#FCEDE9" },
        gold: { DEFAULT: "#C98A1E", soft: "#FBF1DC" },
      },
      fontFamily: {
        sans: ["'Noto Sans'", "'Noto Sans Telugu'", "'Noto Sans Devanagari'", "system-ui", "sans-serif"],
        display: ["'Baloo 2'", "'Noto Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: { xl: "14px", "2xl": "20px", "3xl": "26px" },
      boxShadow: {
        card: "0 1px 2px rgba(20,32,29,.04), 0 8px 24px -12px rgba(20,32,29,.18)",
        lift: "0 10px 30px -12px rgba(11,91,80,.35)",
      },
      maxWidth: { readable: "68ch" },
    },
  },
  plugins: [],
};
export default config;
