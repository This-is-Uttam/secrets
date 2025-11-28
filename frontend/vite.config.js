import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: ".",        // This is the important part
  plugins: [react()],
  build: {
    outDir: "dist",  // Vercel expects this
  },
});
