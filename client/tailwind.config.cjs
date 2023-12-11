module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "back-color": "#beffc9",
        "primary-color": "#22cc3d",
        "gradient-color": "rgba(190, 255, 201, 0.7)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
