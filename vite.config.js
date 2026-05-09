import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Vite config for the unified OLUMSX app.
//
// Notes:
// - A lot of the migrated source uses JSX inside `.js` files (Admin's whole
//   tree, Vendor/App.js, etc.). The esbuild loader override + the React
//   plugin `include` glob below let Vite parse JSX in `.js` files just like
//   Create React App did.
// - `@admin`, `@customer`, `@lander`, `@vendor` aliases give each section a
//   stable namespace and let Admin's old base-url-style imports
//   (`import { Layout } from "scenes"`) be rewritten as
//   `import { Layout } from "@admin/scenes"` cleanly.
export default defineConfig({
  plugins: [react({ include: /\.(mjs|js|jsx|ts|tsx)$/ })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@admin": path.resolve(__dirname, "src/apps/admin"),
      "@customer": path.resolve(__dirname, "src/apps/customer"),
      "@lander": path.resolve(__dirname, "src/apps/lander"),
      "@vendor": path.resolve(__dirname, "src/apps/vendor"),
    },
  },
  esbuild: {
    loader: "jsx",
    include: [/src\/.*\.jsx?$/],
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
});
