/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"VT323"', 'monospace'],
        display: ['"Press Start 2P"', 'cursive'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        pixel: {
          // Brand Identity
          gold: '#FFD700',
          goldDim: '#D4AF37',
          
          // Backgrounds
          midnight: '#161622', // Main app background
          card: '#1E1E2E',     // Card / Component background
          overlay: 'rgba(22, 22, 34, 0.8)',
          
          // Neutrals
          black: '#1A1A1A',
          dark: '#2C2C2C',
          gray: '#71717A',     // Zinc-500
          light: '#E6E6E6',
          white: '#FFFFFF',
          
          // Accents
          green: '#577348',
          brown: '#8B4513',
          beige: '#F5F5DC',
          
          // UI Elements
          border: '#2D2D3A',
          secondary: '#A1A1AA',
          
          // Semantic Colors
          success: '#4ADE80',
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
        }
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px #000000',
        'pixel-sm': '2px 2px 0px 0px #000000',
        'pixel-lg': '6px 6px 0px 0px #000000',
        'pixel-glow': '0 0 10px rgba(255, 215, 0, 0.5)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
