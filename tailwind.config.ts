import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.09)",
        "soft-dark": "0 18px 60px rgba(0, 0, 0, 0.32)"
      }
    }
  },
  plugins: []
};

export default config;
