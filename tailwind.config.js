export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#0935b7",
        "dark-navy-blue": "#0a1d37",
        "light-grey": "#e1e5eb",
        "accent-aqua": "#0077b6",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      fontSize: {
        h1: "clamp(1.6rem, 4vw, 2.2rem)",
        h2: "clamp(1.3rem, 3.4vw, 1.9rem)",
        h3: "clamp(1.1rem, 3vw, 1.3rem)",
        p: "clamp(0.95rem, 2.6vw, 1.1rem)",
        button: "1rem",
      },
      spacing: {
        "15": "3.75rem",
        "35": "8.75rem",
        "72": "18rem",
        30: "7.5rem",
      },
      width: {
        "35": "8.75rem",
        "48": "12rem",
        "62": "15.5rem",
        "72": "18rem",
        "88": "22rem",
        "96": "24rem",
        "xl": "36rem",
      },
      height: {
        "35": "8.75rem",
        "79": "19.75rem",
      },
      maxWidth: {
        "48": "12rem",
        "72": "18rem",
        "90": "22.5rem",
        "96": "24rem",
        "98": "24.5rem",
        "7xl": "80rem",
      },
      minHeight: {
        "88.6": "88.6vh",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      zIndex: {
        "999": "999",
        5: "5",
      },
      blur: {
        sm: "4px",
      },
    },
  },
  plugins: [],
};
