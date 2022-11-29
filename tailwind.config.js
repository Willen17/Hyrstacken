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
            white: "#FFFFFF",
            lightGray: "#EFEFEF",
            lightRed: "#E37E7E",
        },
        extend: {
            screens: {
                smallPhone: "370px",
                // => @media (min-width: 350px) { ... }
                tablet: "640px",
                // => @media (min-width: 640px) { ... }

                laptop: "1024px",
                // => @media (min-width: 1024px) { ... }

                desktop: "1280px",
                // => @media (min-width: 1280px) { ... }
            },
            extend: {
                fontFamily: {
                    nunito: ['"Nunito"', "sans-serif"],
                },
            },
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
                    error: "#E37E7E",
                },
            },
        ],
    },

    plugins: [require("daisyui")],
};
