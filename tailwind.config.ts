import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");
import { withUt } from "uploadthing/tw";

export default withUt(withMT({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        card: 'hsl(var(--card))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        heading: 'hsl(var(--heading))',
        text: 'hsl(var(--text))',
        price: 'hsl(var(--price))',
       'card-bg': 'hsl(var(--card-bg))',
        'card-text': 'hsl(var(--card-text))',
        'card-heading': 'hsl(var(--card-heading))',
        'card-description': 'hsl(var(--card-description))',
        'card-border': 'hsl(var(--card-border))',
          'section-bg': 'hsl(var(--section-bg))',
  'section-heading': 'hsl(var(--section-heading))',
  'section-border': 'hsl(var(--section-border))',
  'section-icon': 'hsl(var(--section-icon))',
  'section-hover': 'hsl(var(--section-hover))',
      },
      fontFamily: {
        lora: ['var(--font-lora-regular)'],
        'lora-semibold': ['var(--font-lora-semibold)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
})) satisfies Config;
