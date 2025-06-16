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
        'background': 'hsl(220, 13%, 12%)',
        'surface': 'hsl(220, 13%, 18%)',
        'border': 'hsl(220, 13%, 25%)',
        'text-display': 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(0, 0%, 85%)',
        'text-secondary': 'hsl(0, 0%, 65%)',
        'accent-primary': 'hsl(220, 90%, 60%)',
        'accent-hover': 'hsl(220, 90%, 70%)',
        'accent-okc-blue': 'hsl(207, 88%, 53%)',
        'semantic-green': 'hsl(145, 63%, 49%)',
        'semantic-red': 'hsl(0, 84%, 60%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-poppins)'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'progress': 'progressBar 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config; 