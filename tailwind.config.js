/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#F2F7FB",
          400: "#3A97E8",
          500: "#3384CA",
          600: "#2B70AB",
        },
      },
    },
  },
  plugins: [],
};

