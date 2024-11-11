/** @type {import('tailwindcss').Config} */

export default {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Include files in the 'pages' folder
    './layouts/**/*.{js,ts,jsx,tsx}', // Include files in the 'layouts' folder
    './app/**/*.{js,ts,jsx,tsx}', // Include files in the 'app' folder
    './components/**/*.{js,ts,jsx,tsx}', // Include files in the 'components' folder
    './src/**/*.{js,ts,jsx,tsx}', // Include files in the 'src' folder
  ],

  theme: {
    typography: require('./typography'), // If typography.js exports module, convert it to ES module too
    extend: {
      fontFamily: {
        domine: ['Domine', 'serif'], // Add the Domine font
        heebo: ['Heebo', 'sans-serif'], // Adding Heebo font
        sans: ['Arial', 'sans-serif'], // Use Arial as the default sans-serif font
      },
      colors: {
        customMint: '#6fffe6',
        customDarkBlue: '#003250',
        primaryColor: '#003250',
        secColor: '#6FFFE6',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          700: '#374151',
          800: '#1F2A37',
          900: '#111928',
        },
        primary: {
          50: '#EBF5FF',
          100: '#E1EFFE',
          200: '#C3DDFD',
          300: '#A4CAFE',
          600: '#1C64F2',
          700: '#1A56DB',
        },
        blue: {
          500: '#E1EFFE',
        },
        green: {
          50: '#F3FAF7',
          100: '#DEF7EC',
          800: '#03543F',
        },
        yellow: {
          100: '#FDF6B2',
          800: '#723B13',
        },
        purple: {
          50: '#F6F5FF',
        },
        indigo: {
          25: '#F5F8FF',
          100: '#E0EAFF',
          600: '#444CE7',
        },
      },
      screens: {
        mobile: '100px',
        tablet: '640px',
        pc: '769px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
