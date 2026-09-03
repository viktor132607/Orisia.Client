/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        orisia: {
          ink: "#1B191A",
          cream: "#efe3d1",
          paper: "#fffaf2",
          brown: "#4b2e1b",
          gold: "#c5894d",
          goldDark: "#8e5b32",
          line: "#c9a578",
          dark: "#140c08",
          panel: "#1d110b",
          muted: "#a98c69",
          light: "#f3e9df",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"],
        condensed: ["Roboto Condensed", "Arial Narrow", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 28px rgba(0,0,0,.16)",
      },
    },
  },
  plugins: [],
};
