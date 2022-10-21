/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        secondary: colors.gray,
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
}
