import type { Config } from "tailwindcss";

const config: Config = {
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
        premium: {
          white: "#ffffff",
          soft: "#f8fafc",
          gray: "#f1f5f9",
          dark: "#0f172a",
          accent: {
            red: "#ef4444",
            green: "#22c55e",
          }
        },
      },
      animation: {
        'plasma': 'plasma 20s ease-in-out infinite',
        'fade-in': 'fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        plasma: {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
          '33%': { transform: 'scale(1.05) translate(1%, 2%)' },
          '66%': { transform: 'scale(0.95) translate(-1%, -1%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
