/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#635FC7",
        secondary: "#A8A4FF",
        dark: "#000112",
        darker: "#20212C",
        "gray-dark": "#2B2C37",
        gray: "#3E3F4E",
        "gray-light": "#828FA3",
        light: "#E4EBFA",
        "off-white": "#F4F7FD",
        white: "#FFFFFF",
        error: "#EA5555",
        "error-light": "#FF9898",
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
