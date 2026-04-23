import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const pagesBasePath = process.env.PAGES_BASE_PATH?.trim();

export default defineConfig({
  base: pagesBasePath || "/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    include: ["src/**/*.test.{js,jsx}"],
  },
});
