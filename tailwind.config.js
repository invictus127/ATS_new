/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          base: '#0B0F19',
          card: 'rgba(17, 24, 39, 0.7)',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.03)',
        },
        neon: {
          cyan: '#00F2FE',
          blue: '#4FACFE',
          purple: '#7F00FF',
          green: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E'
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-cyan': '0 0 20px rgba(0, 242, 254, 0.35)',
        'glow-blue': '0 0 20px rgba(79, 172, 254, 0.35)',
        'glow-purple': '0 0 20px rgba(127, 0, 255, 0.35)',
      }
    },
  },
  plugins: [],
}
