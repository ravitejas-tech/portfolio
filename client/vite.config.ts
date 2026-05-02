import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      // Proxy /api/* to local Express server during development
      "/api": {
        target: "https://portfolio-tuz6.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
