// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // <--- ADD THIS IMPORT

export default defineConfig({
  plugins: [
    react(), // <--- ADD THIS PLUGIN
    // Remove the tailwindcss() plugin from here if it was present
  ],
});
