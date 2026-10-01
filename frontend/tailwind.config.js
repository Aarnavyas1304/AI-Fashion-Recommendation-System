/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fashion: {
          black: '#111111',
          charcoal: '#1A1A1A',
          ivory: '#FAF8F5',
          lightBg: '#F5F0EB',
          cardBg: '#FFFFFF',
          champagne: '#C5A880',
          champagneHover: '#B89768',
          champagneLight: '#F7F3EE',
          gold: '#C5A880',
          goldLight: '#E8DFC5',
          goldAccent: '#D4AF37',
          darkGray: '#2A2A2A',
          muted: '#78746D',
          border: '#E5E0DA',
          subtleBeige: '#F5F0EB'
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif']
      },
      boxShadow: {
        'editorial': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
        'bronze-glow': '0 4px 20px rgba(150, 111, 51, 0.25)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
}
