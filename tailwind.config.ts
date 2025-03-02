import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
    },
  },
  darkMode: 'class', 
  plugins: [],
} satisfies Config;
