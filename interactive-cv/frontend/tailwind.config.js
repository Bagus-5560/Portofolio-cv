// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#0D1117',
          'background-light': '#161B22',
          'glass-bg': 'rgba(22, 27, 34, 0.6)',
          text: '#e0e0e0',
          'text-secondary': '#8B949E',
          primary: '#58A6FF',
          'primary-hover': '#388BFD',
          'glow-start': 'rgba(88, 166, 255, 0.5)',
          'glow-end': 'rgba(139, 92, 246, 0.5)',
        },
      },
      keyframes: {
        // Keyframe untuk bingkai gradien yang berputar
        'spinning-gradient': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%, 50% 100%, 100% 50%' },
          '25%': { backgroundPosition: '25% 0%, 75% 50%, 125% 0%' },
          '50%': { backgroundPosition: '50% 100%, 100% 0%, 50% 100%' },
          '75%': { backgroundPosition: '75% 50%, 125% 100%, 25% 50%' },
          '100%': { backgroundPosition: '0% 50%, 50% 100%, 100% 50%' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      animation: {
        // Menambahkan animasi spinning-gradient
        'spinning-gradient': 'spinning-gradient 3s linear infinite',
        aurora: 'aurora 12s ease-in-out infinite',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
