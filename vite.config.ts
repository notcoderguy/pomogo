import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  // Static site generation configuration
  build: {
    outDir: "build/client",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  // Base URL for static assets
  base: "/", // Use relative paths for static hosting
  // Ensure assets are loaded with correct paths in SPA mode
  define: {
    // Ensure React Router knows it's in SPA mode
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
