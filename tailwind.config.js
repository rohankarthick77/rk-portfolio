/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#050507',
          deep: '#020204',
          subtle: '#09090e',
        },
        surface: {
          DEFAULT: '#0c0c12',
          elevated: '#12121c',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-highlight': 'rgba(255, 30, 66, 0.3)',
        },
        crimson: {
          DEFAULT: '#ff1e42',
          glow: '#ff2d55',
          deep: '#99001a',
          dark: '#40000a',
          muted: 'rgba(255, 30, 66, 0.15)',
        },
        accent: {
          cyan: '#00f0ff',
          magenta: '#ff007f',
          gold: '#ffb703',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"Syne"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
