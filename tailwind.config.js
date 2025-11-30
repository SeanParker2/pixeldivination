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
      },
      colors: {
        pixel: {
          green: '#577348',
          brown: '#8B4513',
          gold: '#FFD700',
          black: '#1A1A1A',
          beige: '#F5F5DC',
          dark: '#2C2C2C',
          light: '#E6E6E6',
          midnight: '#161622',
          card: '#1E1E2E',
          border: '#2D2D3A',
          secondary: '#A1A1AA',
        }
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px #000000',
        'pixel-sm': '2px 2px 0px 0px #000000',
        'pixel-lg': '6px 6px 0px 0px #000000',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
