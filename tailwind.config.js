/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Playfair Display"', 'ui-sans-serif', 'system-ui'], // use as default font-sans
        playfair: ['"Playfair Display"', 'serif'], // optional custom name
      },
    },
  },
  plugins: [],
}
