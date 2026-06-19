import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";
import tailwind from "@astrojs/tailwind";

const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  output: "server",
  adapter: isVercel ? vercel() : node({ mode: "standalone" }),
  server: { port: 4322 },
});
