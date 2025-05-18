const {heroui} = require("@heroui/react");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#1c1b1b',
        'dark-light': '#f1f1f1',
      },
      fontFamily: {
        'title': ['volkhov', 'sans-serif'],
      },
    },
  },
  plugins: [heroui(), require('tailwind-scrollbar'),],
}

