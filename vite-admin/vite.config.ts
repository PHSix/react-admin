import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import WindiCssPlugin from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCssPlugin()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@utils": resolve(__dirname, "src/utils")
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      }
    }
  }
});
