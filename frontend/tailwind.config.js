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
        // Added Plus Jakarta Sans as the main modern font, keeping Inter as a safe fallback
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'ui-sans-serif', 'system-ui'],
        // Added the new premium serif font for your headings
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        /* --- NEW ROYAL PASTEL THEME COLORS --- */
        royal: {
          50: '#FCF6F5',
          100: '#F7EBE8',
          200: '#E8C5BE', // Soft Clay (Badges & Accents)
          300: '#D69E92',
          400: '#C27869',
          500: '#AD5442',
          600: '#914636',
          700: '#7A3E31', // Rich Terracotta (Main Buttons)
          800: '#a24b38', // Darker Terracotta (Hover states & Headings)
          900: '#731b04', // Very Dark Terracotta (Main Body Text)
          950: '#670505',
        },
        gold: {
          100: '#F5EDD6',
          200: '#E8D4A2',
          400: '#D8B76A', // Rich muted gold
        },
        champagne: {
          50: '#FCFAF8', // Your new warm global background
          100: '#F5EFE6',
        },
        blush: {
          50: '#FDF7F9',
          900: '#6B3148',
        },
        lilac: {
          50: '#FDF5F7', // A true pastel light background
          900: '#63003d' // Your dark burgundy
        },
        mint: {
          50: '#F0FAF5',
        },
        
        /* --- YOUR EXISTING COLORS (KEPT SAFE) --- */
        primary: {
          50: '#FCF6F5',
          100: '#F7EBE8',
          200: '#E8C5BE', // Soft Clay (Badges & Accents)
          300: '#D69E92',
          400: '#C27869',
          500: '#AD5442',
          600: '#914636',
          700: '#7A3E31', // Rich Terracotta (Main Buttons)
          800: '#a24b38', // Darker Terracotta (Hover states & Headings)
          900: '#731b04', // Very Dark Terracotta (Main Body Text)
          950: '#670505',
        },
        neutral: {
          50: "#fcf8f8",
          100: "#f9f1f1",
          200: "#f0e2e2",
          300: "#e1c4c4",
          400: "#b89494",
          500: "#a46e6e",
          600: "#694747",
          700: "#553333",
          800: "#3b1e1e",
          900: "#2a0f0f",
        },
        success: {
          50: "#F4F7F4",  // Very soft sage background (perfect for pill badges)
          100: "#E6EFE8", // Slightly darker sage background
          200: "#CADDCE",
          300: "#A9C4B0",
          400: "#87A991",
          500: "#658E72", // Main aesthetic muted green
          600: "#4F735B",
          700: "#3D5A46", // Deep olive (perfect for readable text on a 50/100 background)
          800: "#324939",
          900: "#2A3D30",
        },
        danger: {
       50: "#FEF5F5",  // Soft blush background (perfect for "Rx Required" pills)
          100: "#FCE8E8", // Muted rose background
          200: "#F5CACA",
          300: "#EAA5A5",
          400: "#DA7A7A",
          500: "#C55353", // Main aesthetic muted brick red
          600: "#A63F3F",
          700: "#883333", 
          800: "#6B2A2A", // Deep maroon (perfect for readable warning text)
          900: "#542323",
        },
      },
      boxShadow: {
        // Added the soft, premium shadow Codex recommended
        'regal': '0 10px 40px -10px rgba(115, 27, 4, 0.08)',
      },
      animation: {
        fadeInUp: "fadeInUp 1s ease forwards",
        fadeIn: "fadeIn 0.5s ease-in",
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
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};