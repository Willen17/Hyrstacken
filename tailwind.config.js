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
            softRed: "#E37E7E",
            blackish: "#000000",
            hoverRed: "#CC5E5E",
            white: "#FFFFFF",
            lightGray: "#EFEFEF",
            lightRed: "#E37E7E",
        },
        extend: {
            fontFamily: {
                nunito: ['"Nunito"', "sans-serif"],
                cabin: ['"Cabin Sketch"', "sans-serif"],
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
                    error: "#E37E7E",
                },
            },
        ],
    },

    plugins: [require("daisyui")],
};
