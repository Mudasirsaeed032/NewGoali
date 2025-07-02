/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'title': ['Inter', 'system-ui', 'sans-serif'],
        'header': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'title': '900',
        'header': '700',
        'body': '400',
      },
    },
  },
  plugins: [],
};