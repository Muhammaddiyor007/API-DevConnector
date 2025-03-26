/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:"#17a2b8",
      },
      backgroundColor: {
        grayBg: "#343a40d2",
      },
    },
  },
  plugins: [],
}

