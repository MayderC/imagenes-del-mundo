/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "-xl": { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        "-lg": { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        mm: { min: "543px" },
      },
    },
  },
  plugins: [],
};
