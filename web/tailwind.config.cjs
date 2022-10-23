/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require("@tailwindcss/forms")({
    strategy: 'class',
  })],
}
