/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      ab: "975px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      clipPath: {
        trapezium: "polygon(0 0, 100% 0, 100% 100%, 0 90%)", // Customize the trapezium shape
      },

      keyframes: {
        "slide-left-to-right": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        expand: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        fade: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "slide-left-to-right": "slide-left-to-right 0.5s ease-out forwards",
        expand: "expand 1s ease-in-out",
        fade: "fade 1s ease-in-out",
      },
      colors: {
        mybg: "#121212",
      },
      backgroundImage: {
        myRedGradient:
          "linear-gradient( 107.2deg,  rgba(50,15,15,1) 20%, rgba(112,0,0,1) 90% )",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
