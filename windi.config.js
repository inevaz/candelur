// windi.config.js
export default {
  darkMode: 'class',
  extract: {
    include: ['index.html', 'src/**/*.{vue,html,jsx,tsx}'],
  },
  theme: {
    fontFamily: {
      sans: ['Krub', 'sans-serif'],
    },
    extend: {
      fontFamily: {
      krub: ['Krub', 'sans-serif'],
    },
    },
  },
  plugins: [],
}
