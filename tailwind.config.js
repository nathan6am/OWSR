module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        facebook: "#4267B2",
        discord: {
          100: "#7983f5",
          200: "#5865F2",
        },
        youtube: "#c4302b",
        twitch: "#6441a5",
        dark: {
          100: "#080808",
          200: "#121212",
          300: "#1f1f1f",
        },
      },
    },
  },
  plugins: [],
};
