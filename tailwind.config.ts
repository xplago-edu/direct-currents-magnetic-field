import {nextui} from "@nextui-org/react";
import {LightTheme} from "./src/themes/LightTheme";
import {DarkTheme} from "./src/themes/DarkTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: "rgba(30,174,255,1)",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: LightTheme,
      dark: DarkTheme,
    }
  })]
}



export default config;