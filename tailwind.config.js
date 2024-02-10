/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    colors:{
      'color-primary':'#0d6efd',
      'color-second':'#6610f2',
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

