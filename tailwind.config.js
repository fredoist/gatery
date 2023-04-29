const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Mono"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}
