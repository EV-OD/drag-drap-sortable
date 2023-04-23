/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "load-drag": "loadRotate 0.3s linear"
      }
    },
  },
  plugins: [],
}