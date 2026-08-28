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
        sage: "#456F5C",
        mist: "#8FAFAE",
        frost: "#B8CFCE",
        ice: "#E2F0F8",
        /*
         * Vert clair de la charte. Trois rôles distincts, chacun vérifié :
         *  accent      décoratif, et lisible sur le vert foncé (6,42:1)
         *  sage        vert de texte, ≥ 4,97:1 sur les trois fonds clairs
         *  accent-tint fond de bande, texte forêt à 13,6:1
         */
        accent: "#8BB19F",
        "accent-tint": "#EEF4F1",
        "accent-line": "rgba(139,177,159,0.5)",
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
