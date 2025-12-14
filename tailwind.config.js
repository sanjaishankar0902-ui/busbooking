/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bus-green': '#22c55e',
        'bus-red': '#ef4444',
        'bus-blue': '#3b82f6',
      }
    },
  },
  plugins: [],
}
