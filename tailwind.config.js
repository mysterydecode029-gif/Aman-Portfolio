/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        // Strictly monochrome scale using only black/white opacities
        mono: {
          50: 'rgba(255, 255, 255, 0.03)',
          100: 'rgba(255, 255, 255, 0.06)',
          200: 'rgba(255, 255, 255, 0.12)',
          300: 'rgba(255, 255, 255, 0.20)',
          400: 'rgba(255, 255, 255, 0.40)',
          500: 'rgba(255, 255, 255, 0.60)',
          600: 'rgba(255, 255, 255, 0.75)',
          700: 'rgba(255, 255, 255, 0.88)',
          800: 'rgba(255, 255, 255, 0.94)',
          900: '#ffffff',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        cursive: ['Caveat', 'cursive'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.35em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'sway': 'sway 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.04' },
          '50%': { opacity: '0.07' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
