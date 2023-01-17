/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8bacda",
        secondary: "#00fff7",
        blue: {
          100: "#0d192b",
          500: "#14253d",
          900: "#2f415b",
        },
      },
      lineHeight: {
        hero: "4.5rem",
      },
    },
    keyframes: {
      fadeOut: {
        "0%": { opacity: 0 },
        "50%": { opacity: 0.8 },
        "100%": { opacity: 0 },
      },
    },
    animation: {
      fadeOut: "fadeOut 2s infinite",
    },
  },
  plugins: [],
};
