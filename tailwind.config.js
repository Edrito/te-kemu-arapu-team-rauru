// NOTE: Update this to include the paths to all of your component files.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary_red: '#A01D1D',
        primary_yellow: '#FFD700',
        button_orange: '#C97D1A',
        button_pressed_orange: '#8C4F00'
        // Additional custom colors
      },
      fontFamily: {
        crayonara: ["Crayonara-Regular", "sans-serif"],
        notosans: ["NotoSans-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};

