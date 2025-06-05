import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000, // Matches the port in frontend/package.json dev script
    proxy: {
      // Proxy API requests to the backend during development
      "/api": {
        target: "http://localhost:3000", // Assuming backend runs on port 3000
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": "/src", // Alias for src directory
    },
  },
});
