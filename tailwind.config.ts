import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#f7f2eb",
        surface: "#fffaf3",
        "surface-strong": "#ffffff",
        text: "#191512",
        muted: "#756b61",
        border: "#e6d9c9",
        accent: "#191512",
        "accent-soft": "#efe3d3",
        danger: "#9f2f2f"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(42, 31, 21, 0.1)",
        card: "0 10px 30px rgba(42, 31, 21, 0.06)"
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "var(--font-hanken-grotesk)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-hanken-grotesk)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
