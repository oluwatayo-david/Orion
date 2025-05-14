/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {


    extend: {
      colors: {

        background: '#FBFBFB',
        primary: '#008080',
        NavyBlue: '#002366',
        textDarkGrey: '#848484',
        blackSecondary: '#100F0F',
        blackTertiary: '#272727',
        darkOrange: '#DE7C5A',
        harsh: "#AFAFAF4D",
        lightGreen: "#1E9C24",
        darkRed: "#CE1D1DCC"

      },

      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #008080, #002366)',
      },
    },
  },
  plugins: [],
};
