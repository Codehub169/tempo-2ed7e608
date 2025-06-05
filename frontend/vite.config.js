import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Vite dev server port. Changed to 5173 to avoid conflict if backend also runs on 9000.
    // Note: if frontend/package.json dev script uses `vite --port 9000`, it will override this setting.
    // For the proxy to work correctly in development, the Vite dev server and the backend API server must run on different ports.
    port: 5173,
    proxy: {
      // Proxy API requests to the backend during development
      "/api": {
        target: "http://localhost:9000", // Backend is expected to run on port 9000
        changeOrigin: true,
        secure: false, // Typically false for localhost HTTP proxying
      },
    },
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), // Corrected alias for ESM
    },
  },
});
