/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using a class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // If using App Router
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: {
          DEFAULT: '#6366f1',
          '50': '#eef2ff',
          '100': '#e0e7ff',
          '200': '#c7d2fe',
          '300': '#a5b4fc',
          '400': '#818cf8',
          '500': '#6366f1',
          '600': '#4f46e5',
          '700': '#4338ca',
          '800': '#3730a3',
          '900': '#312e81',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
        },
        light: '#f8fafc',
        dark: '#1e293b',
        // Dark theme colors inspired by GitHub
        'dark-main-bg': '#0d1117',
        'dark-card-bg': '#161b22',
        'dark-text-main': '#c9d1d9',
        'dark-text-secondary': '#8b949e',
        'dark-link': '#58a6ff',
        'dark-border': '#30363d',
        'dark-btn-primary': '#238636',
        'dark-btn-secondary': '#21262d',
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
