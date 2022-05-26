module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#952DDE",
          secondary: "#19D3AE",
          accent: "#3A4256",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          "button-color": "#000000",
          "nav": "#8139bf"
        },
      },
      "dark",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}