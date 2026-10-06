module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.1)",
      },
      colors: {
        primary: { 50: "#eff6ff", 500: "#2563eb", 600: "#1d4ed8" },
        success: { 500: "#16a34a" },
        warning: { 500: "#f59e0b" },
        danger: { 500: "#ef4444" },
      },
    },
  },
  plugins: [],
};
