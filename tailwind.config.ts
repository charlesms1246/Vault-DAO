import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk color palette
        'cyber-dark': {
          DEFAULT: '#0a0a0f',
          800: '#111118',
          700: '#1a1a24',
          600: '#242433',
        },
        'cyber-cyan': {
          DEFAULT: '#00d4ff',
          50: '#e6f9ff',
          100: '#ccf3ff',
          500: '#00d4ff',
          600: '#00b8e6',
          700: '#0096c7',
        },
        'cyber-purple': {
          DEFAULT: '#a855f7',
          50: '#f5e6ff',
          100: '#e6ccff',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
        },
        'cyber-pink': {
          DEFAULT: '#ec4899',
          50: '#fce7f3',
          100: '#fbcfe8',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 20px currentColor)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'drop-shadow(0 0 30px currentColor)',
          },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;