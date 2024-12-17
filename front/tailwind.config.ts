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
          primary: "#ec6553",
          secondary: "#39A2AE",
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
