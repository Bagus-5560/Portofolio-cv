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
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
        },
        'grid-shimmer': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        meteor: {
          '0%': {
            transform: 'translateX(0) translateY(0) rotate(45deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(-200px) translateY(200px) rotate(45deg)',
            opacity: '0',
          },
        },
        'galaxy-shift': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        colors: {
          'dark-glass-bg': 'rgba(22, 27, 34, 0.4)',
        },
        'fall-snow': {
          '0%': { transform: 'translateY(0)', opacity: '0.8' },
          '100%': { transform: 'translateY(100vh)', opacity: '0.2' },
        },

      },
      animation: {
        'spinning-gradient': 'spinning-gradient 3s linear infinite',
        aurora: 'aurora 12s ease-in-out infinite',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        orbit: 'orbit 10s linear infinite',
        'pulse-scale': 'pulse-scale 4s ease-in-out infinite',
        'grid-shimmer': 'grid-shimmer 15s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
        meteor: 'meteor 1.5s linear infinite',
        'galaxy-shift': 'galaxy-shift 10s linear infinite',
        'fall-snow': 'fall-snow linear infinite',
      },
    },
  },
  plugins: [],
}
