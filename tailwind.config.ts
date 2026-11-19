import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem", lg: "3rem" }, screens: { "2xl": "1360px" } },
    extend: {
      colors: {
        // Palette officielle Enactus FSJES Souissi (relevée sur le logo)
        ink: { DEFAULT: "#120814", 800: "#1C0D20", 700: "#28142E", 600: "#3B2142" },
        paper: "#FFFFFF",
        bone: "#FBF8F2", // ivoire
        violet: { 50: "#F7EFF7", 100: "#EEDCEF", 300: "#C78CCB", DEFAULT: "#84168A", 600: "#6E1273", 700: "#560E5A", 900: "#2A0A2E" },
        gold: { 100: "#FEF4CF", 200: "#FCE38A", DEFAULT: "#F8C012", 600: "#DDA70B", 700: "#9A7407" },
        // Couleur d'accent adaptative : violet sur fond clair, or sur fond sombre
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        muted: "#6B6170",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        script: ["var(--font-script)"],
        sans: ["var(--font-sans)"],
      },
      letterSpacing: { tightest: "-0.04em" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 40s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
