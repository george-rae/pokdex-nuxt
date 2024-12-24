<script setup lang="ts">
	defineProps({
		white: { type: Boolean },
	});
</script>

<template>
	<nav class="navigation">
		<slot></slot>
		<Menu :white="white" />
	</nav>
</template>

<style lang="scss" scoped>
	.navigation {
		height: max-content;
		padding: $header-padding;

		font-size: $font--title;
		font-weight: 700;
		text-transform: capitalize;
		color: var(--theme-colour);

		transition: all 0.3s ease-in-out;
		cursor: pointer;

		@include flex-x(space-between, center);
	}

	@media screen and (min-width: 1400px) {
		.navigation {
			gap: 20px;
			height: 100%;

			@include flex-y(flex-start, flex-start);
		}
	}
</style>
