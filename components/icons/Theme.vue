<script setup lang="ts">
	const { theme } = useAppConfig();

	defineEmits(["theme-change"]);
</script>

<template>
	<div class="theme-change" @click="$emit('theme-change')">
		<img src="/light.svg" :class="{ hidden: theme.dark }" alt="light theme" />
		<img src="/dark.svg" :class="{ hidden: !theme.dark }" alt="dark theme" />
	</div>
</template>

<style lang="scss" scoped>
	.theme-change {
		position: absolute;
		top: 6px;
		right: 6px;

		height: 50px;
		width: 50px;

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
