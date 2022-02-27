module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        perso: '97%'
      },
      backgroundImage: {
        ducati: "url('/src/assets/ducati.png')"
      },
      spacing: {
        999: '40rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
