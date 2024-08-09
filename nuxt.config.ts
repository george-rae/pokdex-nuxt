// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	css: ["~/assets/styles/_main.scss"],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/styles/utils/_vars.scss" as *;',
				},
			},
		},
	},
});
