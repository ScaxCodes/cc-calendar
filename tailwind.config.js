/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "hsl(0, 75%, 60%)",
        "custom-blue": "hsl(200, 80%, 50%)",
        "custom-green": "hsl(150, 80%, 30%)",
      },
    },
  },
  plugins: [],
};
