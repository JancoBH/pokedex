/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'darken': '#23262F',
        'dark-theme': '#121212',
        'primary': {
          light: 'rgb(var(--color-primary-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-darker) / <alpha-value>)',
        },
        'secondary': {
          light: 'rgb(var(--color-secondary-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          dark: 'rgb(var(--color-secondary-darker) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
};
