/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      veryDarkBlue: "#263245",
      mediumBlue: "#3B4F6D",
      softPurple: "#6A5978",
      redishBrown: "#AA6975",
      softOrange: "#EAAC8B",
      white: "#FFFFFF",
      lightGray: "#EFEFEF",
    },
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#263245",
          secondary: "#3B4F6D",
          accent: "#6A5978",
          neutral: "#AA6975",
          "base-100": "#FFFFFF",
          info: "#EFEFEF",
          success: "#EAAC8B",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
