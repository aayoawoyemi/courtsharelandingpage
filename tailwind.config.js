/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: 'var(--font-inter)',
        syne: 'var(--font-syne)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'background': '#000000',
        'surface': '#121212',
        'accent-primary': '#00b3b0',
        'text-display': '#ffffff',
        'text-primary': '#f5f5f5',
        'text-secondary': '#a0a0a0',
      },
    },
  },
  plugins: [],
} 