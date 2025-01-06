/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
  theme: {
    extend: {
      colors: {
        // TODO: Etablir la couleur "base" pour le background
        blueText: '#042698', // Bleu foncé du logo
        primary: '#4059AD',  // Bleu foncé
        secondary: '#6B9AC4', // Bleu clair
        lightGray: '#F5F5F5',
        green: '#369694',
        lightGreen: '#97D8C4',
        yellow: '#F4B942',
      },
      fontFamily: {
        sans: ['Public Sans', 'sans-serif'], // Définition de Public Sans comme police par défaut
      },
    },
  },
  plugins: [require("daisyui")],
}