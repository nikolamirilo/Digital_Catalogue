import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");
import { withUt } from "uploadthing/tw";

export default withUt(
  withMT({
    darkMode: ["class"],
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          "product-background": "var(--product-background)",
          "product-foreground": "var(--product-foreground)",
          "product-primary": "var(--product-primary)",
          "product-secondary": "var(--product-secondary)",
          "primary-accent": "var(--product-primary-accent)",
          "product-foreground-accent": "var(--product-foreground-accent)",
          "hero-product-background": "var(--hero-product-background)",
          "product-border": "var(--product-border)",
          "product-hover-background": "var(--product-hover-background)",
          "product-icon": "var(--product-icon)",
          "product-shadow": "var(--product-shadow)",
          "button-text":"var(--button-text)",

          primary: "var(--primary)",
          secondary: "var(--secondary)",
          accent: "var(--accent)",
          card: "var(--card)",
          background: "var(--background)",
          foreground: "var(--foreground)",
          border: "var(--border)",
          heading: "var(--heading)",
          text: "var(--text)",
          price: "var(--price)",
          "card-bg": "var(--card-bg)",
          "card-text": "var(--card-text)",
          "card-heading": "var(--card-heading)",
          "card-description": "var(--card-description)",
          "card-border": "var(--card-border)",
          "section-bg": "var(--section-bg)",
          "section-heading": "var(--section-heading)",
          "section-border": "var(--section-border)",
          "section-icon": "var(--section-icon)",
          "section-hover": "var(--section-hover)",
        },
        fontFamily: {
          lora: ["var(--font-lora-regular)"],
          "lora-semibold": ["var(--font-lora-semibold)"],
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  })
) satisfies Config;
