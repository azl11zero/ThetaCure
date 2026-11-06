import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D91F2B",
          hover: "#C01823",
          light: "#FDF2F2",
          dark: "#9E121C",
        },
        thetacure: {
          red: "#D91F2B",
          darkRed: "#A8151E",
          lightRed: "#FEF2F2",
          nearBlack: "#111827",
          slateGrey: "#475569",
          mutedGrey: "#64748B",
          lightGrey: "#F3F4F6",
          borderGrey: "#E5E7EB",
          softNeutral: "#FAFAFA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        'card': '16px',
        'subtle': '12px',
        'button': '9999px',
      },
      boxShadow: {
        'card-subtle': '0 2px 8px -2px rgba(17, 24, 39, 0.05), 0 1px 4px -1px rgba(17, 24, 39, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(17, 24, 39, 0.08), 0 8px 10px -6px rgba(17, 24, 39, 0.03)',
      }
    },
  },
  plugins: [],
};
export default config;
