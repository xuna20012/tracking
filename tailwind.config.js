/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#254e9d',
          light: '#3a64b3',
          dark: '#1c3c7a',
        },
        secondary: {
          DEFAULT: '#fd7e14',
          light: '#fe9442',
          dark: '#e06a08',
        },
      },
    },
  },
  plugins: [],
}; 