const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        xl: '1200px',
        '2xl': '1200px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'Sarabun', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

