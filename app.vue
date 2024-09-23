<script setup lang="ts">
	import { loading } from "@/composables/loading";
	import Theme from "./components/icons/Theme.vue";

	const { theme } = useAppConfig();
	theme.dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	const themeClass: ComputedRef<"theme--dark" | "theme--light"> = computed(() =>
		theme.dark ? "theme--dark" : "theme--light"
	);

	const loadState = computed(() => loading.value);

	useHead({
		bodyAttrs: { class: computed(() => `theme ${themeClass.value}`) },
	});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />

		<Loading :class="{ loading: loadState }" />
		<Theme @theme-change="theme.dark = !theme.dark" />
	</NuxtLayout>
</template>

<style lang="scss">
	.background-pokeball {
		position: fixed;
		bottom: -50vh;
		right: -50vh;

		height: 150vh;
		width: auto;

		z-index: 0;

		animation: spin 20s linear infinite forwards;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
