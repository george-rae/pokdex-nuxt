// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: "George Rae | Pokedex",
			meta: [{ charset: "utf-8" }],
			link: [
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;0,700;1,400;1,700&display=swap",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicons/favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/favicons/favicon-16x16.png",
				},
				{
					rel: "manifest",
					href: "/favicons/site.webmanifest",
				},
			],
		},
	},
	css: ["~/assets/styles/_main.scss"],
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	ssr: false,
	nitro: {
		preset: "node-server",
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/styles/utils/_vars.scss" as *;',
					silenceDeprecations: ["legacy-js-api"],
				},
			},
		},
		server: {
			middlewareMode: true,
		},
	},

	modules: ["@pinia/nuxt"],
});
