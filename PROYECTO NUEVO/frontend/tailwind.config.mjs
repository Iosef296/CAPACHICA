/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        night: {
          700: "#1e2a3a",
          800: "#172033",
          900: "#0f1829",
          950: "#0a1020",
        },
        gold: {
          400: "#f0c96a",
          500: "#d4a843",
          600: "#b8892e",
        },
        lake: {
          400: "#5bc8d4",
          500: "#2dd4bf",
          600: "#0f9488",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
