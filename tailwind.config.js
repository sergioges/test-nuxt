/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./app/assets/css/main.css",
  ],
  theme: {
    extend: {
      // Aquí puedes añadir extensiones al tema de Tailwind
    },
  },
  plugins: [
    // Aquí puedes añadir plugins de Tailwind si los necesitas
  ],
};
