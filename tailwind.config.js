/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tt-navy": "#00344d",
        "tt-teal": "#00a3ad",
        "tt-green": "#22c55e",
      },
      borderRadius: {
        "tt-card": "2.5rem",
        "tt-pill": "9999px",
      },
      letterSpacing: {
        widest: "0.15em",
      },
    },
  },
};
