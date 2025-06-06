import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        softShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
      },
      colors:{
        primary: '#FEFEFF',
        dark:'#0F0E0E',
        second:'#06a4ff',
        third:'#8756ff',
        bulletList:"#3EA6FF",
        highlightColor:"#F3F2F3",
        highlightColorDark:"#3E3F3E",
        darkHover:"#444644",
      },
      keyframes: {
        fade: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        fade: 'fade 1s ease-in-out infinite',
      },
    },
  },
  darkMode: 'class', 
  plugins: [],
} satisfies Config;
