import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // The `ViteImageOptimizer` function takes an object of options.
      // You can define settings for different image types here.
      // A value of 90 is a good balance between quality and file size for JPEG.
      jpeg: {
        quality: 90,
      },
      png: {
        // You can set options specific to PNG, like compression level.
        // A value of 6 is a standard, good compression level.
        quality: 90,
        compressionLevel: 6,
      },
      webp: {
        // WebP can be highly compressed.
        quality: 90,
      },
      avif: {
        // Add this section to handle AVIF images.
        quality: 80,
      },
      gif: {
        // No quality setting for GIF, as it's a lossless format.
      },
      // Optionally, you can specify the output path for the optimized images
      // For example, to put them in a dedicated 'optimized-images' folder:
      // outDir: 'dist/assets/optimized-images',
    }),
    // visualizer({
    //   filename: "bundle-report.html",
    //   open: true, // si apre in automatico nel browser
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
});
