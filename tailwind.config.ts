import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand": {
          green: "#1DB954",
          red: "#E53E3E",
          blue: "#4A90E2",
        },
        "base": {
          background: "#0D0D0D",
        },
        "surface": {
          background: "#1A1A1A",
        },
        foreground: "#F2F2F2",
        'brand-green': '#00FF00',
        'brand-red': '#FF0000',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        poppins: ['var(--font-poppins)'],
        jakarta: ['var(--font-jakarta)'],
      },
      gridTemplateRows: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      animation: {
        'scroll-stream': 'scroll-stream 30s linear infinite',
      },
      keyframes: {
        'scroll-stream': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config; 