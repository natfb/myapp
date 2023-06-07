/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'ceu': "url('/public/texture/ceu.png')",
        'grama': "url('/public/texture/grama.png')",
        'menino': "url('/public/texture/menino.png')",
        'moca': "url('/public/texture/moca.png')",
        'nuvem': "url('/public/texture/nuvem.png')",
      }
    },
  },
  plugins: [],
}
