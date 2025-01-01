import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0E3B43'
        },
        secondary: {
          DEFAULT: '#EDEEC0'
        },
        tertiary: {
          DEFAULT: '#F9A826'
        },
      },
    },
  },
  plugins: [],
}) satisfies Config;
