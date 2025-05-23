/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        waveMove: 'waveMove 6s linear infinite',
      },
      keyframes: {
        waveMove: {
          '0%': { transform: 'translateX(-50px)' },
          '100%': { transform: 'translateX(50px)' },
        },
      },
    },
  },
  plugins: [],
};
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      backdropBlur: {
        sm: '4px',
        DEFAULT: '10px',
        lg: '20px',
      },
    },
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
}
