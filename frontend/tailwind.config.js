/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Playfair Display"', 'ui-sans-serif', 'system-ui'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      animation: {
        fadeInUp: "fadeInUp 1s ease forwards",
        fadeIn: "fadeIn 0.5s ease-in", // Added alternative animation
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'), // Optional: if you use form styles
    require('@tailwindcss/typography'), // Optional: for prose content
  ],
};