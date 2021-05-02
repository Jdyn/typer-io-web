const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      accent: '#4e6edd',
      accentBorder: '#4865cd',
      'primary-dark': '#2c2c2c',
      'primary-light': '#fff',
      black: colors.black,
      blue: colors.blue,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
