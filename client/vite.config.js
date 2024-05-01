import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import withMT from "@material-tailwind/react/utils/withMT";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), withMT],
});
