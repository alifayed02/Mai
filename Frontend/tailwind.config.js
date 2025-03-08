/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sf: ["Helvetica Neue", "Helvetica", "Arial"]
      },
      colors: {
        'custom-start': '#2A2B47',
        'custom-end': '#404277',
        'custom-bg': '#1F2125'
      }
    },
  },
  plugins: [],
}

