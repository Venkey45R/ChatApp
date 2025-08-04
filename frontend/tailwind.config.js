// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- THIS MUST BE THIS EXACT STRING
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "deep-ocean-blue": "#2C3E50",
        "soft-teal": "#4ECDC4",
        "muted-gold": "#F7DC6F",

        "gray-background": "#1A202C",
        "component-bg": "#2C3E50",
        "card-bg": "#1F2937",
        "input-bg": "#374151",
        "border-color": "#4A5568",

        "text-primary": "#E0E0E0",
        "text-secondary": "#CBD5E0",
        "text-muted": "#A0AEC0",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-10%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
