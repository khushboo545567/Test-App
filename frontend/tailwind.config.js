import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#2563EB",
      secondary: "#9333EA",
      white: "#ffffff",
      black: "#000000",
    },
  },
});
