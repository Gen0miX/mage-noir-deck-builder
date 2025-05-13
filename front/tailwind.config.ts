import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        vegetal: "#5d9c42",
        eau: "#3a92d2",
        feu: "#d12c24",
        mineral: "#9a8f75",
        air: "#c4d5eb",
        arcane: "#9a4d9e",
      },
      fontFamily: {
        p: ["var(--font-montserrat)"],
        heading: ["var(--font-eb-garamond)"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mage_noir: {
          primary: "#7288b9",
          secondary: "#8877b6",
          accent: "#FFDA22",
          neutral: "#FFFFFF",
          "base-100": "#171717",
          info: "#0089a0",
          success: "#0C8346",
          warning: "#FCE762",
          error: "#ff5b77",
          "base-content": "#FBFCFA",
        },
      },
    ],
  },
} satisfies Config;
