/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", // Blue
          dark: "#2563EB",
          light: "#EFF6FF",
        },
        secondary: {
          DEFAULT: "#10B981", // Green
          dark: "#059669",
          light: "#D1FAE5", 
        },
        accent: {
          DEFAULT: "#F59E0B", // Amber
          dark: "#D97706",
          light: "#FEF3C7",
        },
        neutral: {
          light: "#F9FAFB",
          DEFAULT: "#E5E7EB", // Medium Gray
          dark: "#1F2937",
          textBase: "#374151",
          textMuted: "#6B7280",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["Inter", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
      },
    },
  },
  plugins: [],
};
