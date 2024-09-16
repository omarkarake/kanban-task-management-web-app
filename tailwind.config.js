/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector', // using selector for the darkMode
  content: ["./src/**/*.{html,ts}"],

  theme: {
    extend: {
      colors: {
        "main-purple": "#635FC7",
        "main-purple-hover": "#A8A4FF",
        black: "#000112",
        "very-dark-grey": "#20212C",
        "dark-gray": "#2B2C37",
        'lines-dark': "#3E3F4E",
        "medium-gray": "#828FA3",
        "lines-light": "#E4EBFA",
        "light-gray": "#F4F7FD",
        white: "#FFFFFF",
        red: "#EA5555",
        "red-hover": "#FF9898",
      },
      fontFamily: {
        "plus-jakarta": ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        "heading-xl": ["24px", { lineHeight: "30px", fontWeight: "700" }], // Bold
        "heading-l": ["18px", { lineHeight: "23px", fontWeight: "700" }], // Bold
        "heading-m": ["15px", { lineHeight: "19px", fontWeight: "700" }], // Bold
        "heading-s": ["12px", { lineHeight: "15px", fontWeight: "700" }], // Bold
        "body-l": ["13px", { lineHeight: "23px", fontWeight: "500" }], // Medium
        "body-m": ["12px", { lineHeight: "15px", fontWeight: "700" }], // Bold
      },
      letterSpacing: {
        "heading-s": "2.4px", // Custom kerning for Heading (S)
      },
    },
  },
  plugins: [],
};
