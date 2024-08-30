// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
	typescript: {
		typeCheck: true,
	},
	imports: {
		dirs: ["types/*.ts", "stores/*.ts", "stores/careers/*.ts"],
	},
	ssr: false, // Disable Server-Side Rendering - Client-Side Rendering only
});
