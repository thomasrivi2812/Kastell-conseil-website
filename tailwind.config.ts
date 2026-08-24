import type { Config } from "tailwindcss";

/** Tokens lifted verbatim from the Kastell design canvas. */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bone: "#FAF9F6",
        sand: "#F2EFEA",
        forest: "#192924",
        "forest-deep": "#0F1A17",
        ink: "#1A1E1C",
        graphite: "#2F3835",
        slate: "#2B322F",
        stone: "#4A5350",
        sage: "#557272",
        mist: "#8FAFAE",
        frost: "#B8CFCE",
        ice: "#E2F0F8",
        muted: "#666F6C",
        dim: "#707876",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Instrument Serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Instrument Sans", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SF Mono", "Menlo", "monospace"],
      },
      maxWidth: {
        shell: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
