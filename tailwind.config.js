/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        surface: "#161617",
        primary: "#3b6a8f",
        accent: "#fdc787",
        muted: "#94a3b8",
        foreground: "#f8fafc",
      },
    },
  },
  plugins: [],
}
