<script setup lang="ts">
	defineProps({
		white: { type: Boolean },
	});
</script>

<template>
	<nav class="navigation" :class="{ active: menuOpen }">
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
		z-index: 20;

		@include flex-x(space-between, center);
	}

	@media screen and (min-width: 1024px) and (max-width: 1399px) {
		.navigation {
			&::before {
				content: "";
				position: fixed;
				inset: 0;
				z-index: 1;

				background: rgba(0, 0, 0, 0.4);
				pointer-events: none;
				opacity: 0;
				transition: all 0.3s ease-in-out;
			}

			&.active::before {
				opacity: 1;
				pointer-events: all;

				transition: all 0.3s ease-in-out;
			}
		}
	}

	@media screen and (min-width: 1400px) {
		.navigation {
			gap: 20px;
			height: 100%;

			@include flex-y(flex-start, flex-start);
		}
	}
</style>
