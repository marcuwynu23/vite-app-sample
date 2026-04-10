import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";
import envBanner from "@marcuwynu23/vite-plugin-env-banner";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), envBanner()],
});
