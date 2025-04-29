import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)"],
      },
      colors: {
        primary: "#801AE5",
        secondary: "#0E1D6E",
        tertiary: "#09CE69",
        background: "#0C0D14",
      },
    },
  },
  plugins: [],
};

export default config;
