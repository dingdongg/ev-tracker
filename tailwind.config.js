/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontfamily: {
        pokemon: ['pokemon'],
      },
      colors: {
        gray: "#656565",
        D: "#656565",
        C: "#DD6600",
        B: "#DDDD00",
        A: "#00FF00",
        S: "#00FFFF",
      }
    },
  },
  plugins: [],
}

