const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        blue: colors.lightBlue,
        gray: colors.blueGray,
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['even', 'odd'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
}
