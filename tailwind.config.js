/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "hsl(0, 75%, 60%)",
        "custom-blue": "hsl(200, 80%, 50%)",
        "custom-green": "hsl(150, 80%, 30%)",
        "custom-grey": "#dadce0",
        "add-button-border": "hsl(150, 80%, 30%)",
        "add-button-bg": "hsl(150, 80%, 95%)",
        "add-button-text": "hsl(150, 80%, 10%)",
        "add-button-bg-hover": "hsl(150, 80%, 90%)",
        "today-button-bg-hover": "#f1f3f4",
        "delete-button-border": "hsl(0, 75%, 60%)",
        "delete-button-bg": "hsl(0, 75%, 95%)",
        "delete-button-text": "hsl(0, 75%, 10%)",
        "delete-button-bg-hover": "hsl(0, 75%, 90%)",
        "todays-day": "hsl(200, 80%, 50%)",
      },
      textColor: {
        default: "#333",
        "week-name": "#777",
        "timed-event": "#777",
        "modal-date-header": "#555",
        "modal-form-label": "#777",
      },
    },
  },
  plugins: [],
};
