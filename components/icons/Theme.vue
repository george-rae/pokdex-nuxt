<script setup lang="ts">
	const { theme } = useAppConfig();

	defineEmits(["theme-change"]);
</script>

<template>
	<div class="theme-change" @click="$emit('theme-change')">
		<img
			src="https://pokedex-images.lon1.cdn.digitaloceanspaces.com/icons/theme--light.svg"
			:class="{ hidden: theme.dark }"
			alt="light theme" />
		<img
			src="https://pokedex-images.lon1.cdn.digitaloceanspaces.com/icons/theme--dark.svg"
			:class="{ hidden: !theme.dark }"
			alt="dark theme" />
	</div>
</template>

<style lang="scss" scoped>
	.theme-change {
		position: fixed;
		bottom: 6px;
		right: 6px;

		height: 60px;
		width: 60px;

		cursor: pointer;
		z-index: 20;

		img {
			position: absolute;
			top: 0;
			right: 0;

			pointer-events: auto;
			transition: opacity 0.3s ease-in-out;

			&.hidden {
				opacity: 0;
				pointer-events: none;
				transition: opacity 0.3s ease-in-out;
			}
		}
	}
</style>
