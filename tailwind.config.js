/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape and small tablets
      'md': '768px',   // Tablets and small laptops
      'lg': '1024px',  // Desktop and larger screens
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large screens
    },
    extend: {
      colors: {

        blue: '#007AFF',

        backgroundBlue:  '#041121',
        backgroundGreen: '#071D1D',

        backgroundBeige: '#FEEFD8',
        backgroundBeigeDark: '#D4C0A1',
        backgroundBrown: '#DEBB9D',
        backgroundDust: '#5F4D41',

        fontBeige: '#EFCEA4',
        fontBrown: '#5A2800',
      },
      fontFamily: {
        'martel': ['Martel', 'serif'],
        'bart': ['Bart Bold', 'sans-serif'],
        'belwe': ['Belwe Bold', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        bold: '700',
      },
    },
  },
  plugins: [],
}
