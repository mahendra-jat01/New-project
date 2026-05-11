/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['Sora', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        mandi: '#00B37E',
        sunrise: '#FF8A3D',
        beige: '#F7F1E7',
        pine: '#0F3F33',
        cream: '#FFFCF7'
      },
      boxShadow: {
        soft: '0 22px 64px rgba(10, 51, 40, 0.12)',
        glow: '0 24px 60px rgba(0, 179, 126, 0.25)'
      },
      animation: {
        'fade-in': 'fadeIn 0.45s ease-out',
        'slide-up': 'slideUp 0.55s ease-out',
        'lift-in': 'liftIn 0.7s ease-out both'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(18px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        liftIn: {
          '0%': { transform: 'translateY(26px) scale(0.98)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' }
        }
      }
    }
  },
  plugins: []
};
