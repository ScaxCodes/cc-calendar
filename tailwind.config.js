/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "hsl(0, 75%, 60%)",
        "custom-blue": "hsl(200, 80%, 50%)",
        "custom-green": "hsl(150, 80%, 30%)",
        "add-button-border": "hsl(150, 80%, 30%)",
        "add-button-bg": "hsl(150, 80%, 95%)",
        "add-button-text": "hsl(150, 80%, 10%)",
        "add-button-bg-hover": "hsl(150, 80%, 90%)",
      },
    },
  },
  plugins: [],
};
