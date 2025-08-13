import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure minification
    minify: "esbuild",
    // Disable source maps in production
    sourcemap: false,
    // Optional: target modern browsers for smaller output
    target: "es2015",
    // Optional: output directory (default is 'dist')
    outDir: "dist",
  },
});
