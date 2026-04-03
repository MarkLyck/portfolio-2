import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	output: "server",
	adapter: vercel({
		analytics: true,
	}),
	vite: {
		plugins: [tailwindcss()],
	},
});
