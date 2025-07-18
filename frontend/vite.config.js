const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const path = require("path");

module.exports = defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
