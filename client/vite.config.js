import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  optimizeDeps: {
    include: [
      "codemirror",
      "codemirror/mode/htmlmixed/htmlmixed",
      "codemirror/mode/xml/xml",
      "codemirror/mode/javascript/javascript",
      "codemirror/mode/css/css",
    ],
  },
});
