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
        // Blood Red + Gold luxury palette
        'blood-red': {
          DEFAULT: '#dc2626',
          50: '#fee2e2',
          100: '#fecaca',
          200: '#fca5a5',
          300: '#f87171',
          400: '#ef4444',
          500: '#dc2626',
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#450a0a',
        },
        'gold': {
          DEFAULT: '#eab308',
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        'luxury-dark': {
          DEFAULT: '#0a0000',
          900: '#0a0000',
          800: '#1a0000',
          700: '#2a0a0a',
          600: '#3a0a0a',
          500: '#4a1a1a',
        },
        'luxury-gray': {
          DEFAULT: '#d1d5db',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      borderRadius: {
        'none': '0',
        DEFAULT: '0',
      },
      borderWidth: {
        DEFAULT: '2px',
        '0': '0',
        '2': '2px',
        '4': '4px',
      },
      animation: {
        'red-glow': 'red-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gold-glow': 'gold-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'pulse-border': 'pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        'red-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.3), inset 0 0 20px rgba(220, 38, 38, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.5), inset 0 0 30px rgba(220, 38, 38, 0.2)',
          },
        },
        'gold-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(234, 179, 8, 0.5), 0 0 40px rgba(234, 179, 8, 0.3), inset 0 0 20px rgba(234, 179, 8, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(234, 179, 8, 0.8), 0 0 60px rgba(234, 179, 8, 0.5), inset 0 0 30px rgba(234, 179, 8, 0.2)',
          },
        },
        'pulse-border': {
          '0%, 100%': {
            borderColor: 'rgba(220, 38, 38, 0.5)',
          },
          '50%': {
            borderColor: 'rgba(220, 38, 38, 1)',
          },
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
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.3)',
        'red-glow-lg': '0 0 30px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.4)',
        'gold-glow': '0 0 20px rgba(234, 179, 8, 0.5), 0 0 40px rgba(234, 179, 8, 0.3)',
        'gold-glow-lg': '0 0 30px rgba(234, 179, 8, 0.6), 0 0 60px rgba(234, 179, 8, 0.4)',
        'red-inset': 'inset 0 0 20px rgba(220, 38, 38, 0.2)',
      },
      backgroundImage: {
        'red-grid': 'linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)',
        'luxury-gradient': 'linear-gradient(135deg, #dc2626 0%, #eab308 100%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;