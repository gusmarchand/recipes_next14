import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Utilisation de la classe pour activer le mode sombre
  theme: {
    extend: {
      colors: {
        foreground: {
          light: 'rgb(0, 0, 0)',
          dark: 'rgb(255, 255, 255)',
        },
        background: {
          start: {
            light: 'rgb(214, 219, 220)',
            dark: 'rgb(0, 0, 0)',
          },
          end: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(0, 0, 0)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;